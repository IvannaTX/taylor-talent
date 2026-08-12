/**
 * Every string on the redesigned site.
 *
 * Voice: an operator stating what happens, in the present tense, with a number
 * attached. Short sentences. No adjectives doing work a fact could do. The
 * banned list (boutique, premier, best-in-class, world-class, rockstar, ninja,
 * unicorn, staffing agency) appears nowhere.
 *
 * Structure mirrors the page: a hero, two audience "runs" of beats, and the
 * closing scheduler. Each beat carries exactly one metric — that constraint is
 * what keeps the page from becoming a wall of claims.
 */

export const hero = {
  eyebrow: "Executive search · Austin, TX",
  // Two declarative sentences, the second in the gradient.
  line1: "Senior hires decide",
  line2: "the next five years.",
  lede: "Taylor Talent Partners runs retained executive search for companies where one seat changes the trajectory — and keeps a confidential line open to the leaders who fill them.",
  cta: "Book a Discovery Call",
  secondary: "See how a search runs",
  note: "30 minutes. An honest read on the search, whether or not we work together.",
};

/** Provenance, not endorsement — the label makes that explicit on the page. */
export const provenance = {
  label: "Ten years of searches run inside and for",
  inHouse: ["Apple", "Google", "Indeed"],
  agency: ["GLG", "Checkr", "DISCO", "Talentful"],
};

export type Beat = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  metric: { value: string; label: string };
  artifact: string;
};

/** The company-side run. Each beat is one stage of a live search. */
export const companyBeats: Beat[] = [
  {
    id: "calibrate",
    eyebrow: "Stage 01 — Calibration",
    title: "The search starts with what is actually hireable.",
    body: "Before a single name is sourced, we pressure-test the role against the market: the success profile, the comp band, the non-negotiables. If the role as written cannot be filled, you hear it in week one — not in month four.",
    metric: { value: "Week 1", label: "You know if the role is hireable" },
    artifact: "calibration",
  },
  {
    id: "map",
    eyebrow: "Stage 02 — Market map",
    title: "The whole market, including the people who said no.",
    body: "Every qualified operator in the territory, contacted and logged. You see the coverage: who engaged, who passed, and the reason they gave. The passes are the most useful data in the search.",
    metric: { value: "100%", label: "Of the territory mapped and logged" },
    artifact: "market-map",
  },
  {
    id: "shortlist",
    eyebrow: "Stage 03 — Shortlist",
    title: "Three to five people, with the reservations left in.",
    body: "Each candidate is written up against the calibrated profile — evidence for, evidence against, and the one thing that might not work. Nothing is smoothed over to protect the pipeline.",
    metric: { value: "3–5", label: "Candidates, never a stack of résumés" },
    artifact: "shortlist",
  },
  {
    id: "interview",
    eyebrow: "Stage 04 — Evaluation",
    title: "One rubric. The same questions, in the same order.",
    body: "Structured interviews against a single scorecard, with a written debrief inside 24 hours of every round. You compare evidence between candidates instead of comparing impressions between interviewers.",
    metric: { value: "24 hrs", label: "From interview to written debrief" },
    artifact: "scorecard",
  },
  {
    id: "close",
    eyebrow: "Stage 05 — Offer & close",
    title: "In the room until someone has started.",
    body: "Comp strategy, references, counter-offer pressure, notice period, start date. The search is not finished when an offer goes out. It is finished when the person is in the seat.",
    metric: { value: "One", label: "Point of contact, intake to start date" },
    artifact: "offer",
  },
];

/** The leader-side run. Same grammar, opposite side of the table. */
export const leaderBeats: Beat[] = [
  {
    id: "confidential",
    eyebrow: "Confidential by default",
    title: "A private line, not a row in a database.",
    body: "Your details sit with one person. Nothing is uploaded to a client system, forwarded to a hiring manager, or entered into a pipeline. If you are currently employed, that is the assumption we work under until you say otherwise.",
    metric: { value: "Zero", label: "Names shared without your yes" },
    artifact: "confidential",
  },
  {
    id: "approve",
    eyebrow: "You hold the gate",
    title: "Every introduction waits for your approval.",
    body: "When a mandate genuinely fits, you get the company, the scope, the comp band and the reason it came to you. You approve or decline. Declining costs you nothing and changes nothing.",
    metric: { value: "You", label: "Decide what moves, and when" },
    artifact: "intro",
  },
  {
    id: "trajectory",
    eyebrow: "The long game",
    title: "Built around your next three moves.",
    body: "The useful conversation is rarely about the role in front of you. It is about what the next two steps need to look like for the one after that to be available. Sometimes the honest advice is to stay put another year.",
    metric: { value: "3 moves", label: "The horizon we plan against" },
    artifact: "trajectory",
  },
];

export const practice = {
  eyebrow: "Practice areas",
  title: "Where the map is already in hand.",
  lede: "Depth beats breadth in search. These are the functions and levels where the network is live and the comp data is current.",
  functions: [
    { name: "Executive / C-suite", note: "CEO, COO, CRO, CTO, CPO" },
    { name: "Go-to-market", note: "Sales, marketing, revenue ops" },
    { name: "Product", note: "CPO through senior PM" },
    { name: "Engineering & technical", note: "VP Eng, platform, infra, AI" },
    { name: "Customer success", note: "CS, support, post-sales" },
    { name: "G&A & finance", note: "CFO, controller, people" },
    { name: "Legal", note: "GC, deputy GC, commercial" },
  ],
  levels: ["C-suite", "SVP", "VP", "Head of", "Director"],
  sectors: [
    { name: "Technology & SaaS", note: "First VP through IPO-stage bench" },
    { name: "Venture-backed", note: "Founding and early leadership" },
    { name: "Private equity portfolios", note: "Nine of the ten largest global firms served" },
    { name: "Professional & legal services", note: "Leadership under the partners" },
  ],
};

export const jarod = {
  eyebrow: "Who you actually work with",
  title: "One person runs your search.",
  lede: "Not a team, not an account manager, and not a junior researcher after the contract is signed. The person who takes your intake is the person who negotiates the offer.",
  name: "Jarod Taylor",
  role: "Founder",
  location: "Austin, Texas",
  body: [
    "Ten years of search across technical, legal and C-suite mandates — recruiting inside Apple, Google and Indeed before moving agency-side at GLG, DISCO, Checkr and Talentful.",
    "Most recently a Senior Talent Partner embedded with founders and executive teams, aligning hiring to the growth plan rather than working a req queue.",
  ],
  facts: [
    { k: "Recruiting since", v: "2015" },
    { k: "Hires in one org", v: "75+" },
    { k: "Largest global PE firms served", v: "9 of 10" },
    { k: "Metric attainment, nine months", v: "121%" },
  ],
};

/** Placeholder testimonials, in the format the real ones will drop into. */
export const proof = {
  eyebrow: "References",
  title: "What clients repeat.",
  lede: "Real references are available on request. The three below are placeholders and are marked as such until they are replaced.",
  quotes: [
    {
      quote:
        "Placeholder — a client on calibration: the moment the scope changed because of an honest read on the market.",
      name: "Client name",
      role: "Title",
      company: "Company",
    },
    {
      quote:
        "Placeholder — a placed executive on how the process felt from the candidate side of the table.",
      name: "Placed executive",
      role: "Title",
      company: "Company",
    },
    {
      quote:
        "Placeholder — a founder or board member on speed and signal-to-noise on the shortlist.",
      name: "Founder or board member",
      role: "Title",
      company: "Company",
    },
  ],
};

export const finale = {
  eyebrow: "Book a discovery call",
  title: "Bring the role, the constraint and the deadline.",
  lede: "Thirty minutes with Jarod. You will leave knowing whether the search is straightforward, hard, or scoped wrong — and what it would take either way.",
  cta: "Book a Discovery Call",
  bullets: [
    "An honest read on the market for this role",
    "A realistic comp band and timeline",
    "No obligation, and no follow-up sequence",
  ],
};
