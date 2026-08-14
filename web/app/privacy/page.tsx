import type { Metadata } from "next";
import { site } from "@/lib/site";
import { privacy } from "@/lib/legal";
import { LegalDocument } from "@/components/legal/legal-document";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Taylor Talent Partners handles personal information: what we collect, scheduling requests, cookies, analytics, third-party services, retention periods, and your rights.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy | ${site.name}`,
    description:
      "What we collect, why we collect it, how long we keep it, and what you can ask us to do with it.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return <LegalDocument doc={privacy} />;
}
