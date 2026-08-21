import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/kit";
import { Reveal } from "@/components/motion/reveal";

/**
 * Three tiles, not four. The company-side and leader-side entries were merged
 * because the person making a hiring decision is a senior leader at a company:
 * splitting them asked the same visitor to choose between two descriptions of
 * their own role.
 */
const paths = [
  {
    eyebrow: "For companies and senior leaders",
    title: "A search you can see working.",
    body: "See how a search moves from calibration to a signed offer, retained or contingency.",
    href: "/companies",
  },
  {
    eyebrow: "Practice areas",
    title: "Go-to-market, technical, executive, legal.",
    body: "The four practice areas we recruit across, the roles in each, and how engagements are structured.",
    href: "/practice-areas",
  },
  {
    eyebrow: "About Jarod",
    title: "The experience behind every search.",
    body: "Read the background and principles behind Taylor Talent.",
    href: "/about",
  },
] as const;

export function AudiencePaths() {
  return (
    <Section>
      <SectionHead
        eyebrow="Explore"
        title="The detail is where you need it."
        lede="Choose the side of the search you are here for."
        align="center"
        size="sm"
      />
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((path, index) => (
          <Reveal key={path.href} delay={index * 0.07} className="h-full">
            <Link
              href={path.href}
              className="group card flex h-full min-h-[15rem] flex-col p-6 transition-[border-color,background-color,transform] duration-500 ease-apple hover:-translate-y-1 hover:border-line-strong hover:bg-raised sm:p-7"
            >
              <span className="eyebrow">{path.eyebrow}</span>
              <h2 className="display mt-5 text-[1.45rem] leading-tight text-ink">{path.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{path.body}</p>
              <span className="mt-auto flex items-center gap-2 pt-8 text-sm text-ink">
                Explore
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
