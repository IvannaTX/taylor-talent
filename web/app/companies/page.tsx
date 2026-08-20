import type { Metadata } from "next";
import { site } from "@/lib/site";
import { companyBeats } from "@/lib/copy";
import { PageHero } from "@/components/site/page-hero";
import { BeatRun } from "@/components/beats/run";
import { companyArtifacts } from "@/components/artifacts/company";
import { SearchConsole } from "@/components/artifacts/console";
import { Finale } from "@/components/site/finale";
import { CustomerStories } from "@/components/home/CustomerStories";
import { EngagementModels } from "@/components/site/engagement";
import { Rule } from "@/components/ui/kit";
import { breadcrumbSchema, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "For Companies — How a Search Runs",
  description:
    "Recruiting for startups and scale-ups across go-to-market, executive and technical hiring. Calibrated in week one, mapped in full, shortlisted with the reservations left in — retained or contingency.",
  alternates: { canonical: "/companies" },
  openGraph: {
    title: `For Companies | ${site.name}`,
    description:
      "How a search runs: calibration, market map, shortlist, evaluation and close. Retained and contingency engagements.",
    url: "/companies",
  },
};

export default function CompaniesPage() {
  return (
    <>
      <PageHero
        eyebrow="For companies"
        title="The seat is open. The clock is already running."
        lede="Recruiting for startups and scale-ups across go-to-market, executive and technical hiring. You get the whole market, a calibrated shortlist, and the person who took your intake negotiating the offer."
        primary={{ label: "Book a Discovery Call", href: site.bookCall }}
        secondary={{ label: "Practice areas", href: "/practice-areas" }}
      />

      <div className="shell min-w-0">
        <SearchConsole />
      </div>

      {/* Who the search runs for, immediately before how it runs. The CTA in
          here points at #search, which is the section directly below. */}
      <div className="shell pt-section">
        <CustomerStories className="mt-0" />
      </div>

      <div className="pt-section">
        <BeatRun
          id="search"
          label="How a search runs"
          beats={companyBeats}
          artifacts={companyArtifacts}
          align="right"
        />
      </div>

      <div className="shell">
        <Rule />
      </div>

      <EngagementModels />

      <Finale
        eyebrow="Discuss the mandate"
        title="Bring the role before the search starts."
        lede="Pressure-test the scope, compensation and market before committing to a process."
        bullets={["A realistic market read", "A calibrated search scope", "A clear path from intake to offer"]}
      />

      <script {...jsonLdProps(breadcrumbSchema("For Companies", "/companies"))} />
    </>
  );
}
