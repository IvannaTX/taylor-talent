import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import type { LegalBlock, LegalDoc } from "@/lib/legal";
import { Eyebrow } from "@/components/ui/kit";
import { Reveal } from "@/components/motion/reveal";
import { ReadingProgress } from "@/components/legal/reading-progress";
import { LegalToc } from "@/components/legal/legal-toc";

/**
 * The one rendering path for /terms and /privacy.
 *
 * Layout is a contents rail beside a single measure of prose, capped well below
 * the shell width — legal text is the only place on this site that is read
 * straight through, so the column is set for reading rather than for scanning.
 */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const items = doc.sections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <>
      <ReadingProgress />

      <article>
        {/* ---------------------------------------------------------- */}
        {/* Header                                                      */}
        {/* ---------------------------------------------------------- */}
        <header className="relative pb-10 pt-28 sm:pt-36">
          <div className="shell">
            <div className="max-w-[46rem]">
              <Eyebrow>{doc.eyebrow}</Eyebrow>

              <h1 className="display mt-5 text-display-md text-ink">
                {doc.title}
              </h1>

              <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted sm:text-lg">
                {doc.lede}
              </p>

              <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <dt className="eyebrow">Effective</dt>
                  <dd className="mt-2 text-[0.875rem] text-muted">
                    {doc.effective}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Last updated</dt>
                  <dd className="mt-2 text-[0.875rem] text-muted">
                    {doc.updated}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Applies to</dt>
                  <dd className="mt-2 text-[0.875rem] text-muted">
                    {site.url.replace("https://", "")}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        {/* ---------------------------------------------------------- */}
        {/* Sticky bar — sits directly beneath the fixed nav            */}
        {/* ---------------------------------------------------------- */}
        <div className="sticky top-16 z-30 border-y border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-bg/65 sm:top-[4.5rem]">
          <div className="shell flex h-14 items-center justify-between gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[0.8125rem] text-muted transition-colors duration-300 hover:text-ink"
            >
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform duration-300 ease-apple group-hover:-translate-x-0.5 motion-reduce:transition-none"
                strokeWidth={2}
                aria-hidden
              />
              Back to home
            </Link>

            <Link
              href={doc.sibling.href}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint transition-colors duration-300 hover:text-ink"
            >
              {doc.sibling.label}
            </Link>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Body                                                        */}
        {/* ---------------------------------------------------------- */}
        <div className="shell py-12 sm:py-16">
          <div className="mx-auto grid max-w-[62rem] gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
            {/* Contents — a rail at lg+, a disclosure below it */}
            <div className="lg:order-none">
              <details className="group rounded-card border border-line bg-surface/60 px-5 py-4 lg:hidden">
                {/* list-none covers Chrome/Firefox; the webkit selector is what
                    actually removes the triangle in Safari. */}
                <summary className="flex cursor-pointer list-none items-center justify-between text-[0.875rem] text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                  On this page
                  <span
                    aria-hidden
                    className="text-faint transition-transform duration-300 ease-apple group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>
                <ol className="mt-4 space-y-2 border-t border-line pt-4">
                  {items.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="flex items-start gap-3 text-[0.8125rem] leading-snug text-muted"
                      >
                        <span
                          aria-hidden
                          className="num mt-[0.15em] w-4 shrink-0 font-mono text-[0.625rem] text-faint/70"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>

              <div className="hidden lg:block">
                <LegalToc items={items} />
              </div>
            </div>

            {/* Prose */}
            <div className="min-w-0">
              {doc.sections.map((section, i) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-40 border-t border-line pt-10 first:border-t-0 first:pt-0 [&+section]:mt-12"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden
                      className="num shrink-0 font-mono text-[0.6875rem] tabular-nums text-faint"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="display text-[1.5rem] leading-tight text-ink sm:text-[1.75rem]">
                      {section.title}
                    </h2>
                  </div>

                  <div className="mt-5 sm:pl-[2.125rem]">
                    {section.blocks.map((block, j) => (
                      <Block key={j} block={block} />
                    ))}
                    {section.contact && <ContactCard />}
                  </div>
                </section>
              ))}

              {/* Foot of the document */}
              <div className="mt-14 border-t border-line pt-8">
                <p className="text-[0.8125rem] leading-relaxed text-faint">
                  {doc.title} · Effective {doc.effective} ·{" "}
                  {site.legalEntity}, doing business as {site.name}.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href={doc.sibling.href}
                    className="text-[0.875rem] text-muted underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-accent-indigo"
                  >
                    Read the {doc.sibling.label}
                  </Link>
                  <a
                    href={site.bookCall}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[0.875rem] text-muted transition-colors duration-300 hover:text-ink"
                  >
                    Schedule a Discovery Call
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

/** A paragraph, or a bulleted list. */
function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return (
      <p className="mt-5 text-[1.0625rem] leading-[1.8] text-muted first:mt-0">
        {block}
      </p>
    );
  }

  return (
    <ul className="mt-5 space-y-3.5 first:mt-0">
      {block.list.map((entry) => (
        <li
          key={entry}
          className="flex items-start gap-3.5 text-[1.0625rem] leading-[1.8] text-muted"
        >
          <span
            aria-hidden
            className="mt-[0.72em] h-px w-3 shrink-0 bg-line-strong"
          />
          <span className="min-w-0">{entry}</span>
        </li>
      ))}
    </ul>
  );
}

/** Closing contact block. Kept as a definition list so it reads as a record. */
function ContactCard() {
  return (
    <Reveal blur={false}>
      <div className="card mt-7 p-6 sm:p-8">
        <dl className="grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="eyebrow">Entity</dt>
            <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink">
              {site.legalEntity}
              <span className="block text-muted">
                doing business as {site.name}
              </span>
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Attention</dt>
            <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink">
              {site.founder}
              <span className="block text-muted">Founder</span>
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Email</dt>
            <dd className="mt-2.5">
              <a
                href={`mailto:${site.email}`}
                className="text-[0.9375rem] text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:decoration-accent-indigo"
              >
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Location</dt>
            <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink">
              {site.location}
            </dd>
          </div>
        </dl>
      </div>
    </Reveal>
  );
}
