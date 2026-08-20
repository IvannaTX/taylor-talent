import type { Metadata } from "next";
import { site } from "@/lib/site";
import { terms } from "@/lib/legal";
import { LegalDocument } from "@/components/legal/legal-document";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing use of the Taylor Talent website, including intellectual property, third-party links, search-outcome disclaimers, limitation of liability, and Texas governing law.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms of Use | ${site.name}`,
    description:
      "What this site is, what it is not, and the limits of what Taylor Talent promises here.",
    url: "/terms",
  },
};

export default function TermsPage() {
  return <LegalDocument doc={terms} />;
}
