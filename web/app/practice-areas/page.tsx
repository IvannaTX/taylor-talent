import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Practice } from "@/components/site/practice";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Executive search across C-suite, go-to-market, product, engineering, customer success, finance, people, and legal leadership.",
  alternates: { canonical: "/practice-areas" },
  openGraph: {
    title: `Practice Areas — ${site.name}`,
    description:
      "The functions, leadership levels, and sectors where Taylor Talent Partners has an active executive network.",
    url: "/practice-areas",
  },
};

export default function PracticeAreasPage() {
  return <Practice />;
}
