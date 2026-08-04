export interface StatItem {
  value: string;
  label: string;
}

export interface EngagementItem {
  index: string;
  tag: string;
  title: string;
  description: string;
  chips: string[];
}

export interface FounderContent {
  name: string;
  role: string;
  location: string;
  lead: string;
  bio: string;
  inHouse: string[];
  agencySide: string[];
  functions: string[];
}

export interface SiteLinks {
  bookCall: string;
  email: string;
  linkedin: string;
}

export const links: SiteLinks = {
  bookCall: "#book-a-call", // TODO: replace with real scheduler URL
  email: "mailto:jarod@taylortalentpartners.com", // TODO: confirm address
  linkedin: "https://www.linkedin.com/company/taylortalent/"
};

export const stats: StatItem[] = [
  { value: "2015", label: "Recruiting since. In-house at Apple, Google and Indeed before going agency-side." },
  { value: "75+", label: "Hires delivered across one organization in an 18-month tenure at a $5B startup." },
  { value: "9/10", label: "Of the largest global private-equity firms served while recruiting executives at GLG." },
  { value: "121%", label: "Metric attainment, nine consecutive months — sustained, not a single quarter." }
];

export const engagements: EngagementItem[] = [
  {
    index: "01",
    tag: "Exclusive",
    title: "Retained executive search",
    description:
      "For C-suite and VP mandates where a miss is expensive. Full market map, calibrated shortlist, structured debriefs, offer and close support.",
    chips: ["Market map", "Confidential", "Board-facing"]
  },
  {
    index: "02",
    tag: "Pay on placement",
    title: "Contingency & direct hire",
    description:
      "For well-defined senior roles with a live market — senior ICs, directors, and functional leads you need in seat this quarter.",
    chips: ["No retainer", "Shortlist in days", "Replacement guarantee"]
  },
  {
    index: "03",
    tag: "Contract",
    title: "Interim & fractional executives",
    description:
      "Vetted operators on contract for coverage gaps, transitions, and time-boxed mandates — a fractional CRO, an interim head of people, a contract recruiting team.",
    chips: ["Start in 2 weeks", "Contract to hire", "Embedded RPO"]
  }
];

export const founder: FounderContent = {
  name: "Jarod Taylor",
  role: "Founder",
  location: "Austin, Texas",
  lead: "Ten years of search across technical, legal, and C-suite — inside Apple, Google, and Indeed, then on the agency side at GLG, DISCO, Checkr, and Talentful.",
  bio: "Most recently a Senior Talent Partner embedded with founders and executive teams at startups, scale-ups, and global enterprises — aligning hiring strategy to growth plans rather than filling reqs. AI-enabled sourcing, structured interview design, and one point of contact from intake to signed offer. No handoff to a junior team.",
  inHouse: ["Apple", "Google", "Indeed"],
  agencySide: ["GLG", "Checkr", "DISCO", "Talentful"],
  functions: ["Executive / C-suite", "GTM & sales", "Product", "Customer success", "G&A & finance", "Legal", "Engineering & technical"]
};
