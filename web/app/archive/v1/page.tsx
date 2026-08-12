import type { Metadata } from "next";
import { Hero } from "@/components/archive/hero";
import { WhoWeHelp } from "@/components/archive/who-we-help";
import { Services } from "@/components/archive/services";
import { Industries } from "@/components/archive/industries";
import { Why } from "@/components/archive/why";
import { MeetJarod } from "@/components/archive/meet-jarod";
import { Process } from "@/components/archive/process";
import { Testimonials } from "@/components/archive/testimonials";
import { Contact } from "@/components/archive/contact";

export const metadata: Metadata = {
  title: "Archive — v1",
  // Kept for reference only; must never compete with the live site in search.
  robots: { index: false, follow: false },
};

/**
 * Archived first-pass homepage (v1). Superseded by the artifact-led homepage in
 * app/page.tsx. Nothing here is imported by the live site.
 */
export default function ArchivedV1() {
  return (
    <>
      <Hero />
      <WhoWeHelp />
      <Services />
      <Industries />
      <Why />
      <MeetJarod />
      <Process />
      <Testimonials />
      <Contact />
    </>
  );
}
