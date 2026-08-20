export type CompanyCategory = "current-client" | "in-house";

export type Company = {
  name: string;
  logo: string;
  category: CompanyCategory;
  /** The company's own site. Used for entity disambiguation, never fabricated. */
  url?: string;
  /**
   * Optical weight multiplier against the base logo height.
   *
   * Fitting every mark to the same box does not make them look the same size: a
   * 7:1 wordmark reads lighter than a square glyph at identical height. These
   * are eyeball corrections, tuned to make each logo carry equal presence in the
   * row. 1 = base. Nudge freely; nothing else depends on them.
   */
  optical?: number;
  /** Optical cap for unusually wide or compact marks. */
  opticalWidth?: number;
  /** Set the name in type when no vector mark is available to mask. */
  wordmark?: boolean;
};

/**
 * Client relationships and prior experience.
 *
 * Presentation config only — the relationship facts behind each hover card live
 * in data/clients.ts, keyed by `name`.
 *
 * Logo assets are used as CSS masks, so they inherit theme colour and every mark
 * carries identical weight. That requires the artwork to fill its own viewBox;
 * checkr, rippling, indeed, pallet and swap shipped with artwork sitting in a
 * fraction of an oversized canvas and have been normalised in place. Companies
 * without a licensed vector mark are set in type via `wordmark`.
 *
 * Sierra and Swap were set in type until their marks were sourced from their own
 * sites. Both are masks like the rest, so both are optically tuned rather than
 * dropped in at nominal size: Sierra carries a solid rosette next to its
 * wordmark and reads heavy, and Swap is a compact 1.88:1 bold serif against a
 * row that is otherwise 4:1 wordmarks.
 */
export const companies: Company[] = [
  { name: "Palantir", logo: "/logos/companies/palantir.svg", category: "current-client", url: "https://www.palantir.com", opticalWidth: 104 },
  { name: "Rippling", logo: "/logos/companies/rippling.svg", category: "current-client", url: "https://www.rippling.com", optical: 0.9, opticalWidth: 124 },
  { name: "Pallet", logo: "/logos/companies/pallet.svg", category: "current-client", url: "https://www.pallet.com", opticalWidth: 94 },
  { name: "Decagon", logo: "/logos/companies/decagon.svg", category: "current-client", url: "https://decagon.ai", opticalWidth: 112 },
  { name: "Scale", logo: "/logos/companies/scale.svg", category: "current-client", url: "https://scale.com", optical: 0.95, opticalWidth: 88 },
  { name: "Sierra", logo: "/logos/companies/sierra.svg", category: "current-client", url: "https://sierra.ai", optical: 0.92, opticalWidth: 84 },
  { name: "Swap Commerce", logo: "/logos/companies/swap.svg", category: "current-client", url: "https://www.swap-commerce.com", optical: 0.98, opticalWidth: 60 },
  { name: "Apple", logo: "/logos/companies/apple.svg", category: "in-house", optical: 1.3, opticalWidth: 32 },
  { name: "Google", logo: "/logos/companies/google.svg", category: "in-house", optical: 1.05, opticalWidth: 88 },
  { name: "Indeed", logo: "/logos/companies/indeed.svg", category: "in-house", opticalWidth: 96 },
  { name: "GLG", logo: "/logos/companies/glg.png", category: "in-house", wordmark: true },
  { name: "Checkr", logo: "/logos/companies/checkr.svg", category: "in-house", optical: 1.03, opticalWidth: 94 },
  { name: "DISCO", logo: "/logos/companies/disco.svg", category: "in-house", optical: 0.92, opticalWidth: 88 },
  { name: "Talentful", logo: "/logos/companies/talentful.svg", category: "in-house", optical: 0.95, opticalWidth: 92 },
];

export const companyRows = [
  { label: "Current Clients", category: "current-client" as const },
  { label: "In-House Experience", category: "in-house" as const },
];
