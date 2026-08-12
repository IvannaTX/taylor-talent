/**
 * All site copy. Voice: an executive advisor stating facts, not a recruiter
 * selling. Concrete numbers over adjectives. Banned vocabulary (boutique,
 * premier, best-in-class, world-class, rockstar, ninja, unicorn, staffing
 * agency) does not appear anywhere in this file.
 */

export type Audience = "companies" | "leaders";

export const hero = {
  eyebrow: "Executive Search · Austin, TX",
  title: ["Hiring decisions", "compound."],
  lede: "Taylor Talent Partners runs executive search and embedded recruiting for companies where a senior hire changes the trajectory — and keeps a confidential line open to the leaders who fill those seats.",
  primary: { label: "Book an intro call", href: null as string | null },
  secondary: { label: "How a search runs", href: "/#process" },
  proof: [
    { value: "10 yrs", label: "In search" },
    { value: "75+", label: "Hires, one org, 18 months" },
    { value: "9/10", label: "Largest global PE firms served" },
  ],
};

export const audiences: {
  key: Audience;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  cta: { label: string; href: string };
}[] = [
  {
    key: "companies",
    eyebrow: "For companies",
    title: "You have a seat that has to be filled correctly.",
    body: "Retained search for C-suite and VP mandates, or a senior recruiter embedded in your team for a defined stretch. Either way the market map is real, the shortlist is calibrated, and the person who took your intake is the person who closes the offer.",
    bullets: [
      "Executive search, retained",
      "Embedded and fractional recruiting",
      "Comp benchmarking and org design",
    ],
    cta: { label: "For Companies", href: "/companies" },
  },
  {
    key: "leaders",
    eyebrow: "For senior leaders",
    title: "You are not looking. You are staying informed.",
    body: "A standing, confidential relationship — not a résumé in a database. We talk when there is something worth talking about, and nothing moves without your explicit say-so.",
    bullets: [
      "Confidential by default",
      "Curated mandates, not mass outreach",
      "Built around your next three moves",
    ],
    cta: { label: "For Leaders", href: "/leaders" },
  },
];

export const services = [
  {
    n: "01",
    title: "Executive Search",
    summary:
      "Retained search for C-suite and VP mandates where a miss is expensive to unwind.",
    includes: [
      "Full market map and comp benchmark",
      "Confidential and replacement searches",
      "Board-ready reporting each week",
    ],
  },
  {
    n: "02",
    title: "Embedded Recruiting",
    summary:
      "A senior recruiter working inside your team on a defined mandate — pipeline, process and closes without permanent headcount.",
    includes: [
      "Works in your ATS, your rituals",
      "Fixed scope and timeline",
      "Process documented for handoff",
    ],
  },
  {
    n: "03",
    title: "Fractional Recruiting",
    summary:
      "Ongoing part-time support for teams that hire steadily but not enough to justify a full-time seat.",
    includes: [
      "Monthly or quarterly retainer",
      "Scales with the hiring plan",
      "One consistent point of contact",
    ],
  },
  {
    n: "04",
    title: "Talent Strategy",
    summary:
      "Org design, levelling and hiring roadmaps for founders building a leadership bench for the first time.",
    includes: [
      "Org and levelling design",
      "Comp benchmarking by stage",
      "Twelve-month hiring roadmap",
    ],
  },
];

export const industries = [
  {
    title: "Technology & SaaS",
    body: "Product, engineering and go-to-market leadership for software companies from first VP through IPO-stage bench.",
  },
  {
    title: "Venture-Backed Startups",
    body: "Founding and early leadership hires, where the wrong pick costs a year you do not have.",
  },
  {
    title: "Private Equity Portfolios",
    body: "Executive mandates across portfolio companies, informed by search work with nine of the ten largest global PE firms.",
  },
  {
    title: "Professional & Legal Services",
    body: "Senior legal and G&A hires for firms building out a leadership layer under the partners.",
  },
];

export const why = [
  {
    title: "One point of contact",
    body: "Jarod runs the search from intake to signed offer. Nothing is handed to a junior team once the contract is signed.",
  },
  {
    title: "AI-enabled, human-judged",
    body: "Modern sourcing to widen the field. Senior judgment on every name that reaches your shortlist.",
  },
  {
    title: "Confidential by default",
    body: "Replacement searches and off-market approaches are handled quietly, for both sides of the table.",
  },
  {
    title: "In-house before agency",
    body: "Recruiting inside Apple, Google and Indeed first — so the process is designed the way hiring teams actually work.",
  },
];

export const jarod = {
  eyebrow: "Meet the founder",
  name: "Jarod Taylor",
  role: "Founder",
  location: "Austin, Texas",
  lead: "Ten years of search across technical, legal and C-suite mandates — in-house at Apple, Google and Indeed, then agency-side at GLG, DISCO, Checkr and Talentful.",
  body: [
    "Most recently a Senior Talent Partner embedded with founders and executive teams at startups, scale-ups and global enterprises — aligning hiring to the growth plan rather than working a req queue.",
    "The method is unglamorous and it works: calibrate honestly, map the whole market, interview to a consistent bar, and stay in the room through the close.",
  ],
  inHouse: ["Apple", "Google", "Indeed"],
  agency: ["GLG", "Checkr", "DISCO", "Talentful"],
  functions: [
    "Executive / C-suite",
    "GTM & sales",
    "Product",
    "Customer success",
    "G&A & finance",
    "Legal",
    "Engineering & technical",
  ],
};

export const process = [
  {
    n: "01",
    title: "Discovery & calibration",
    body: "Scope the mandate, the success profile and the comp reality before a single name is sourced. If the role as written cannot be hired, you hear it in week one.",
  },
  {
    n: "02",
    title: "Market mapping",
    body: "A full read of who exists, not only who is answering job posts. You see the map, including the people who said no and why.",
  },
  {
    n: "03",
    title: "Curated shortlist",
    body: "Three to five candidates, each written up against the calibrated profile, with the reservations included rather than smoothed over.",
  },
  {
    n: "04",
    title: "Structured interviews",
    body: "One evaluation rubric, the same questions in the same order, a written debrief after every round. Comparable evidence instead of impressions.",
  },
  {
    n: "05",
    title: "Offer & close",
    body: "Comp strategy, references, counter-offer pressure and the close. The search is not finished until someone has started.",
  },
];

export const stats = [
  {
    value: "2015",
    label: "Recruiting since",
    detail: "In-house at Apple, Google and Indeed before moving agency-side.",
  },
  {
    value: "75+",
    label: "Hires in one org",
    detail: "Delivered across an 18-month tenure at a $5B startup.",
  },
  {
    value: "9/10",
    label: "Largest global PE firms",
    detail: "Served while recruiting executives at GLG.",
  },
  {
    value: "121%",
    label: "Metric attainment",
    detail: "Nine consecutive months — sustained, not one good quarter.",
  },
];

/** Placeholder testimonials — clearly marked so nothing ships as a real quote. */
export const testimonials = [
  {
    quote:
      "Placeholder. Replace with a client quote about calibration — the moment the search scope changed because of an honest read on the market.",
    name: "Client name",
    role: "Title, Company",
  },
  {
    quote:
      "Placeholder. Replace with a quote from a placed executive about how the process felt from the candidate side.",
    name: "Placed executive",
    role: "Title, Company",
  },
  {
    quote:
      "Placeholder. Replace with a quote from a founder or board member about speed and signal-to-noise on the shortlist.",
    name: "Founder or board member",
    role: "Title, Company",
  },
];

export const leaderTags = [
  "C-Suite",
  "VP",
  "Director",
  "GTM",
  "Product",
  "Engineering",
  "Customer Success",
  "G&A",
  "Legal",
];

export const leaderSteps = [
  {
    n: "01",
    title: "A confidential intro call",
    body: "No résumé blast, no pipeline entry. A conversation about where you are, what you would move for, and what you would not.",
  },
  {
    n: "02",
    title: "Stay informed",
    body: "Occasional, relevant notes on the market at your level. Not a drip campaign, and you set the cadence.",
  },
  {
    n: "03",
    title: "When the timing is right",
    body: "One introduction, to one mandate that actually fits. Your name reaches a client only after you say yes.",
  },
];

export const leaderValue = [
  {
    title: "Confidential, always",
    body: "Every conversation stays between us until you decide otherwise. Nothing is forwarded on your behalf.",
  },
  {
    title: "Curated, not broadcast",
    body: "You hear about mandates that match your level and trajectory, and nothing else.",
  },
  {
    title: "The long game",
    body: "The aim is your next three moves. Sometimes the honest advice is to stay where you are.",
  },
  {
    title: "A direct line",
    body: "One relationship with one person, for as long as it is useful to you.",
  },
];
