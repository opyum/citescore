/* ============================================================
   CiteScore — single-service server
   Serves the static landing AND captures waitlist leads to Postgres.
   Same-origin, so no CORS. Deploy on the VPS via Dokploy.
   ============================================================ */
import express from "express";
import pg from "pg";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

app.set("trust proxy", 1); // behind Dokploy/Traefik
app.use(express.json({ limit: "16kb" }));
app.use(express.static(__dirname, { extensions: ["html"] }));

/* ---- Postgres pool ---- */
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // Dokploy internal network is plain TCP; enable SSL only if your URL needs it.
  ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false,
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id          BIGSERIAL PRIMARY KEY,
      email       TEXT NOT NULL UNIQUE,
      url         TEXT NOT NULL,
      role        TEXT,
      intent      BOOLEAN DEFAULT FALSE,
      price_band  TEXT,
      source      TEXT,
      user_agent  TEXT,
      ip          TEXT,
      qualified   BOOLEAN,           -- set manually after concierge review
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id         BIGSERIAL PRIMARY KEY,
      name       TEXT NOT NULL,        -- page_view | signup
      path       TEXT,
      ref        TEXT,
      ip_hash    TEXT,                 -- coarse, privacy-friendly
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  console.log("[CiteScore] DB ready");
}

/* ---- naive in-memory rate limit (per IP) ---- */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const win = 60_000, max = 8;
  const rec = hits.get(ip) || { n: 0, t: now };
  if (now - rec.t > win) { rec.n = 0; rec.t = now; }
  rec.n++; hits.set(ip, rec);
  return rec.n > max;
}

const isEmail = (s) => typeof s === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);

/* ---- capture endpoint ---- */
app.post("/api/waitlist", async (req, res) => {
  const ip = req.ip;
  if (rateLimited(ip)) return res.status(429).json({ error: "slow_down" });

  const b = req.body || {};
  const email = (b.email || "").trim().toLowerCase();
  const url = (b.url || "").trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  if (!isEmail(email) || !url) return res.status(400).json({ error: "bad_input" });

  const role = ["founder", "marketer", "agency", "other"].includes(b.role) ? b.role : "other";
  const price = ["19", "49", "99"].includes(String(b.price_band)) ? String(b.price_band) : null;

  try {
    await pool.query(
      `INSERT INTO waitlist (email,url,role,intent,price_band,source,user_agent,ip)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (email) DO UPDATE
         SET url=EXCLUDED.url, role=EXCLUDED.role, intent=EXCLUDED.intent,
             price_band=EXCLUDED.price_band`,
      [email, url, role, !!b.intent, price,
       (b.source || "direct").slice(0, 300), (b.user_agent || "").slice(0, 400), ip]
    );
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[CiteScore] insert error", err.message);
    return res.status(500).json({ error: "server" });
  }
});

/* ---- privacy-friendly analytics beacon ---- */
import crypto from "node:crypto";
const dayKey = () => new Date().toISOString().slice(0, 10);
app.post("/api/event", async (req, res) => {
  const name = (req.body && req.body.name) || "";
  if (!["page_view", "signup"].includes(name)) return res.status(204).end();
  // coarse daily IP hash — counts uniques without storing PII
  const ipHash = crypto.createHash("sha256")
    .update((req.ip || "") + dayKey()).digest("hex").slice(0, 16);
  try {
    await pool.query(
      `INSERT INTO events (name,path,ref,ip_hash) VALUES ($1,$2,$3,$4)`,
      [name, (req.body.path || "/").slice(0, 200), (req.body.ref || "").slice(0, 300), ipHash]
    );
  } catch (_) { /* analytics must never break the page */ }
  res.status(204).end();
});

/* ============================================================
   Instant teaser check (3 public signals) — NOT the full product.
   Hardened against SSRF: https/http only, no private/loopback IPs,
   short timeout, capped body size.
   ============================================================ */
import dns from "node:dns/promises";
import net from "node:net";

function isPrivateIp(ip) {
  if (net.isIPv4(ip)) {
    const p = ip.split(".").map(Number);
    return (
      p[0] === 10 ||
      p[0] === 127 ||
      p[0] === 0 ||
      (p[0] === 172 && p[1] >= 16 && p[1] <= 31) ||
      (p[0] === 192 && p[1] === 168) ||
      (p[0] === 169 && p[1] === 254) ||
      (p[0] === 100 && p[1] >= 64 && p[1] <= 127)
    );
  }
  const v6 = ip.toLowerCase();
  return v6 === "::1" || v6 === "::" || v6.startsWith("fc") || v6.startsWith("fd") || v6.startsWith("fe80");
}

async function assertSafeHost(hostname) {
  if (!hostname || hostname === "localhost" || hostname.endsWith(".local")) throw new Error("blocked");
  if (net.isIP(hostname) && isPrivateIp(hostname)) throw new Error("blocked");
  const records = await dns.lookup(hostname, { all: true });
  if (!records.length || records.some((r) => isPrivateIp(r.address))) throw new Error("blocked");
}

async function fetchText(url, ms = 4000, maxBytes = 200_000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "User-Agent": "CiteScore-Teaser/1.0 (+https://aicitescore.com)" },
    });
    const buf = await res.arrayBuffer();
    return { status: res.status, body: Buffer.from(buf).subarray(0, maxBytes).toString("utf8") };
  } finally {
    clearTimeout(timer);
  }
}

function aiBlockedInRobots(robots) {
  const lines = robots.split(/\r?\n/).map((l) => l.replace(/#.*$/, "").trim());
  const aiBots = ["*", "gptbot", "claudebot", "perplexitybot", "google-extended", "oai-searchbot"];
  let groups = [], cur = null;
  for (const l of lines) {
    const m = l.match(/^user-agent:\s*(.+)$/i);
    if (m) { if (!cur || cur.dirs.length) { cur = { uas: [], dirs: [] }; groups.push(cur); } cur.uas.push(m[1].toLowerCase()); continue; }
    const d = l.match(/^disallow:\s*(.*)$/i);
    if (d && cur) cur.dirs.push(d[1].trim());
  }
  return groups.some((g) => g.uas.some((ua) => aiBots.includes(ua)) && g.dirs.includes("/"));
}

app.post("/api/quickcheck", async (req, res) => {
  if (rateLimited(req.ip)) return res.status(429).json({ error: "slow_down" });
  const raw = (req.body && req.body.url ? String(req.body.url) : "").trim();
  if (!raw) return res.status(400).json({ error: "bad_input" });
  let origin;
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : "https://" + raw);
    if (!["http:", "https:"].includes(u.protocol)) throw 0;
    if (u.port && !["80", "443", ""].includes(u.port)) throw 0;
    await assertSafeHost(u.hostname);
    origin = u.origin;
  } catch {
    return res.status(400).json({ error: "bad_url" });
  }

  const [llmsR, robotsR, homeR] = await Promise.allSettled([
    fetchText(origin + "/llms.txt"),
    fetchText(origin + "/robots.txt"),
    fetchText(origin + "/"),
  ]);

  const ok = (r) => r.status === "fulfilled" && r.value.status >= 200 && r.value.status < 300;
  const llms = ok(llmsR) && !llmsR.value.body.trimStart().startsWith("<") && llmsR.value.body.trim().length > 10;
  let ai_access = "unknown";
  if (ok(robotsR)) ai_access = aiBlockedInRobots(robotsR.value.body) ? "blocked" : "ok";
  else if (robotsR.status === "fulfilled" && robotsR.value.status === 404) ai_access = "ok"; // no robots = allowed
  const schema = ok(homeR) && /application\/ld\+json/i.test(homeR.value.body);

  const passed = [llms, ai_access === "ok", schema].filter(Boolean).length;
  res.json({ llms, ai_access, schema, passed, total: 3 });
});

/* ---- admin: read leads + funnel (token-protected) ---- */
app.get("/api/leads", async (req, res) => {
  if (!ADMIN_TOKEN || req.query.token !== ADMIN_TOKEN)
    return res.status(401).json({ error: "unauthorized" });
  const { rows } = await pool.query(
    `SELECT id,email,url,role,intent,price_band,qualified,created_at
     FROM waitlist ORDER BY created_at DESC`
  );
  const qualified = rows.filter((r) => r.qualified === true).length;
  const intentYes = rows.filter((r) => r.intent === true).length;
  let funnel = {};
  try {
    const f = await pool.query(
      `SELECT name, COUNT(*)::int AS hits, COUNT(DISTINCT ip_hash)::int AS uniques
       FROM events GROUP BY name`
    );
    funnel = Object.fromEntries(f.rows.map((r) => [r.name, { hits: r.hits, uniques: r.uniques }]));
  } catch (_) {}
  res.json({ total: rows.length, qualified, intent_yes: intentYes, funnel, leads: rows });
});

/* ---- health ---- */
app.get("/api/health", (_req, res) => res.json({ ok: true }));

initDb().catch((e) => console.error("[CiteScore] DB init failed — capture/analytics disabled, page still served:", e.message));
app.listen(PORT, () => console.log(`[CiteScore] listening on :${PORT}`));
