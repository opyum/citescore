/* ============================================================
   CiteScore — i18n (FR / EN), auto-detected from the visitor.
   Strings live here; index.html elements carry data-i18n keys.
   ============================================================ */
const I18N = (() => {
  const SUPPORTED = ["en", "fr"];

  const DICT = {
    en: {
      _htmlLang: "en",
      _title: "CiteScore — Is your site cited by AI? Free AI Search Readiness score",
      _desc: "ChatGPT, Perplexity and Google AI recommend businesses like yours every day — by citing someone. Get your AI Search Readiness score (A→F) and the fixes. Free.",
      nav_status: "founding access open",
      nav_cta: "Get my free audit",
      hero_eyebrow: "// AI SEARCH READINESS · GEO/AEO AUDIT",
      hero_h1: "Is your site<br /><em>cited</em> by AI?",
      hero_lede: "ChatGPT, Perplexity and Google AI Overviews recommend businesses like yours every day — by citing <span class=\"u\">someone</span>. If it isn't you, you're invisible. Get your <strong>AI Search Readiness score</strong> — and the exact fixes to climb.",
      hero_url_ph: "your-site.com",
      hero_btn: "Get my free audit →",
      hero_note: "No credit card. Hand-checked by a real human — full report in ~48h. <span class=\"spots\">First 50 sites only.</span>",
      sc_top_left: "// SAMPLE REPORT · acme.com",
      sc_top_right: "▮ this is what you get",
      sc_readiness: "AI READINESS",
      sc_1: "llms.txt present", sc_2: "AI crawlers allowed (robots.txt)", sc_3: "Structured data (schema.org)", sc_4: "Answer-first content blocks", sc_5: "3 competitors rank above you",
      prob_tag: "// THE SHIFT",
      prob_h2: "Search stopped sending clicks.<br /><span class=\"muted\">Now the AI answers — and names a winner.</span>",
      prob_s1n: "60%+", prob_s1l: "of searches now end <em>without a click</em>",
      prob_s2n: "1", prob_s2l: "business usually gets <em>cited</em> in the answer",
      prob_s3n: "0", prob_s3l: "tools tell you if that business is <em>you</em>",
      prob_line: "When someone asks ChatGPT for “a business like yours,” it confidently recommends three of your competitors — and you have no idea why, or that it even happened.",
      get_tag: "// YOUR REPORT",
      get_h2: "What lands in your inbox",
      get_c1h: "A grade, A → F", get_c1p: "One honest number for how citable you are to AI engines. Screenshot-ready.",
      get_c2h: "The fixes, ready to paste", get_c2p: "Not 50 todos — the few changes that matter, with the files done for you: your <code>llms.txt</code>, the exact <code>robots.txt</code> lines, your schema markup.",
      get_c3h: "A competitor side-by-side", get_c3p: "See where a rival beats you on AI readiness — and exactly on which signals.",
      how_tag: "// HOW IT WORKS",
      how_h2: "Thirty seconds of effort",
      how_1h: "Drop your URL", how_1p: "That's the whole ask. No signup wall before the value.",
      how_2h: "We audit 12 citability signals", how_2p: "Structured data, AI-bot access, answer-first structure, FAQ coverage, freshness & more.",
      how_3h: "Get your score + action plan", how_3p: "Your grade, the fixes that matter, and a competitor benchmark.",
      sig_tag: "// THE 12 SIGNALS",
      sig_h2: "What we actually check",
      sig_sub: "Most sites quietly fail 7 of these. Here are a few:",
      sig_1: "Schema.org structured data", sig_2: "FAQ coverage (real buyer questions)", sig_3: "E-E-A-T signals (authors, dates)", sig_4: "Answer-first content blocks", sig_5: "Heading & semantic structure", sig_6: "AI crawler access (robots.txt)", sig_7: "Entity & name consistency", sig_8: "Content freshness", sig_locked: "+ 4 more 🔒",
      off_tag: "// FOUNDING ACCESS",
      off_h2: "First 50 sites only",
      off_1: "<b>Free scan, for life</b> — one site monitored, free, forever.",
      off_2: "<b>Full report first</b> — the detailed audit, before public launch.",
      off_3: "<b>“Founding Member” badge</b> — for your site.",
      off_4: "<b>Direct line to the maker</b> — shape what gets built.",
      off_note: "// Built in public by a solo founder. I hand-audit every founding site personally — and help you ship the fixes. That's why it's capped at 50.",
      join_tag: "// CLAIM YOUR SCORE",
      join_h2: "Get your AI Search Readiness score",
      join_sub: "Your audit, before everyone else. We'll email it to you.",
      join_l_site: "Website", join_l_email: "Email",
      join_url_ph: "your-site.com", join_email_ph: "you@company.com",
      join_role_legend: "You're mostly a…",
      role_founder: "Founder / business owner", role_marketing: "Marketing / SEO", role_agency: "Agency (multi-site)", role_other: "Other",
      join_intent: "Optional — would continuous monitoring be useful later? (Alerts when your score drops or a competitor passes you.) <em>Founding members get it free for life — this just helps me prioritize.</em>",
      join_price_q: "// if it were paid, a fair price would be…",
      join_btn: "Claim my founding spot →",
      join_micro: "You'll get your hand-audited report in ~48h, straight to your inbox. No spam. Unsubscribe in one click.",
      ok_h3: "You're on the founding list.",
      ok_p: "We'll hand-audit <strong id=\"ok-url\">your site</strong> and email your full AI Search Readiness score + the fixes shortly. Watch your inbox.",
      teaser_head: "// instant peek — we just checked 3 of the 12 signals:",
      teaser_tail: "Your full 12-signal audit + ready-to-paste fixes land within ~48h.",
      ok_tip: "// tip: reply to that email with a competitor's URL and we'll benchmark you against them.",
      faq_tag: "// FAQ",
      faq_q1: "Is it really free?", faq_a1: "Yes. Your scan and score cost nothing, no card required. Later we'll offer optional paid monitoring — but the audit you get now is free, for good.",
      faq_q2: "When do I get my score?", faq_a2: "Founding sites are hand-audited by the maker, so within a couple of days. You'll get an email with your grade, fixes, and a competitor benchmark.",
      faq_q3: "Does AI visibility actually matter yet?", faq_a3: "If your buyers already ask ChatGPT or Perplexity for recommendations — and increasingly they do — you're already being judged by AI engines. This tells you how you score.",
      faq_q4: "What do you do with my data?", faq_a4: "We store your email and URL to send your audit and product updates. We don't sell your data. One-click unsubscribe, always.",
      final_h2: "AI is recommending <em>someone</em> right now.",
      final_sub: "Find out if it's you.",
      final_btn: "Get my free audit →",
      footer_tag: "aicitescore.com · AI Search Readiness",
      // app.js runtime strings
      rt_checking: "checking your public signals…",
      rt_llms: "llms.txt present", rt_ai: "AI crawlers allowed (robots.txt)", rt_schema: "Structured data (schema.org)",
      rt_badinput: "Check your URL + email →", rt_saving: "Saving…", rt_error: "Something broke — try again →",
    },

    fr: {
      _htmlLang: "fr",
      _title: "CiteScore — Votre site est-il cité par l'IA ? Note de visibilité IA gratuite",
      _desc: "ChatGPT, Perplexity et Google AI recommandent des entreprises comme la vôtre chaque jour — en citant quelqu'un. Obtenez votre note de visibilité IA (A→F) et les correctifs. Gratuit.",
      nav_status: "accès fondateur ouvert",
      nav_cta: "Ma note gratuite",
      hero_eyebrow: "// VISIBILITÉ IA · AUDIT GEO/AEO",
      hero_h1: "L'IA cite-t-elle<br />votre <em>site</em> ?",
      hero_lede: "ChatGPT, Perplexity et Google AI recommandent des entreprises comme la vôtre chaque jour — en citant <span class=\"u\">quelqu'un</span>. Si ce n'est pas vous, vous êtes invisible. Obtenez votre <strong>note de visibilité IA</strong> — et les correctifs exacts pour grimper.",
      hero_url_ph: "votre-site.fr",
      hero_btn: "Obtenir ma note →",
      hero_note: "Sans carte bancaire. Audit fait à la main par un vrai humain — rapport sous ~48h. <span class=\"spots\">50 premiers sites seulement.</span>",
      sc_top_left: "// EXEMPLE · acme.fr",
      sc_top_right: "▮ votre rapport",
      sc_readiness: "VISIBILITÉ IA",
      sc_1: "llms.txt présent", sc_2: "Bots IA autorisés (robots.txt)", sc_3: "Données structurées (schema.org)", sc_4: "Contenu « réponse d'abord »", sc_5: "3 concurrents cités avant vous",
      prob_tag: "// LE BASCULEMENT",
      prob_h2: "La recherche n'envoie plus de clics.<br /><span class=\"muted\">L'IA répond — et nomme un gagnant.</span>",
      prob_s1n: "60%+", prob_s1l: "des recherches se terminent désormais <em>sans clic</em>",
      prob_s2n: "1", prob_s2l: "entreprise est généralement <em>citée</em> dans la réponse",
      prob_s3n: "0", prob_s3l: "outil ne vous dit si cette entreprise, c'est <em>vous</em>",
      prob_line: "Quand on demande à ChatGPT « une entreprise comme la vôtre », il recommande trois de vos concurrents avec assurance — et vous ne savez ni pourquoi, ni même que ça vient d'arriver.",
      get_tag: "// VOTRE RAPPORT",
      get_h2: "Ce que vous recevez par email",
      get_c1h: "Une note, A → F", get_c1p: "Un chiffre honnête sur votre capacité à être cité par les IA. Prêt à partager.",
      get_c2h: "Les correctifs, prêts à coller", get_c2p: "Pas 50 tâches — les changements qui comptent, fichiers faits pour vous : votre <code>llms.txt</code>, les lignes <code>robots.txt</code> exactes, votre balisage schema.",
      get_c3h: "Le face-à-face concurrent", get_c3p: "Voyez où un rival vous dépasse en visibilité IA — et sur quels signaux exactement.",
      how_tag: "// COMMENT ÇA MARCHE",
      how_h2: "Trente secondes d'effort",
      how_1h: "Donnez votre URL", how_1p: "C'est tout. Aucun compte à créer avant d'avoir la valeur.",
      how_2h: "On audite 12 signaux de citabilité", how_2p: "Données structurées, accès des bots IA, structure « réponse d'abord », FAQ, fraîcheur…",
      how_3h: "Recevez votre note + plan d'action", how_3p: "Votre note, les correctifs qui comptent, et un benchmark concurrent.",
      sig_tag: "// LES 12 SIGNAUX",
      sig_h2: "Ce qu'on vérifie vraiment",
      sig_sub: "La plupart des sites en échouent 7 sans le savoir. Quelques-uns :",
      sig_1: "Données structurées schema.org", sig_2: "Couverture FAQ (vraies questions clients)", sig_3: "Signaux E-E-A-T (auteurs, dates)", sig_4: "Contenu « réponse d'abord »", sig_5: "Structure de titres & sémantique", sig_6: "Accès des bots IA (robots.txt)", sig_7: "Cohérence d'entité & de nom", sig_8: "Fraîcheur du contenu", sig_locked: "+ 4 autres 🔒",
      off_tag: "// ACCÈS FONDATEUR",
      off_h2: "50 premiers sites seulement",
      off_1: "<b>Audit gratuit à vie</b> — un site surveillé, gratuitement, pour toujours.",
      off_2: "<b>Le rapport complet en avant-première</b> — avant l'ouverture publique.",
      off_3: "<b>Badge « Membre Fondateur »</b> — pour votre site.",
      off_4: "<b>Ligne directe avec le créateur</b> — vous orientez ce qui est construit.",
      off_note: "// Construit par un développeur solo. J'audite chaque site fondateur à la main — et je vous aide à appliquer les correctifs. D'où la limite de 50.",
      join_tag: "// OBTENIR VOTRE NOTE",
      join_h2: "Votre note de visibilité IA",
      join_sub: "Votre audit, avant tout le monde. On vous l'envoie par email.",
      join_l_site: "Site web", join_l_email: "Email",
      join_url_ph: "votre-site.fr", join_email_ph: "vous@entreprise.fr",
      join_role_legend: "Vous êtes plutôt…",
      role_founder: "Fondateur / dirigeant", role_marketing: "Marketing / SEO", role_agency: "Agence (plusieurs sites)", role_other: "Autre",
      join_intent: "Optionnel — un suivi continu vous serait-il utile ? (Alertes quand votre note baisse ou qu'un concurrent vous dépasse.) <em>Les membres fondateurs l'ont gratuit à vie — ça m'aide juste à prioriser.</em>",
      join_price_q: "// s'il était payant, un prix juste serait…",
      join_btn: "Réserver ma place fondateur →",
      join_micro: "Vous recevrez votre rapport fait main sous ~48h, par email. Pas de spam. Désinscription en un clic.",
      ok_h3: "Vous êtes sur la liste fondateur.",
      ok_p: "On audite à la main <strong id=\"ok-url\">votre site</strong> et on vous envoie votre note de visibilité IA complète + les correctifs très vite. Surveillez votre boîte mail.",
      teaser_head: "// aperçu instantané — on a vérifié 3 des 12 signaux :",
      teaser_tail: "Votre audit complet des 12 signaux + les correctifs prêts à coller arrivent sous ~48h.",
      ok_tip: "// astuce : répondez à cet email avec l'URL d'un concurrent, on vous benchmarke contre lui.",
      faq_tag: "// FAQ",
      faq_q1: "C'est vraiment gratuit ?", faq_a1: "Oui. Votre audit et votre note ne coûtent rien, sans carte bancaire. On proposera plus tard un suivi continu optionnel et payant — mais l'audit que vous recevez maintenant est gratuit, pour de bon.",
      faq_q2: "Quand est-ce que je reçois ma note ?", faq_a2: "Les sites fondateurs sont audités à la main par le créateur, donc sous quelques jours. Vous recevrez un email avec votre note, les correctifs et un benchmark concurrent.",
      faq_q3: "La visibilité IA, ça compte vraiment déjà ?", faq_a3: "Si vos clients utilisent déjà ChatGPT ou Perplexity pour des recommandations — et c'est de plus en plus le cas — vous êtes déjà jugé par ces moteurs. Ceci vous dit où vous en êtes.",
      faq_q4: "Que faites-vous de mes données ?", faq_a4: "On stocke votre email et votre URL pour vous envoyer l'audit et les actualités produit. On ne vend pas vos données. Désinscription en un clic, toujours.",
      final_h2: "En ce moment, l'IA recommande <em>quelqu'un</em>.",
      final_sub: "Découvrez si c'est vous.",
      final_btn: "Obtenir ma note →",
      footer_tag: "aicitescore.com · Visibilité IA",
      rt_checking: "vérification de vos signaux publics…",
      rt_llms: "llms.txt présent", rt_ai: "Bots IA autorisés (robots.txt)", rt_schema: "Données structurées (schema.org)",
      rt_badinput: "Vérifiez votre URL + email →", rt_saving: "Enregistrement…", rt_error: "Une erreur s'est produite — réessayez →",
    },
  };

  function pick() {
    try {
      const saved = localStorage.getItem("cs_lang");
      if (saved && SUPPORTED.includes(saved)) return saved;
      const q = new URLSearchParams(location.search).get("lang");
      if (q && SUPPORTED.includes(q)) return q;
      const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
      return SUPPORTED.includes(nav) ? nav : "en";
    } catch (_) { return "en"; }
  }

  let lang = pick();
  const t = (k) => (DICT[lang] && DICT[lang][k] != null ? DICT[lang][k] : (DICT.en[k] || ""));

  function apply() {
    const d = DICT[lang] || DICT.en;
    document.documentElement.lang = d._htmlLang;
    document.title = d._title;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", d._desc);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = d[el.getAttribute("data-i18n")];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const v = d[el.getAttribute("data-i18n-ph")];
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const v = d[el.getAttribute("data-i18n-aria")];
      if (v != null) el.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-setlang]").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-setlang") === lang);
    });
  }

  function set(l) {
    if (!SUPPORTED.includes(l)) return;
    lang = l;
    try { localStorage.setItem("cs_lang", l); } catch (_) {}
    apply();
  }

  document.addEventListener("DOMContentLoaded", () => {
    apply();
    document.querySelectorAll("[data-setlang]").forEach((b) =>
      b.addEventListener("click", () => set(b.getAttribute("data-setlang")))
    );
  });

  return { t, set, get: () => lang };
})();
window.I18N = I18N;
