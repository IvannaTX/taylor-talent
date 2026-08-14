import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/site/page-hero";
import { Jarod } from "@/components/site/jarod";
import { Philosophy } from "@/components/about/Philosophy";

export const metadata: Metadata = {
  title: "About Jarod Taylor",
  description:
    "Jarod Taylor's recruiting background, executive-search philosophy, and the experience behind Taylor Talent Partners.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Jarod Taylor | ${site.name}`,
    description:
      "Ten years across in-house and agency recruiting, now personally leading every Taylor Talent Partners search.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Search judgment built on both sides of the table."
        lede="Jarod Taylor spent a decade recruiting inside global companies and alongside founders before building the search firm he wanted clients and candidates to experience."
        primary={{ label: "Connect with Jarod", href: site.linkedin }}
      />
      <Jarod />
      <Philosophy />
    </>
  );
}
