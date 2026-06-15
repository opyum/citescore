# Deploy CiteScore on your VPS (Dokploy)

One service serves the landing **and** captures emails into Postgres. Same origin → no CORS, one deploy.

---

## What you get
- `GET /` → the landing page
- `POST /api/waitlist` → saves a lead (email, url, role, intent, price band)
- `POST /api/event` → privacy-friendly page-view / signup analytics (self-hosted, no third party)
- `GET /api/leads?token=YOUR_ADMIN_TOKEN` → JSON of every lead + funnel counts (total visits, signups, qualified)
- `GET /api/health` → health check

---

## Step 1 — Push the code somewhere Dokploy can read it
Either a Git repo (GitHub) or upload the folder. Dokploy can deploy from a Git repo or a Compose file.

## Step 2 — Generate two secrets
On any machine:
```bash
openssl rand -hex 24   # use for DB_PASSWORD
openssl rand -hex 24   # use for ADMIN_TOKEN
```

## Step 3 — Deploy (recommended: Compose)
In Dokploy → **Create → Compose**, point it at this repo (`docker-compose.yml`), then set environment variables:
```
DB_PASSWORD=<the first secret>
ADMIN_TOKEN=<the second secret>
```
Deploy. It starts Postgres + the app, creates the tables automatically on first boot.

> Alternative (app-only): if you prefer Dokploy's managed Postgres, create a Postgres database in Dokploy, then deploy just the app (Dockerfile) and set `DATABASE_URL=postgres://user:pass@host:5432/db` (+ `PGSSL=true` if required) and `ADMIN_TOKEN`. Skip the compose `db` service.

## Step 4 — Point the domain
1. Buy **aicitescore.com** (Vercel Domains, ~$11.25/yr — link from the earlier check, or any registrar).
2. In your DNS, create an **A record** for `@` (and `www`) → your VPS IP.
3. In Dokploy, add the domain `aicitescore.com` to the app service and enable **HTTPS (Let's Encrypt)**. Dokploy/Traefik handles the cert.

## Step 5 — Verify
```bash
curl https://aicitescore.com/api/health        # {"ok":true}
```
Open the site, submit a test signup, then:
```bash
curl "https://aicitescore.com/api/leads?token=YOUR_ADMIN_TOKEN"
```
You should see your test lead + funnel counts.

---

## Reading your 10 qualified leads
```bash
curl "https://aicitescore.com/api/leads?token=YOUR_ADMIN_TOKEN" | jq
```
- `total` = signups, `intent_yes` = how many ticked "I'd pay to monitor", `funnel.page_view.uniques` = visitors.
- A lead is **qualified** when you (the concierge) confirm they're in-target. Mark it in Postgres after auditing:
  ```sql
  UPDATE waitlist SET qualified = true WHERE email = 'them@startup.com';
  ```
- GATE 4 = **10 rows with `qualified = true`**.

## Cost check ✅
VPS (already yours) + domain (~$11.25/yr). No SaaS, no paid API, no managed DB. Within the zero-cost constraint.
