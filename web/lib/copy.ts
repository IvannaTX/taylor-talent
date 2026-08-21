/**
 * Every string on the redesigned site.
 *
 * Voice: an operator stating what happens, in the present tense, with a number
 * attached. Short sentences. No adjectives doing work a fact could do. The
 * banned list (premier, best-in-class, world-class, rockstar, ninja, unicorn,
 * staffing agency) appears nowhere. "Boutique" is on the page because it is how
 * the founder describes the firm, not as a filler adjective.
 *
 * Em dashes are not used anywhere in site copy. Hyphens, commas and colons
 * carry the same joins.
 *
 * Structure mirrors the page: a hero, two audience "runs" of beats, and the
 * closing scheduler. Each beat carries exactly one metric, and that constraint
 * is what keeps the page from becoming a wall of claims.
 */

export const hero = {
  eyebrow: "Startup & scale-up recruiting",
  // Two declarative sentences, the second in the gradient.
  line1: "The Right People",
  line2: "Change Everything.",
  lede: "Taylor Talent is a boutique recruitment firm specializing in talent acquisition solutions for high-growth VC and PE-backed startups and scale-ups, from pre-seed to late stage.",
  cta: "Book a Discovery Call",
  note: "A conversation about the roles you are hiring for, the market for them, and how a search would run.",
  /**
   * Plain text under the hero. Deliberately not inside an animation or an image:
   * it is the paragraph a crawler or an AI agent should be able to lift to
   * answer what the firm does and who it serves.
   */
  positioning:
    "Hiring runs across four practice areas: go-to-market, technical, executive and legal. Engagements are structured as retained search or on a contingency, success-based basis.",
};

/** Provenance, not endorsement. The label makes that explicit on the page. */
export const provenance = {
  label: "Ten years of searches run inside and alongside",
  inHouse: ["Apple", "Google", "Indeed", "GLG", "Checkr", "DISCO", "Talentful"],
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
    eyebrow: "Stage 01 · Calibration",
    title: "The search starts with what is actually hireable.",
    body: "Before a single name is sourced, we pressure-test the role against the market: the success profile, the comp band, the non-negotiables. If the role as written cannot be filled, you hear it in week one, not in month four.",
    metric: { value: "Week 1", label: "You know if the role is hireable" },
    artifact: "calibration",
  },
  {
    id: "map",
    eyebrow: "Stage 02 · Market map",
    title: "The whole market, including the people who said no.",
    body: "Every qualified operator in the territory, contacted and logged. You see the coverage: who engaged, who passed, and the reason they gave. The passes are the most useful data in the search.",
    metric: { value: "100%", label: "Of the territory mapped and logged" },
    artifact: "market-map",
  },
  {
    id: "shortlist",
    eyebrow: "Stage 03 · Shortlist",
    title: "Three to five people, with the reservations left in.",
    body: "Each candidate is written up against the calibrated profile: evidence for, evidence against, and the one thing that might not work. Every submission is reviewed by Jarod Taylor before it reaches you, and nothing is smoothed over to protect the pipeline.",
    metric: { value: "3-5", label: "Candidates, never a stack of résumés" },
    artifact: "shortlist",
  },
  {
    id: "interview",
    eyebrow: "Stage 04 · Evaluation",
    title: "One rubric. The same questions, in the same order.",
    body: "Structured interviews against a single scorecard, with a written debrief inside 24 hours of every round. You compare evidence between candidates instead of comparing impressions between interviewers.",
    metric: { value: "24 hrs", label: "From interview to written debrief" },
    artifact: "scorecard",
  },
  {
    id: "close",
    eyebrow: "Stage 05 · Offer & close",
    title: "In the room until someone has started.",
    body: "Comp strategy, references, counter-offer pressure, notice period, start date. The search is not finished when an offer goes out. It is finished when the person is in the seat.",
    metric: { value: "One", label: "Accountable team, intake to start date" },
    artifact: "offer",
  },
];

/** The leader-side run. Same grammar, opposite side of the table. */
export const leaderBeats: Beat[] = [
  {
    id: "confidential",
    eyebrow: "Confidential by default",
    title: "A private line, not a row in a database.",
    body: "Your details stay inside this practice. Nothing is uploaded to a client system, forwarded to a hiring manager, or entered into a pipeline. If you are currently employed, that is the assumption we work under until you say otherwise.",
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
  title: "Four practice areas, one accountable team.",
  lede: "Taylor Talent recruits across go-to-market, technical, executive and legal hiring for high-growth VC and PE-backed startups and scale-ups.",
  functions: [
    { name: "Go-to-market", note: "Sales, marketing, revenue ops" },
    { name: "Technical", note: "VP Eng, platform, infra, data, AI" },
    { name: "Executive / C-suite", note: "CEO, COO, CFO, CRO, CTO, CPO" },
    { name: "Product", note: "CPO through senior PM" },
    { name: "Customer success", note: "CS, support, post-sales" },
    { name: "Finance, operations & G&A", note: "Finance, people, business ops" },
    { name: "High-volume & evergreen", note: "Repeatable roles as a team scales" },
    { name: "Legal", note: "GC, deputy GC, commercial" },
  ],
  levels: [
    "Individual contributor",
    "Manager",
    "Director",
    "Senior Director",
    "Head of",
    "VP",
    "SVP",
    "C-suite",
  ],
  sectors: [
    { name: "Venture-backed startups", note: "Seed through growth stage" },
    { name: "Scale-ups", note: "First leadership bench through IPO-stage teams" },
    { name: "Technology & SaaS", note: "Product, platform and infrastructure teams" },
    { name: "Private equity portfolios", note: "Nine of the ten largest global firms served" },
  ],
};

/**
 * How an engagement is structured. Deliberately free of contractual specifics:
 * fee percentages, guarantee windows and replacement terms belong in the
 * recruiter agreement, not on a marketing page.
 */
export const engagementModels = {
  eyebrow: "Engagement models",
  title: "Two ways to run a search.",
  lede: "Retained search is one model, not the only one. The right structure depends on the role, the urgency and how much of the market has to be covered.",
  models: [
    {
      id: "retained-search",
      name: "Retained search",
      body: "An exclusive engagement for roles that need the whole market covered. Taylor Talent runs the search end to end: calibration, market map, shortlist, evaluation and close.",
      points: [
        "Exclusive, committed engagement",
        "Full market map rather than a pipeline",
        "Typically executive and business-critical roles",
      ],
    },
    {
      id: "contingency-search",
      name: "Contingency / success-based search",
      body: "No upfront payment. The fee is due when a hire is made. Suited to roles where speed matters and the search can run alongside your own sourcing.",
      points: [
        "No upfront payment",
        "Fee due on a successful hire",
        "Runs alongside in-house recruiting",
      ],
    },
  ],
  note: "Specific fee structures and agreement terms are confirmed in writing before a search begins.",
};

export const jarod = {
  eyebrow: "Who you actually work with",
  title: "A team of TA experts, with Jarod over every search.",
  lede: "White-glove support is delivered by a team of talent acquisition experts. Jarod Taylor oversees the search and personally reviews every submission before it reaches you.",
  name: "Jarod Taylor",
  role: "Founder",
  location: "Austin, Texas",
  body: [
    "Ten years of recruiting across go-to-market, technical, legal and C-suite hiring, inside and alongside Apple, Google, Indeed, GLG, DISCO, Checkr and Talentful.",
    "Most recently a Senior Talent Partner embedded with founders and executive teams, aligning hiring to the growth plan rather than working a req queue.",
  ],
  facts: [
    { k: "Recruiting since", v: "2015" },
    { k: "Hires in one org", v: "75+" },
    { k: "Largest global PE firms served", v: "9 of 10" },
    { k: "Metric attainment, nine months", v: "121%" },
  ],
};

export const aboutPhilosophy = {
  eyebrow: "Recruiting philosophy",
  title: "Search should create clarity, not activity.",
  lede: "The work is measured by the quality of the decision, not the size of the pipeline.",
  principles: [
    {
      title: "Tell the truth early.",
      body: "If the scope, compensation or expectations do not match the market, the useful moment to say so is before outreach begins.",
    },
    {
      title: "Protect both sides.",
      body: "Companies deserve candid evidence. Leaders deserve context, discretion and control over every introduction.",
    },
    {
      title: "Stay accountable through the close.",
      body: "The team that calibrates the role stays in the room through interviews, references, negotiation and acceptance, with Jarod overseeing the search throughout.",
    },
  ],
};

/**
 * References. No quote is published without written approval and attribution
 * from the person who said it, so this section carries none until then.
 */
export const proof = {
  eyebrow: "References",
  title: "References available on request.",
  lede: "Client and candidate references are provided directly during a discovery conversation rather than published as marketing copy.",
  quotes: [] as {
    quote: string;
    name: string;
    role: string;
    company: string;
  }[],
};

export const finale = {
  eyebrow: "Book a discovery call",
  title: "Start a conversation about your hiring.",
  lede: "Bring the roles you are hiring for. You will leave knowing how the market looks for them, what a realistic timeline is, and which engagement model fits.",
  cta: "Book a Discovery Call",
  bullets: [
    "An honest read on the market for the roles you are filling",
    "A realistic compensation band and timeline",
    "The engagement model that fits, retained or contingency",
  ],
};
