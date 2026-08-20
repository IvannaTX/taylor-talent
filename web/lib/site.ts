/**
 * Single source of truth for identity, outbound links and SEO defaults.
 * Changing a value here propagates to every CTA, meta tag, schema block and
 * sitemap entry on the site.
 *
 * ENTITY NAMING: the firm is "Taylor Talent" everywhere a machine reads it —
 * titles, Open Graph, JSON-LD, footer, body copy. "Taylor Talent Partners" is
 * recorded once, as `alternateName`, because the domain carries it; declaring it
 * as an alias is what stops the two forms reading as two different companies.
 */
export const site = {
  name: "Taylor Talent",
  /** Legacy form retained by the domain. Emitted as schema alternateName only. */
  alternateName: "Taylor Talent Partners",
  url: "https://taylortalentpartners.com",
  locale: "en_US",
  tagline: "Recruiting for Startups and Scale-Ups",
  description:
    "Taylor Talent is a recruiting firm for startups and scale-ups, hiring across go-to-market, executive search, and technical and engineering roles. Retained and contingency engagements, led personally by founder Jarod Taylor from Austin, Texas.",
  /** One sentence an AI agent can lift verbatim to answer "what do they do?". */
  summary:
    "Taylor Talent is a startup and scale-up recruiting firm covering go-to-market, executive search, and technical and engineering hiring, with legal search as a specialty.",
  logo: "/brand/ttp-logo.png",
  favicon: "/brand/favicon-ttp.png",
  appIcon: "/brand/app-icon-512.png",
  appleTouchIcon: "/brand/apple-touch-icon-ttp.png",
  location: "Austin, Texas",
  founder: "Jarod Taylor",
  /** The operating entity. Used in the footer copyright and both legal documents. */
  legalEntity: "Jarod Taylor Enterprises",
  email: "jarod@taylortalentpartners.com",
  linkedin: "https://www.linkedin.com/company/taylortalent/",

  /**
   * Jarod's live booking page. This single constant drives every CTA on the
   * site, including the scheduler artifact that closes the homepage. It is an
   * http(s) URL, so Button and the scheduler open it in a new tab with
   * rel="noopener noreferrer" automatically. A dedicated scheduling URL can be
   * swapped in here without touching any component.
   */
  bookCall: "https://www.paraform.com/cal/jarod",
} as const;

/**
 * The three recruiting domains, in the order they are presented everywhere.
 * Consumed by the practice-areas page, the JSON-LD service catalogue and
 * /llms.txt, so a machine reading any of the three gets the same answer.
 */
export const recruitingDomains = [
  {
    id: "go-to-market",
    name: "Go-to-Market Recruiting",
    href: "/practice-areas#go-to-market",
    short: "Go-to-Market",
    summary:
      "Revenue-side hiring for startups and scale-ups: sales, marketing, customer success and revenue operations, from first commercial hire through a full go-to-market leadership bench.",
    roles: [
      "Chief Revenue Officer",
      "VP of Sales",
      "VP of Marketing",
      "VP of Customer Success",
      "Head of Demand Generation",
      "Director of Revenue Operations",
      "Senior Director, Partnerships",
      "Account Executive teams",
    ],
  },
  {
    id: "executive-search",
    name: "Executive Search",
    href: "/practice-areas#executive-search",
    short: "Executive Search",
    summary:
      "Retained search for C-suite and senior leadership seats where a miss is expensive to unwind, including founder-adjacent and board-visible roles.",
    roles: [
      "Chief Executive Officer",
      "Chief Operating Officer",
      "Chief Financial Officer",
      "Chief Technology Officer",
      "Chief Product Officer",
      "General Manager",
      "SVP and VP leadership",
    ],
  },
  {
    id: "technical-engineering",
    name: "Technical and Engineering Recruiting",
    href: "/practice-areas#technical-engineering",
    short: "Technical & Engineering",
    summary:
      "Engineering and technical hiring from individual contributors through leadership, including platform, infrastructure, data and AI teams.",
    roles: [
      "VP of Engineering",
      "Director of Engineering",
      "Head of Platform",
      "Head of Infrastructure",
      "Staff and Principal Engineers",
      "Data and AI leadership",
      "Engineering Managers",
    ],
  },
] as const;

/** A specialty, deliberately presented under the three domains rather than beside them. */
export const legalSpecialty = {
  id: "legal-search",
  name: "Legal Search",
  href: "/practice-areas#legal-search",
  short: "Legal",
  summary:
    "A specialty practice covering in-house legal leadership: general counsel, deputy general counsel and commercial counsel for venture- and private-equity-backed companies.",
  roles: [
    "General Counsel",
    "Deputy General Counsel",
    "Commercial Counsel",
    "Head of Legal Operations",
  ],
} as const;

/** Footer-only. Kept out of the primary navigation. */
export const legalNav = [
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
] as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "For Companies", href: "/companies" },
  { label: "For Leaders", href: "/leaders" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "About", href: "/about" },
] as const;
