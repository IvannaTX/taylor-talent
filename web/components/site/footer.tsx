import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/wordmark";

/**
 * Global footer.
 *
 * A closing surface rather than a utility strip: the brand and its one-line
 * positioning on the left, four navigation columns on the right, and a bottom
 * bar carrying the entity, the legal documents and the outbound destinations.
 *
 * The columns are not authored here — they come from `footerNav` in lib/site.ts,
 * which composes them from the same constants the primary navigation, the
 * practice-areas page, the JSON-LD service catalogue and /llms.txt read. The
 * footer therefore restates the site's service taxonomy for crawlers and AI
 * agents without being able to drift from it.
 *
 * Markup is deliberately landmark-heavy: one <nav> per column, each labelled by
 * its own visible heading via aria-labelledby, so a screen reader or an agent
 * walking the document gets four named groups instead of one undifferentiated
 * pile of links.
 */

const columnLink =
  "group/link inline-flex items-baseline gap-1.5 text-[0.9375rem] leading-relaxed text-muted transition-colors duration-300 hover:text-ink focus-visible:text-ink";

const bottomLink =
  "text-[0.8125rem] leading-5 text-faint transition-colors duration-300 hover:text-ink";

/** Outbound link with the site's standard lifting arrow. */
function OutboundLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group inline-flex items-center gap-1.5", className)}
    >
      {children}
      <ArrowUpRight
        className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
        strokeWidth={2}
        aria-hidden
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-section border-t border-line">
      {/* The one accent on the surface: the brand gradient, at the weight the
          identity reserves it for — a hairline, not a fill. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-ring-gradient opacity-30"
      />

      <div className="shell pb-7 pt-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] lg:gap-14">
          {/* ---- identity ------------------------------------------- */}
          <div className="min-w-0">
            <Wordmark />
            <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">
              {site.tagline} across go-to-market, executive search and
              technical hiring.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block text-[0.875rem] text-muted underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-accent-indigo"
            >
              {site.email}
            </a>
          </div>

          {/* ---- navigation ----------------------------------------- */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:gap-x-6">
            {footerNav.map((column) => {
              const headingId = `footer-${column.id}`;
              return (
                <div key={column.id} className="min-w-0">
                  <h2
                    id={headingId}
                    className="font-mono text-eyebrow uppercase text-faint"
                  >
                    {column.heading}
                  </h2>
                  <nav aria-labelledby={headingId} className="mt-4">
                    <ul className="flex flex-col gap-3 sm:gap-2.5">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className={columnLink}>
                            {link.label}
                            {/* Sits in the flow at zero width so a hover never
                                shifts the label sideways. */}
                            <span
                              aria-hidden
                              className="h-1 w-1 shrink-0 rounded-full bg-accent-indigo opacity-0 transition-opacity duration-300 group-hover/link:opacity-100"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              );
            })}
          </div>
        </div>

        <div
          aria-hidden
          className="mt-6 h-px w-full bg-hairline-b"
        />

        {/* ---- bottom bar ----------------------------------------- */}
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <p className="text-[0.8125rem] leading-relaxed text-faint">
            © {year} {site.alternateName}
            {/* Both names are recorded in lib/site.ts and neither is invented:
                the trading name above, the operating entity below, phrased the
                way lib/legal.ts phrases it in both documents. */}
            <span className="block">
              {site.legalEntity}, doing business as {site.name} ·{" "}
              {site.location}
            </span>
          </p>

          {/* Legal lives in its own column above; repeating it here would only
              duplicate the links and give the pair two places to drift. */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <OutboundLink href={site.linkedin} className={bottomLink}>
              LinkedIn
            </OutboundLink>
            <OutboundLink href={site.bookCall} className={bottomLink}>
              Schedule a Discovery Call
            </OutboundLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
