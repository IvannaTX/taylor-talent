import type { Metadata } from "next";
import { site, practiceAreas } from "@/lib/site";
import { PageHero } from "@/components/site/page-hero";
import { RecruitingDomains } from "@/components/site/domains";
import { EngagementModels } from "@/components/site/engagement";
import { Practice } from "@/components/site/practice";
import { Finale } from "@/components/site/finale";
import { Rule } from "@/components/ui/kit";
import { breadcrumbSchema, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Practice Areas: Go-to-Market, Technical, Executive, Legal",
  description:
    "Taylor Talent recruits across four practice areas for high-growth VC and PE-backed startups and scale-ups: go-to-market, technical, executive and legal.",
  alternates: { canonical: "/practice-areas" },
  openGraph: {
    title: `Practice Areas | ${site.name}`,
    description:
      "Go-to-market, technical, executive and legal recruiting for high-growth VC and PE-backed startups and scale-ups.",
    url: "/practice-areas",
  },
};

/** Mirrors the visible domain sections so the list is machine-readable too. */
const serviceList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Taylor Talent recruiting practice areas",
  itemListElement: practiceAreas.map((area, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: area.name,
    url: `${site.url}${area.href}`,
  })),
};

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Practice areas"
        title="Where Taylor Talent recruits."
        lede="Four practice areas for high-growth VC and PE-backed startups and scale-ups: go-to-market, technical, executive and legal. Roles run from individual contributor through the C-suite."
        primary={{ label: "Book a Discovery Call", href: site.bookCall }}
        secondary={{ label: "How a search runs", href: "/companies#search" }}
      />

      <div className="shell">
        <RecruitingDomains />
      </div>

      <div className="shell mt-16">
        <Rule />
      </div>

      <EngagementModels />

      <div className="shell">
        <Rule />
      </div>

      <Practice />

      <Finale
        eyebrow="Discuss your hiring"
        title="Start with the roles you are trying to fill."
        lede="Bring the open seats and the constraints. You will leave with a read on the market, a realistic timeline, and the engagement model that fits."
        bullets={[
          "A market read on the roles you are hiring for",
          "A realistic compensation band and timeline",
          "Retained or contingency, whichever fits the search",
        ]}
      />

      <script
        {...jsonLdProps(breadcrumbSchema("Practice Areas", "/practice-areas"))}
      />
      <script {...jsonLdProps(serviceList)} />
    </>
  );
}
