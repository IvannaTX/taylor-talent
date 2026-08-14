/**
 * Client and colleague testimonials, keyed by company name.
 *
 * ⚠️  PLACEHOLDER COPY — NOT CLEARED FOR PUBLICATION.
 *
 * Every entry below carries `approved: false`. With one exception the partner
 * names, titles, quotes, tenures and placement counts are invented so the hover
 * experience can be reviewed end to end. They are attributed to real companies,
 * so publishing them as written would be presenting fabricated endorsements as
 * genuine. Replace each entry with approved copy — or delete it — before this
 * site goes live, and flip `approved` as each one is cleared.
 *
 * The one real relationship is Pallet: Grace Turner is an actual contact of
 * Jarod's and is marked `featured`. Her quote is still written by us and needs
 * her sign-off in writing before it appears anywhere public.
 *
 * Tenure years are aligned to the bio in lib/copy.ts — recruiting since 2015,
 * in-house at Indeed, Google and Apple, then agency-side at GLG, DISCO, Checkr
 * and Talentful. Keep them consistent if either side changes.
 */

export type CompanyRelationship = {
  /** Small caption over the tenure figure, e.g. "Partner since". */
  tenureLabel: string;
  tenureValue: string;
  /** Short enough to sit in half a 256px card: "Placements", "Searches". */
  metricLabel: string;
  metricValue: string;
};

export type Testimonial = {
  company: string;
  quote: string;
  partnerName: string;
  partnerTitle: string;
  relationship: CompanyRelationship;
  caseStudyUrl?: string;
  /** The one genuine relationship in the set. */
  featured?: boolean;
  /** Cleared for publication by the named person. */
  approved: boolean;
};

const client = (tenureValue: string, metricValue: string): CompanyRelationship => ({
  tenureLabel: "Partner since",
  tenureValue,
  metricLabel: "Placements",
  metricValue,
});

const inHouse = (tenureValue: string, metricValue: string): CompanyRelationship => ({
  tenureLabel: "In-house",
  tenureValue,
  metricLabel: "Searches",
  metricValue,
});

const agency = (tenureValue: string, metricValue: string): CompanyRelationship => ({
  tenureLabel: "Agency-side",
  tenureValue,
  metricLabel: "Searches",
  metricValue,
});

export const testimonials: Record<string, Testimonial> = {
  /* ---- Current clients ------------------------------------------- */

  Pallet: {
    company: "Pallet",
    quote:
      "Jarod ran our VP Engineering search end to end and I never once had to chase him for an update. The shortlist came back at four people and we would have hired three of them.",
    partnerName: "Grace Turner",
    partnerTitle: "Head of Talent",
    relationship: client("2025", "6"),
    featured: true,
    approved: false,
  },

  Palantir: {
    company: "Palantir",
    quote:
      "We needed a director-level search held quietly, and it stayed quiet. He works with more discretion than firms several times his size.",
    partnerName: "Dana Whitfield",
    partnerTitle: "VP Talent",
    relationship: client("2025", "4"),
    approved: false,
  },

  Rippling: {
    company: "Rippling",
    quote:
      "The calibration call reset how we were thinking about the role. He told us the compensation band was wrong before we spent a quarter finding that out ourselves.",
    partnerName: "Marcus Ellery",
    partnerTitle: "Head of Recruiting",
    relationship: client("2025", "3"),
    approved: false,
  },

  Decagon: {
    company: "Decagon",
    quote:
      "A written update every week, and every candidate put in context. We always knew exactly where the search stood and why.",
    partnerName: "Priya Raghunathan",
    partnerTitle: "Chief of Staff",
    relationship: client("2026", "2"),
    approved: false,
  },

  Scale: {
    company: "Scale",
    quote:
      "Four names on the shortlist, and all four were people we would have been glad to hire. That ratio is the entire job.",
    partnerName: "Owen Brady",
    partnerTitle: "Director of Technical Recruiting",
    relationship: client("2026", "2"),
    approved: false,
  },

  /* ---- In-house ---------------------------------------------------- */

  Apple: {
    company: "Apple",
    quote:
      "Jarod carried our most sensitive leadership requisitions. He is one of very few recruiters who genuinely sharpens the hiring manager's thinking.",
    partnerName: "Renee Alvarez",
    partnerTitle: "Senior Recruiting Manager",
    relationship: inHouse("2019–2021", "24"),
    approved: false,
  },

  Google: {
    company: "Google",
    quote:
      "He ran senior technical searches at a volume most people cannot sustain without quality slipping. His never did.",
    partnerName: "Thomas Reyes",
    partnerTitle: "Staffing Lead",
    relationship: inHouse("2017–2019", "31"),
    approved: false,
  },

  Indeed: {
    company: "Indeed",
    quote:
      "Jarod set the standard for how our team talked to candidates. A good part of that playbook is still in use.",
    partnerName: "Sarah Nolan",
    partnerTitle: "Talent Acquisition Director",
    relationship: inHouse("2015–2017", "38"),
    approved: false,
  },

  /* ---- Agency-side -------------------------------------------------- */

  GLG: {
    company: "GLG",
    quote:
      "He was who we put in front of our most demanding clients, because he told them the truth early and they respected him for it.",
    partnerName: "Adrian Cole",
    partnerTitle: "Managing Director",
    relationship: agency("2021–2022", "18"),
    approved: false,
  },

  Checkr: {
    company: "Checkr",
    quote:
      "Fast without being careless. He moved at the pace of the business and still put real evidence behind every recommendation.",
    partnerName: "Julian Weeks",
    partnerTitle: "Director of Talent",
    relationship: agency("2023–2024", "21"),
    approved: false,
  },

  DISCO: {
    company: "DISCO",
    quote:
      "Legal leadership is a narrow market and he knew it cold. Two searches we had written off closed inside a quarter.",
    partnerName: "Naomi Frisch",
    partnerTitle: "VP People",
    relationship: agency("2022–2023", "15"),
    approved: false,
  },

  Talentful: {
    company: "Talentful",
    quote:
      "Clients asked for him by name. That is the simplest measure of white-glove service I know.",
    partnerName: "Elena Marsh",
    partnerTitle: "Practice Lead",
    relationship: agency("2024–2025", "26"),
    approved: false,
  },
};

/** True while any entry is still unapproved placeholder copy. */
export const testimonialsArePlaceholder = Object.values(testimonials).some(
  (entry) => !entry.approved,
);
