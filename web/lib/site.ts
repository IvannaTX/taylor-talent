/**
 * Single source of truth for outbound links and SEO defaults. Changing a value
 * here propagates to every CTA, meta tag and sitemap entry on the site.
 */
export const site = {
  name: "Taylor Talent Partners",
  shortName: "Taylor Talent",
  url: "https://taylortalentpartners.com",
  locale: "en_US",
  tagline: "Retained Executive Search",
  description:
    "Taylor Talent Partners delivers retained executive search for high-impact leadership roles, with direct senior attention from market mapping through offer acceptance.",
  logo: "/brand/ttp-logo.png",
  favicon: "/brand/favicon-ttp.png",
  appIcon: "/brand/app-icon-512.png",
  appleTouchIcon: "/brand/apple-touch-icon-ttp.png",
  location: "Austin, Texas",
  founder: "Jarod Taylor",
  email: "jarod@taylortalentpartners.com",
  linkedin: "https://www.linkedin.com/company/taylortalent/",

  /**
   * Jarod's live Paraform booking page. This single constant drives every CTA on
   * the site, including the scheduler artifact that closes the homepage. It is an
   * http(s) URL, so Button and the scheduler open it in a new tab with
   * rel="noopener noreferrer" automatically.
   */
  bookCall: "https://www.paraform.com/cal/jarod",

  /** Shown wherever we reference where scheduling happens. */
  bookingHost: "Paraform",
} as const;

export const nav = [
  { label: "For Companies", href: "/companies" },
  { label: "For Leaders", href: "/leaders" },
  { label: "Practice areas", href: "/companies#practice" },
  { label: "About", href: "/about" },
] as const;
