# CiteScore — Inbound content kit (you publish from your own accounts)

> Fill placeholders before posting: `[Name]`, `[N]` (signup/day count), `[CALENDLY LINK]`.
> The checklist link is **https://aicitescore.com/checklist** (already hosted by the app).
> Rule: inbound only. Lead with value. Never mass-DM or auto-post.

---

## 1. Founding-waitlist welcome sequence (3 emails)

### Email J0 — deliver the checklist + set expectations
**Subject:** The 12 signals that decide if ChatGPT cites you (checklist inside)

Hey,

Thanks for joining the CiteScore founding waitlist. I'm a solo dev building this, so a real person (me) read your signup. Welcome.

First, the thing I promised — your checklist:
**The 12 Signals That Decide Whether ChatGPT Cites Your Site (most sites fail 7).**
→ https://aicitescore.com/checklist

Run your own site against it. ~10 minutes, and you'll probably find 2–3 things to fix today.

**What happens next:** founding sites (first 50) get a hand-done audit from me — not an automated PDF. I personally check your site against all 12 signals, then email you:
- Your letter grade (A→F)
- The 3 fixes that matter most — with the files done for you (your `llms.txt`, the exact `robots.txt` lines, your schema markup)
- A benchmark vs. one competitor who's currently eating your AI citations

That audit is coming — I work through the list in order, so you're in the queue.

One ask: reply with your URL + the competitor you'd most hate to lose an AI recommendation to. It sharpens your audit.

— [Name], building in public · aicitescore.com

### Email J2 — the #1 signal most sites miss
**Subject:** The #1 reason AI skips your site (it's not your content)

Hey,

Quick one. Of the 12 signals, there's one almost everyone gets wrong — and it's the cheapest to fix.

**You're blocking the AI crawlers without knowing it.**

Most sites either never set AI-bot rules in robots.txt, or copied one that blocks `GPTBot`, `ClaudeBot`, `PerplexityBot` outright (often from a "block AI scrapers" post from 2024). If those bots can't crawl you, you're structurally invisible to ChatGPT and Perplexity — no matter how good your content is.

**Check in 30s:** open `yourdomain.com/robots.txt`, search for `GPTBot`. If you see `Disallow: /` under it, that's your #1 fix.

(There's a real choice here: some founders want to block *training* crawlers but allow *live-search* ones — different bots. Most block both by accident. Your audit untangles which is which.)

Audit still coming. Haven't sent your URL + competitor yet? Reply and you jump the queue.

— [Name] · aicitescore.com

### Email J5 — claim your spot / 15-min chat
**Subject:** Your founding spot (and a 15-min offer)

Hey,

The first 50 founding spots are filling up. Two things:

**1. Claim it.** Founding members get the hand audit free, grandfathered pricing when CiteScore goes paid, and a direct line to me. If you're in, reply "in".

**2. Optional: 15 minutes, live.** I share my screen and walk through your site's 12 signals — what ChatGPT sees and why it recommends someone else. No pitch. → [CALENDLY LINK]

**3. Want it done for you?** If you'd rather I just ship the fixes (write your `llms.txt`, patch your `robots.txt`, add the schema), reply "do it" and I'll tell you how that works. Founding members get priority.

Either way you're in good company — [N] founders building in public have joined.

— [Name] · aicitescore.com
P.S. Not the right time? Stay on the list, I'll send your async audit when your number comes up.

---

## 2. Lead magnet
Hosted at **https://aicitescore.com/checklist** (the `/checklist` page). Same content, branded, with a CTA back to the waitlist.

---

## 3. Reddit value post (r/indiehackers or r/SaaS)
**Title:** I checked 10 indie SaaS sites to see if ChatGPT could "see" them. 7 were basically invisible. Here's what to fix.

Quick context: a chunk of my signups now say "found you via ChatGPT" or "Perplexity recommended you." That made me paranoid about the flip side — when someone asks an AI for "a tool like mine," is it recommending *me* or my competitors? So I went down a rabbit hole on how AI search engines pick what to cite (people call it GEO/AEO).

Then I manually checked 10 indie SaaS sites against what matters. 7 were leaving citations on the table for reasons that take an afternoon to fix:

**1. Check robots.txt for AI bots.** Open `yoursite.com/robots.txt`. If `GPTBot`/`PerplexityBot` shows `Disallow: /`, you've locked the AI out — often inherited from a template. 3 of 10 were doing this unknowingly.
**2. Answer-first, not story-first.** AI quotes the first sentence or two of a relevant section. Lead with the answer.
**3. FAQ that matches how people ask AI.** "Is X good for Y", "X vs Z", "does X integrate with W." Most had zero.
**4. Schema.org markup.** Product/Organization/FAQPage. Half had none.
**5. Own your comparisons.** No "vs" content → the AI invents one, rarely in your favor.
**6. Sleeper: `llms.txt`.** A tiny `/llms.txt` telling models what your site is. Almost nobody has one — free edge.
**7. Freshness.** Visible "updated" dates.

Mental model: AI search needs to *read* you (crawlable), *understand* you (structured), *trust* you (cited/consistent). Most of us optimized for Google humans and never re-checked for AI readers.

Happy to answer questions — I went deep on this.

(Disclosure: I'm building a free tool around this and hand-auditing the first batch of sites — aicitescore.com. But the 7 fixes above are the whole game whether you use it or not.)

---

## 4. Show HN
**Title:** Show HN: CiteScore – grade your site A–F on whether AI search engines will cite it

**First comment:**
Hi HN, solo dev here. The itch: I noticed signups citing "ChatGPT recommended you," which made me wonder how often the *opposite* happens — an AI recommends a competitor and I never see it. There's no analytics event for "got skipped by Perplexity."

So I built CiteScore. Give it a URL, it grades you A–F on the signals that determine whether ChatGPT/Perplexity/Google AI Overviews can read, understand and cite you: AI-bot rules in robots.txt, `llms.txt`, schema.org, answer-first structure, FAQ coverage, freshness, topical depth.

It's a waitlist right now, and I'm honest about why: I want to hand-audit the first ~50 sites myself before trusting automated scoring. Founding sites get a manual grade, their 3 highest-leverage fixes, and a competitor benchmark — which teaches me what to weight.

Open questions I'd love HN's take on:
1. How much should `llms.txt` actually count? It's young and unevenly respected.
2. Is "block training crawlers but allow live-search crawlers" worth surfacing per-bot?
3. What signals am I underweighting?

Tear it apart — that's why I'm posting. aicitescore.com

---

## 5. X/Twitter (#buildinpublic)
**1 (hook):** Your site has analytics for everything except the thing quietly killing you: how often ChatGPT recommends a competitor when someone asks for a tool like yours. There's no "you got skipped by Perplexity" event. But it's happening. #buildinpublic #GEO

**2 (update):** Day [N] building CiteScore. Shipped the robots.txt + llms.txt checks. Already found 3 indie sites blocking GPTBot by accident via a copy-pasted "block AI scrapers" template. Invisible to ChatGPT, no idea. 🛠️

**3 (data):** I manually checked 10 indie SaaS sites to see if AI search could "see" them. 7 failed. Common misses: → no FAQ matching how people prompt AI → answer buried in paragraph 4 → zero schema → no comparison content. None are hard. All unfixed.

**4 (contrarian):** Hot take: "block all AI crawlers" was the worst advice indie founders took in 2024. You didn't protect your content — you deleted yourself from the channel your buyers now use to find tools. Training crawler ≠ live-search crawler. Block one, keep the other.

**5 (soft launch):** Building CiteScore: paste a URL, get an A–F grade on whether ChatGPT / Perplexity / Google AI will actually cite you. First 50 sites get a free hand audit from me — grade, 3 fixes, and who's eating your citations. Waitlist 👇 aicitescore.com #buildinpublic

---

## 6. LinkedIn (#GEO / #AEO)
We spent 15 years optimizing websites for one reader: Google's crawler serving a human a list of blue links. That reader is being replaced.

When a buyer asks ChatGPT or Perplexity "what's the best tool for X," the AI returns one answer — and names a few products. If you're not one, you don't rank lower. You get *no impression at all.* And unlike search, there's no console telling you it happened.

This is GEO, and most sites fail it for unglamorous reasons: AI crawlers blocked in robots.txt (often by accident) · answers buried mid-page · no structured data · no comparison content.

The fix isn't a rewrite. It's making your site readable, understandable and trustworthy to a machine reader, not just a human.

I built a free tool to grade exactly this — A→F on the signals that decide whether AI cites you. First 50 sites get a hand audit: grade, 3 priority fixes, and a benchmark vs. the competitor winning your AI recommendations.

If you own a site that sells something, it's worth knowing your score before your competitor knows theirs. Link in comments.

#GEO #AEO #AISearch #B2BMarketing
