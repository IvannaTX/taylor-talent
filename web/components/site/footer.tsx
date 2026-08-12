import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { practice } from "@/lib/copy";
import { Wordmark } from "@/components/wordmark";

/**
 * Dense, multi-column footer. The depth is deliberate: practice areas and levels
 * are real navigational surface for a search firm, not filler.
 */
const columns = [
  {
    heading: "Engage",
    links: [
      { label: "For Companies", href: "/companies" },
      { label: "For Leaders", href: "/leaders" },
      { label: "Book a Discovery Call", href: site.bookCall },
    ],
  },
  {
    heading: "Practice areas",
    links: practice.functions.slice(0, 5).map((f) => ({
      label: f.name,
      href: "/#practice",
    })),
  },
  {
    heading: "Levels",
    links: practice.levels.map((l) => ({ label: l, href: "/#practice" })),
  },
  {
    heading: "Firm",
    links: [
      { label: "About Jarod", href: "/#jarod" },
      { label: "How a search runs", href: "/#search" },
      { label: "References", href: "/#proof" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="shell py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-8">
          <div className="lg:pr-8">
            <Wordmark />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-muted">
              Retained executive search from {site.location}. One point of
              contact, intake to start date.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block text-[0.875rem] text-muted underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-accent-indigo"
            >
              {site.email}
            </a>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="eyebrow">{col.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => {
                  const external = /^(https?:|mailto:)/.test(l.href);
                  const cls =
                    "text-[0.875rem] leading-snug text-muted transition-colors duration-300 hover:text-ink";
                  return (
                    <li key={`${col.heading}-${l.label}`}>
                      {external ? (
                        <a
                          href={l.href}
                          className={cls}
                          {...(l.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className={cls}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint transition-colors duration-300 hover:text-ink"
            >
              LinkedIn
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-300 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                strokeWidth={2}
              />
            </a>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
              Scheduling via {site.bookingHost}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
