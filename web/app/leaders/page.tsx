import type { Metadata } from "next";
import { site } from "@/lib/site";
import { leaderBeats } from "@/lib/copy";
import { PageHero } from "@/components/site/page-hero";
import { BeatRun } from "@/components/beats/run";
import { leaderArtifacts } from "@/components/artifacts/leader";
import { ConfidentialArtifact } from "@/components/artifacts/leader";
import { Finale } from "@/components/site/finale";
import { ExecutiveNetwork } from "@/components/home/ExecutiveNetwork";
import { Rule } from "@/components/ui/kit";
import { breadcrumbSchema, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "For Leaders",
  description:
    "A confidential, standing relationship for senior leaders across GTM, product, engineering, customer success, G&A and legal. Nothing is shared without your approval, and no mandate reaches you unless it fits.",
  alternates: { canonical: "/leaders" },
  openGraph: {
    title: `For Leaders | ${site.name}`,
    description:
      "A confidential, standing relationship for senior leaders. You approve every introduction.",
    url: "/leaders",
  },
};

export default function LeadersPage() {
  return (
    <>
      <PageHero
        eyebrow="For senior leaders"
        title="The best time for this conversation is before you need it."
        lede="Senior moves rarely come from a job search. They come from a relationship that already existed when the right mandate appeared. This is that line — private, low-frequency, and entirely on your terms."
        primary={{
          label: "Start a confidential conversation",
          href: site.bookCall,
        }}
        secondary={{ label: "How it works", href: "#relationship" }}
        aside={<ConfidentialArtifact />}
      />

      <div className="pt-section">
        <BeatRun
          id="relationship"
          label="How the relationship works"
          beats={leaderBeats}
          artifacts={leaderArtifacts}
          align="left"
        />
      </div>

      {/* The same carousel the homepage runs, reading the same roster — the
          company-facing version frames it as reach into a senior network; here
          it answers the question a candidate actually has, which is whether
          their seat is one Taylor Talent recruits for at all. */}
      <div className="shell">
        <ExecutiveNetwork
          eyebrow="Your next move"
          title="Your experience belongs in the right room."
          lede="Taylor Talent works with startup and scale-up teams hiring across go-to-market, technical, operational, and executive roles."
          ariaLabel="Roles Taylor Talent recruits for"
          className="mt-section border-t border-line pt-16 sm:pt-20"
        />
      </div>

      <div className="shell">
        <Rule />
      </div>

      <Finale
        eyebrow="Start privately"
        title="A confidential conversation, on your terms."
        lede="No résumé blast and no automatic introduction. Start with the move you want to make—even if the timing is not now."
        bullets={["Nothing shared without approval", "Only relevant senior mandates", "A direct line to Jarod"]}
        cta="Start a Confidential Conversation"
      />

      <script {...jsonLdProps(breadcrumbSchema("For Leaders", "/leaders"))} />
    </>
  );
}
