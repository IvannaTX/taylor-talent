import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/site/page-hero";
import { Jarod } from "@/components/site/jarod";
import { Philosophy } from "@/components/about/Philosophy";
import { breadcrumbSchema, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Jarod Taylor",
  description:
    "Jarod Taylor's recruiting background, hiring philosophy, and the in-house experience behind Taylor Talent: ten years across go-to-market, technical, legal and C-suite hiring.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Jarod Taylor | ${site.name}`,
    description:
      "Ten years of in-house recruiting experience, now overseeing every Taylor Talent search.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Search judgment built on both sides of the table."
        lede="Jarod Taylor spent a decade recruiting inside global companies and alongside founders before building the recruiting firm he wanted clients and candidates to experience."
        primary={{ label: "Connect with Jarod", href: site.linkedin }}
      />
      <Jarod />
      <Philosophy />

      <script {...jsonLdProps(breadcrumbSchema("About", "/about"))} />
    </>
  );
}
