import type { Metadata } from "next";
import Link from "next/link";
import { site, legalNav, recruitingAgreement } from "@/lib/site";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/kit";
import { breadcrumbSchema, jsonLdProps } from "@/lib/schema";

/**
 * Recruiting Agreement — route and placeholder.
 *
 * The footer links here, so the route exists rather than dead-ending. The
 * agreement itself is deliberately not drafted: commercial terms are a separate
 * piece of work and nothing on this page states a fee, a guarantee, a
 * replacement policy or any other provision that has not been settled and
 * reviewed. What it does say is true today — terms are issued directly as part
 * of an engagement — and it routes to the two documents that *are* published.
 */

export const metadata: Metadata = {
  title: "Recruiting Agreement",
  description:
    "Where Taylor Talent's recruiting agreement will be published. Engagement terms are currently issued directly as part of a search engagement.",
  alternates: { canonical: recruitingAgreement.href },
  openGraph: {
    title: `Recruiting Agreement | ${site.name}`,
    description:
      "Where Taylor Talent's recruiting agreement will be published. Engagement terms are currently issued directly.",
    url: recruitingAgreement.href,
  },
};

export default function RecruitingAgreementPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagement"
        title="The recruiting agreement will be published here."
        lede="Retained and contingency engagements each run on written terms. Those terms are issued directly today, and this is the page they will live on once published."
        primary={{ label: "Book a Discovery Call", href: site.bookCall }}
        secondary={{ label: "How a search runs", href: "/companies#search" }}
      />

      <Section>
        <div className="card grain relative overflow-hidden p-8 sm:p-12">
          <div className="max-w-[54ch]">
            <h2 className="display text-display-xs text-ink">
              Not yet published
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
              Nothing on this page sets out fees, notice periods, replacement
              terms or any other provision of an engagement. Those are agreed in
              writing for each search, and publishing a summary before the
              agreement itself exists would only create a second version to
              disagree with.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
              To see the terms that would apply to a search, ask for them on a
              discovery call — you will get the agreement rather than a summary
              of it.
            </p>

            <div
              aria-hidden
              className="mt-9 h-px w-full bg-hairline-b"
            />

            <p className="mt-8 text-[0.8125rem] uppercase tracking-[0.14em] text-faint font-mono">
              Published today
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-muted underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-accent-indigo"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <script
        {...jsonLdProps(
          breadcrumbSchema("Recruiting Agreement", recruitingAgreement.href),
        )}
      />
    </>
  );
}
