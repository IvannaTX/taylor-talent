import type { Metadata } from "next";
import { site } from "@/lib/site";
import { companyBeats } from "@/lib/copy";
import { PageHero } from "@/components/site/page-hero";
import { BeatRun } from "@/components/beats/run";
import { companyArtifacts } from "@/components/artifacts/company";
import { SearchConsole } from "@/components/artifacts/console";
import { Finale } from "@/components/site/finale";
import { Rule } from "@/components/ui/kit";

export const metadata: Metadata = {
  title: "For Companies",
  description:
    "Retained executive search for companies where one seat changes the trajectory. Full market maps, a shortlist with the reservations left in, and one point of contact from intake to start date.",
  alternates: { canonical: "/companies" },
  openGraph: {
    title: `For Companies — ${site.name}`,
    description:
      "Retained executive search. Calibrated in week one, mapped in full, shortlisted with the reservations left in.",
    url: "/companies",
  },
};

export default function CompaniesPage() {
  return (
    <>
      <PageHero
        eyebrow="For companies"
        title="The seat is open. The clock is already running."
        lede="Retained search for C-suite and VP mandates where a miss is expensive to unwind. You get the whole market, a calibrated shortlist, and the person who took your intake negotiating the offer."
        primary={{ label: "Book a Discovery Call", href: site.bookCall }}
        secondary={{ label: "How a search runs", href: "#search" }}
      />

      <div className="shell min-w-0">
        <SearchConsole />
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

      <Finale
        eyebrow="Discuss the mandate"
        title="Bring the role before the search starts."
        lede="Pressure-test the scope, compensation and market before committing to a process."
        bullets={["A realistic market read", "A calibrated search scope", "A clear path from intake to offer"]}
      />
    </>
  );
}
