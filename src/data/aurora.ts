export interface Stat { value: string; label: string; }
export interface Service { n: string; title: string; desc: string; includes: string[]; }
export interface WhyItem { title: string; desc: string; }
export interface Industry { title: string; desc: string; }
export interface ProcessStep { n: string; title: string; desc: string; }
export interface LeaderValueProp { title: string; desc: string; }

export const auroraLinks = {
  bookCall: "mailto:jarod@taylortalentpartners.com", // TODO: replace with real scheduler URL
  email: "mailto:jarod@taylortalentpartners.com",
  linkedin: "https://www.linkedin.com/company/taylortalent/"
};

export const services: Service[] = [
  { n: "01", title: "Executive Search", desc: "Retained search for C-suite and VP mandates where the hire carries real risk. Full market map, calibrated shortlist, board-ready reporting.", includes: ["Market map & comp benchmark", "Confidential & replacement searches", "Board-facing reporting"] },
  { n: "02", title: "Embedded Recruiting", desc: "A senior recruiter working inside your team on a defined mandate — pipeline, process, and closes without adding permanent headcount.", includes: ["Works inside your ATS", "Defined scope & timeline", "Handoff-ready process docs"] },
  { n: "03", title: "Fractional Recruiting", desc: "Ongoing, part-time recruiting support for teams that hire steadily but not enough to justify a full-time seat.", includes: ["Monthly or quarterly retainer", "Scales up or down with need", "One consistent point of contact"] },
  { n: "04", title: "Talent Strategy", desc: "Org design, comp benchmarking, and hiring roadmaps for founders and people leaders building out a leadership bench.", includes: ["Org & leveling design", "Comp benchmarking", "12-month hiring roadmap"] }
];

export const whyItems: WhyItem[] = [
  { title: "One point of contact", desc: "Every search runs through Jarod directly, start to close — no junior handoff." },
  { title: "AI-enabled, human-judged", desc: "Modern sourcing tools, senior judgment on every shortlist." },
  { title: "Confidential by default", desc: "Replacement and off-market searches handled discreetly, always." },
  { title: "A decade of senior placements", desc: "In-house at Apple, Google, and Indeed; agency-side for GLG, Checkr, DISCO, and Talentful." }
];

export const stats: Stat[] = [
  { value: "2015", label: "Recruiting since. In-house at Apple, Google and Indeed before going agency-side." },
  { value: "75+", label: "Hires delivered across one organization in an 18-month tenure at a $5B startup." },
  { value: "9/10", label: "Of the largest global private-equity firms served while recruiting executives at GLG." },
  { value: "121%", label: "Metric attainment, nine consecutive months — sustained, not a single quarter." }
];

export const industries: Industry[] = [
  { title: "Technology & SaaS", desc: "Product, engineering, and GTM leadership for software companies at every stage." },
  { title: "Venture-Backed Startups", desc: "Founding and early leadership hires where the wrong pick is expensive." },
  { title: "Private Equity-Backed Companies", desc: "Executive searches for portfolio companies, informed by work across the largest global PE firms." },
  { title: "Professional & Legal Services", desc: "Senior legal and G&A hires for firms scaling their leadership bench." }
];

export const processSteps: ProcessStep[] = [
  { n: "01", title: "Discovery & Calibration", desc: "Scope the mandate, success profile, and comp reality before any sourcing starts." },
  { n: "02", title: "Market Mapping", desc: "A full view of who's out there, not just who's actively looking." },
  { n: "03", title: "Curated Shortlist", desc: "Three to five candidates, each vetted against the calibrated profile." },
  { n: "04", title: "Structured Interviews", desc: "Consistent evaluation criteria, structured debriefs after every round." },
  { n: "05", title: "Offer & Close", desc: "Comp strategy, reference checks, and close support through signed offer." }
];

export const leaderValueProps: LeaderValueProp[] = [
  { title: "Confidential, always", desc: "Every conversation stays between us until you decide otherwise." },
  { title: "Curated, not spammed", desc: "Only mandates that actually fit your level and trajectory." },
  { title: "The long game", desc: "The goal is your next three moves, not just the next one." },
  { title: "A direct line to Jarod", desc: "No account handoffs, no junior recruiters — one relationship throughout." }
];

export const leaderTags: string[] = ["VP", "Director", "C-Suite", "GTM", "Product", "Customer Success", "G&A", "Legal", "Engineering & Technical"];

export const leaderSteps: ProcessStep[] = [
  { n: "01", title: "A confidential intro call", desc: "No résumé blast — just a conversation about where you are and where you want to go." },
  { n: "02", title: "Stay in the loop", desc: "Occasional, relevant check-ins, not a drip campaign." },
  { n: "03", title: "When the timing's right", desc: "A curated introduction when a mandate actually fits your next move." }
];
