import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { legalNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/wordmark";

/**
 * Three regions on one line: the entity on the left, the legal documents in the
 * centre, the two outbound destinations on the right. A slim identity tier sits
 * above the hairline.
 *
 * The previous footer carried columns of practice areas and levels; that surface
 * now lives on /companies, and repeating it here only diluted it. A closing
 * footer earns more by being quiet.
 */

const linkBase =
  "text-[0.875rem] leading-relaxed text-muted transition-colors duration-300 hover:text-ink";

const legalLinkBase =
  "text-[0.6875rem] leading-5 tracking-[0.01em] text-faint transition-colors duration-300 hover:text-ink";

/** Outbound link with the site's standard lifting arrow. */
function OutboundLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group inline-flex items-center gap-1.5", linkBase)}
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
  return (
    <footer className="relative border-t border-line">
      <div className="shell py-12 sm:py-14">
        {/* Identity */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Wordmark />
          <a
            href={`mailto:${site.email}`}
            className="text-[0.875rem] text-muted underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-accent-indigo"
          >
            {site.email}
          </a>
        </div>

        <div
          aria-hidden
          className="mt-9 h-px w-full bg-gradient-to-r from-transparent via-line to-transparent"
        />

        {/* Entity · legal · destinations. Each region is two lines, so the three
            columns balance without any of them needing a heading. */}
        <div className="mt-9 grid gap-8 md:grid-cols-3 md:items-start">
          <p className="text-[0.8125rem] leading-relaxed text-faint">
            © {new Date().getFullYear()} {site.legalEntity}
            <span className="block">{site.location}</span>
          </p>

          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-1 md:justify-center">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className={legalLinkBase}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-start md:items-end">
            <OutboundLink href={site.linkedin}>LinkedIn</OutboundLink>
            <OutboundLink href={site.bookCall}>
              Schedule a Discovery Call
            </OutboundLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
