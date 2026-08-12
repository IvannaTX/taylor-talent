import { companyBeats, leaderBeats } from "@/lib/copy";
import { Hero } from "@/components/site/hero";
import { BeatRun } from "@/components/beats/run";
import { companyArtifacts } from "@/components/artifacts/company";
import { leaderArtifacts } from "@/components/artifacts/leader";
import { Proof } from "@/components/site/proof";
import { Practice } from "@/components/site/practice";
import { Jarod } from "@/components/site/jarod";
import { Finale } from "@/components/site/finale";
import { Rule } from "@/components/ui/kit";

/**
 * Homepage.
 *
 * The spine is two "runs" of beats — one per audience — where a pinned artifact
 * morphs through the stages of a search as you read past it. Everything else
 * exists to set up or close those two runs.
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Company-side run: five stages of a live search */}
      <div className="pt-section">
        <BeatRun
          id="search"
          label="For companies — how a search runs"
          beats={companyBeats}
          artifacts={companyArtifacts}
          align="right"
        />
      </div>

      <div className="shell">
        <Rule />
      </div>

      <Proof />

      {/* Leader-side run: the other side of the table */}
      <BeatRun
        id="leaders"
        label="For senior leaders — how the relationship works"
        beats={leaderBeats}
        artifacts={leaderArtifacts}
        align="left"
      />

      <div className="shell">
        <Rule />
      </div>

      <Practice />
      <Jarod />
      <Finale />
    </>
  );
}
