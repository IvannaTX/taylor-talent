import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
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
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  keywords: [
    "executive search",
    "embedded recruiting",
    "fractional recruiting",
    "retained search",
    "Austin executive recruiter",
    "VP and C-suite hiring",
    "talent strategy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
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

/** Organization + Person structured data for rich results. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  areaServed: "United States",
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
    sameAs: site.linkedin,
  },
  sameAs: [site.linkedin],
  serviceType: [
    "Executive Search",
    "Embedded Recruiting",
    "Fractional Recruiting",
    "Talent Strategy",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${sans.variable} ${display.variable} ${mono.variable}`}>
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
