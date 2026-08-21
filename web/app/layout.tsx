import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { site, practiceAreas } from "@/lib/site";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionRoot } from "@/components/motion/config";
import { Backdrop } from "@/components/backdrop";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/site/footer";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  axes: ["opsz"],
});

/**
 * Headlines are set in a serif. That single choice is what separates an
 * editorial voice from a generic SaaS one — the sans/mono pair carries the
 * technical register underneath it.
 */
const display = Newsreader({
  subsets: ["latin"],
  display: "swap",
  // Loaded as a variable font (no explicit weight), which is what lets the
  // optical-size axis be requested — next/font rejects axes alongside weights.
  style: ["normal", "italic"],
  variable: "--font-display",
  axes: ["opsz"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  keywords: [
    "startup recruiting",
    "scale-up recruiting",
    "go-to-market recruiting",
    "executive search",
    "technical recruiting",
    "engineering recruiting",
    "legal search",
    "retained search",
    "contingency search",
    "Austin recruiting firm",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: site.favicon, sizes: "32x32", type: "image/png" },
      { url: site.appIcon, sizes: "512x512", type: "image/png" },
    ],
    shortcut: [site.favicon],
    apple: [{ url: site.appleTouchIcon, sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08080b" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
  ],
};

/**
 * Structured data, as a single @graph so the Organization, the WebSite and the
 * service catalogue resolve to one another by @id rather than floating as three
 * unrelated blobs. Everything below is stated elsewhere on the site in plain
 * text — schema restates it for machines, it does not add claims.
 */
const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

const services = practiceAreas.map((domain) => ({
  "@type": "Service",
  "@id": `${site.url}${domain.href}`,
  name: domain.name,
  description: domain.summary,
  serviceType: domain.name,
  category: "Recruiting",
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "United States" },
  audience: {
    "@type": "BusinessAudience",
    name: "High-growth VC and PE-backed startups and scale-ups",
  },
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService", "EmploymentAgency"],
      "@id": ORG_ID,
      name: site.name,
      alternateName: site.alternateName,
      legalName: site.legalEntity,
      url: site.url,
      description: site.description,
      slogan: site.summary,
      logo: {
        "@type": "ImageObject",
        url: new URL(site.logo, site.url).toString(),
      },
      image: new URL(site.logo, site.url).toString(),
      email: site.email,
      areaServed: { "@type": "Country", name: "United States" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Austin",
        addressRegion: "TX",
        addressCountry: "US",
      },
      founder: {
        "@type": "Person",
        name: site.founder,
        jobTitle: "Founder",
        sameAs: [site.linkedin],
      },
      sameAs: [site.linkedin],
      knowsAbout: [
        "Startup recruiting",
        "Scale-up recruiting",
        "Go-to-market recruiting",
        "Executive search",
        "Technical and engineering recruiting",
        "Legal search",
        "Retained search",
        "Contingency search",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Sales",
        email: site.email,
        url: site.bookCall,
        areaServed: "US",
        availableLanguage: "English",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Recruiting services",
        itemListElement: practiceAreas.map((domain) => ({
          "@type": "Offer",
          itemOffered: { "@id": `${site.url}${domain.href}` },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en-US",
      publisher: { "@id": ORG_ID },
    },
    ...services,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      {/*
        suppressHydrationWarning does not inherit — it covers only the element it
        sits on. <html> carries it for the theme class the provider writes before
        paint; <body> needs its own because extensions (Grammarly, password
        managers, translators) stamp attributes like data-gr-ext-installed onto
        body between the HTML arriving and React hydrating. Those attributes are
        absent from our server output, so React reports a mismatch for markup it
        never rendered. This scopes the exemption to body's own attributes and
        leaves genuine mismatches in the tree below still reported.
      */}
      <body
        suppressHydrationWarning
        className={`${sans.variable} ${display.variable} ${mono.variable}`}
      >
        <ThemeProvider>
          <MotionRoot>
            <Backdrop />
            <Nav />
            <main id="main" className="relative">
              {children}
            </main>
            <Footer />
          </MotionRoot>
        </ThemeProvider>
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
