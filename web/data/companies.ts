export type CompanyCategory = "current-client" | "in-house" | "agency-side";

export type Company = {
  name: string;
  logo: string;
  category: CompanyCategory;
  /**
   * Optical weight multiplier against the base logo height.
   *
   * Fitting every mark to the same box does not make them look the same size: a
   * 7:1 wordmark reads lighter than a square glyph at identical height. These
   * are eyeball corrections, tuned to make each logo carry equal presence in the
   * row. 1 = base. Nudge freely; nothing else depends on them.
   */
  optical?: number;
  /** No usable vector asset — set the name as type instead. */
  wordmark?: boolean;
};

/**
 * Company relationships and experience.
 *
 * Presentation config only — the quotes and relationship figures behind each
 * hover card live in data/testimonials.ts, keyed by `name`, so they can be
 * swapped for approved copy without touching this file.
 *
 * Logo assets are used as CSS masks, so they inherit theme colour and every mark
 * carries identical weight. That requires the artwork to fill its own viewBox;
 * checkr, rippling, indeed and pallet shipped with artwork sitting in a fraction
 * of an oversized canvas and have been normalised in place.
 */
export const companies: Company[] = [
  { name: "Palantir", logo: "/logos/companies/palantir.svg", category: "current-client" },
  { name: "Rippling", logo: "/logos/companies/rippling.svg", category: "current-client", optical: 1.05 },
  { name: "Pallet", logo: "/logos/companies/pallet.svg", category: "current-client" },
  { name: "Decagon", logo: "/logos/companies/decagon.svg", category: "current-client" },
  { name: "Scale", logo: "/logos/companies/scale.svg", category: "current-client", optical: 0.95 },
  { name: "Apple", logo: "/logos/companies/apple.svg", category: "in-house", optical: 1.3 },
  { name: "Google", logo: "/logos/companies/google.svg", category: "in-house", optical: 1.05 },
  { name: "Indeed", logo: "/logos/companies/indeed.svg", category: "in-house" },
  { name: "GLG", logo: "/logos/companies/glg.png", category: "agency-side", wordmark: true },
  { name: "Checkr", logo: "/logos/companies/checkr.svg", category: "agency-side" },
  { name: "DISCO", logo: "/logos/companies/disco.svg", category: "agency-side", optical: 0.92 },
  { name: "Talentful", logo: "/logos/companies/talentful.svg", category: "agency-side", optical: 0.95 },
];

export const companyRows = [
  { label: "Current Clients", category: "current-client" as const },
  { label: "In-House", category: "in-house" as const },
  { label: "Agency-Side", category: "agency-side" as const },
];
