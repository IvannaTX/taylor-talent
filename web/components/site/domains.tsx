import Link from "next/link";
import { recruitingDomains, legalSpecialty, site } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";

/**
 * The three recruiting domains, plus legal as a specialty.
 *
 * Rendered as plain semantic HTML — a heading, a paragraph and a role list per
 * domain — rather than inside a carousel or an image. This is the section that
 * has to answer "what does Taylor Talent do, for whom, and which roles" without
 * JavaScript, so nothing here is hidden behind an interaction.
 */
export function RecruitingDomains() {
  const entries = [...recruitingDomains, legalSpecialty];

  return (
    <div className="mt-14 space-y-12 sm:mt-16 sm:space-y-14">
      {entries.map((domain, index) => {
        const specialty = domain.id === legalSpecialty.id;

        return (
          <Reveal key={domain.id} delay={index * 0.05}>
            <section
              id={domain.id}
              className="scroll-mt-32 border-t border-line pt-8"
              aria-labelledby={`${domain.id}-heading`}
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                <div>
                  <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
                    {specialty
                      ? "Specialty"
                      : `Domain ${String(index + 1).padStart(2, "0")}`}
                  </span>
                  <h3
                    id={`${domain.id}-heading`}
                    className="display mt-3 text-[1.5rem] leading-tight text-ink sm:text-[1.75rem]"
                  >
                    {domain.name}
                  </h3>
                </div>

                <div className="min-w-0">
                  <p className="max-w-prose text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                    {domain.summary}
                  </p>

                  <h4 className="mt-6 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
                    Representative roles
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {domain.roles.map((role) => (
                      <li
                        key={role}
                        className="inline-flex rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.8125rem] text-muted"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </Reveal>
        );
      })}

      <Reveal>
        <p className="border-t border-line pt-8 text-[0.9375rem] leading-relaxed text-muted">
          Hiring across more than one of these? That is the usual case.{" "}
          <Link
            href="/companies"
            className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:decoration-accent-indigo"
          >
            See how a search runs
          </Link>
          , read about{" "}
          <Link
            href="/about"
            className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:decoration-accent-indigo"
          >
            the experience behind {site.name}
          </Link>
          , or{" "}
          <a
            href={site.bookCall}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:decoration-accent-indigo"
          >
            book a discovery call
          </a>
          .
        </p>
      </Reveal>
    </div>
  );
}
