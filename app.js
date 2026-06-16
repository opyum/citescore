/* ============================================================
   CiteScore landing — capture logic + scanner FX
   Posts same-origin to /api/waitlist (Node service on the VPS).
   ============================================================ */

/* ---- helpers ---- */
const $ = (s, r = document) => r.querySelector(s);
function cleanUrl(v) {
  return (v || "").trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "");
}
const T = (k) => (window.I18N ? window.I18N.t(k) : "");
function track(name) {
  try {
    const body = JSON.stringify({ name, path: location.pathname, ref: document.referrer });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/event", new Blob([body], { type: "application/json" }));
    else fetch("/api/event", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
  } catch (_) {}
}
track("page_view");

/* ---- hero form -> prefill join form + scroll ---- */
const heroForm = $("#hero-form");
heroForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = cleanUrl($("#hero-url").value);
  if (url) $("#j-url").value = url;
  document.getElementById("join").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => $("#j-email").focus(), 600);
});

/* ---- intent checkbox reveals price question ---- */
const intent = $("#j-intent");
const priceQ = $("#price-q");
intent.addEventListener("change", () => { priceQ.hidden = !intent.checked; });

/* ---- join form submit ---- */
const joinForm = $("#join-form");
const joinSuccess = $("#join-success");
const submitBtn = $("#j-submit");

joinForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = cleanUrl($("#j-url").value);
  const email = $("#j-email").value.trim();
  if (!url || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    submitBtn.textContent = T("rt_badinput") || "Check your URL + email →";
    return;
  }
  const lead = {
    email,
    url,
    role: (joinForm.querySelector('input[name="role"]:checked') || {}).value || "other",
    intent: intent.checked,
    price_band: intent.checked
      ? ((joinForm.querySelector('input[name="price"]:checked') || {}).value || null)
      : null,
    source: document.referrer || "direct",
    user_agent: navigator.userAgent,
  };

  submitBtn.disabled = true;
  submitBtn.textContent = T("rt_saving") || "Saving…";

  let ok = true;
  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    // 200 = saved, 409 = already on the list (treat both as success)
    if (!res.ok && res.status !== 409) ok = false;
  } catch (err) {
    ok = false;
    console.error("[CiteScore] submit failed", err);
  }

  if (ok) {
    $("#ok-url").textContent = url;
    joinForm.hidden = true;
    joinSuccess.hidden = false;
    track("signup");
    joinSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    runQuickcheck(url);
  } else {
    submitBtn.disabled = false;
    submitBtn.textContent = T("rt_error") || "Something broke — try again →";
  }
});

/* ---- instant teaser: 3 quick public-signal checks ---- */
async function runQuickcheck(url) {
  const box = $("#teaser"), list = $("#teaser-list");
  if (!box || !list) return;
  list.innerHTML = '<li class="t-wait">' + (T("rt_checking") || "checking your public signals…") + "</li>";
  box.hidden = false;
  try {
    const res = await fetch("/api/quickcheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) { box.hidden = true; return; }
    const d = await res.json();
    const row = (label, state) => {
      const sym = state === "ok" ? "✓" : state === "bad" ? "✕" : "~";
      const cls = state === "ok" ? "ok" : state === "bad" ? "bad" : "warn";
      return `<li class="${cls}"><span>${label}</span><b>${sym}</b></li>`;
    };
    list.innerHTML =
      row(T("rt_llms") || "llms.txt present", d.llms ? "ok" : "bad") +
      row(T("rt_ai") || "AI crawlers allowed (robots.txt)", d.ai_access === "ok" ? "ok" : d.ai_access === "blocked" ? "bad" : "warn") +
      row(T("rt_schema") || "Structured data (schema.org)", d.schema ? "ok" : "bad");
  } catch (_) {
    box.hidden = true;
  }
}

/* ---- scanner: animate the demo grade reveal ---- */
(function scannerFx() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const gradeEl = $("#grade"), barEl = $("#bar"), pctEl = $("#pct");
  if (!gradeEl) return;
  const target = 61;
  let n = 0;
  const grades = [[90, "A"], [80, "B"], [65, "C"], [50, "D"], [0, "F"]];
  const tick = setInterval(() => {
    n += 3;
    if (n >= target) { n = target; clearInterval(tick); }
    const g = grades.find(([t]) => n >= t)[1];
    gradeEl.textContent = g;
    pctEl.textContent = n + " / 100";
    if (barEl) barEl.style.width = n + "%";
  }, 28);
})();
