import type { Metadata } from "next";
import { ArrowDownToLine, ArrowUpRight, FileText } from "lucide-react";
import { site, recruitingAgreement } from "@/lib/site";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/kit";
import { breadcrumbSchema, jsonLdProps } from "@/lib/schema";

const contingencyAgreement =
  "/documents/Taylor-Talent-Partners-Contingency-Recruiting-Agreement.pdf";

export const metadata: Metadata = {
  title: "Recruiting Agreements",
  description:
    "View or download Taylor Talent's current contingency recruiting agreement. Retained search terms are provided separately and will be published when finalized.",
  alternates: { canonical: recruitingAgreement.href },
  openGraph: {
    title: `Recruiting Agreements | ${site.name}`,
    description:
      "Review Taylor Talent's current contingency recruiting agreement and the status of retained search terms.",
    url: recruitingAgreement.href,
  },
};

export default function RecruitingAgreementPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagement terms"
        title="The contingency agreement is now published."
        lede="Review the current contingency recruiting agreement here. Retained search terms are provided separately and will be added once finalized."
        primary={{
          label: "View contingency agreement",
          href: contingencyAgreement,
        }}
        secondary={{ label: "How a search runs", href: "/companies#search" }}
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)]">
          <article className="card grain relative overflow-hidden p-7 sm:p-10">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-ring-gradient opacity-70"
            />

            <div className="relative flex h-full flex-col">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line bg-raised text-accent-indigo">
                    <FileText className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow">Current agreement</p>
                    <h2 className="display mt-2 text-display-xs text-ink">
                      Contingency Recruiting Agreement
                    </h2>
                  </div>
                </div>

                <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-pill border border-line bg-raised px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-ok"
                  />
                  Published
                </div>
              </div>

              <p className="mt-7 max-w-[62ch] text-[1rem] leading-relaxed text-muted sm:text-[1.0625rem]">
                The complete written terms for nonexclusive contingency
                recruiting engagements with clients other than law firms. Open
                the agreement to review fees, payment terms, candidate
                introductions, and the placement guarantee.
              </p>

              <dl className="mt-8 grid gap-5 border-y border-line py-6 sm:grid-cols-3">
                <div>
                  <dt className="eyebrow">Format</dt>
                  <dd className="mt-2 text-[0.9375rem] text-ink">PDF</dd>
                </div>
                <div>
                  <dt className="eyebrow">Length</dt>
                  <dd className="mt-2 text-[0.9375rem] text-ink">2 pages</dd>
                </div>
                <div>
                  <dt className="eyebrow">Engagement</dt>
                  <dd className="mt-2 text-[0.9375rem] text-ink">
                    Contingency
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={contingencyAgreement}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Open agreement
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </Button>
                <a
                  href={contingencyAgreement}
                  download
                  className="group inline-flex h-[3.25rem] w-full select-none items-center justify-center gap-2 rounded-pill border border-line bg-surface/70 px-7 text-base font-medium text-ink transition-[transform,background-color,border-color] duration-300 ease-apple hover:border-accent-indigo/45 hover:bg-raised/80 active:scale-[0.985] motion-reduce:active:scale-100 motion-reduce:transition-none sm:w-auto"
                >
                  Download PDF
                  <ArrowDownToLine className="h-4 w-4" strokeWidth={2.2} />
                </a>
              </div>
            </div>
          </article>

          <aside className="card p-7 sm:p-10">
            <div className="flex h-full flex-col">
              <div className="inline-flex w-fit items-center gap-2 rounded-pill border border-line bg-raised px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-faint">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-faint"
                />
                In preparation
              </div>

              <h2 className="display mt-6 text-display-xs text-ink">
                Retained Search Agreement
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                Retained engagements run on separate written terms. That
                agreement is not published yet and will be added here once it
                is finalized.
              </p>

              <div className="mt-auto pt-8">
                <Button
                  href={site.bookCall}
                  variant="secondary"
                  className="w-full"
                >
                  Discuss a retained search
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <script
        {...jsonLdProps(
          breadcrumbSchema("Recruiting Agreements", recruitingAgreement.href),
        )}
      />
    </>
  );
}
