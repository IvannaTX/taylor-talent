"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { companies, companyRows, type Company } from "@/data/companies";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const commentIsReady = (company: Company) =>
  Boolean(company.testimonial && company.partnerName && company.partnerTitle);

function CompanyLogo({ company }: { company: Company }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "select-none whitespace-nowrap text-[1.2rem] font-semibold tracking-[-0.04em] sm:text-[1.35rem]",
        company.name === "Rippling" && "font-mono text-[1rem] tracking-[0.02em]",
        company.name === "Decagon" && "font-mono text-[0.95rem] tracking-[0.09em]",
        company.name === "Scale" && "font-normal tracking-[-0.08em]",
        company.name === "Apple" && "display font-normal",
        company.name === "Google" && "font-normal tracking-[-0.06em]",
        company.name === "Indeed" && "lowercase tracking-[-0.06em]",
        company.name === "GLG" && "tracking-[0.08em]",
        company.name === "DISCO" && "font-mono tracking-[0.08em]",
        company.name === "Talentful" && "font-normal tracking-[-0.05em]",
      )}
    >
      {company.logo}
    </span>
  );
}

function LogoTile({
  company,
  interactive = false,
  onEnter,
  onFocus,
  onBlur,
}: {
  company: Company;
  interactive?: boolean;
  onEnter?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const ready = commentIsReady(company);

  return (
    <div
      tabIndex={interactive && ready ? 0 : undefined}
      aria-label={company.name}
      onMouseEnter={interactive && ready ? onEnter : undefined}
      onFocus={interactive && ready ? onFocus : undefined}
      onBlur={interactive && ready ? onBlur : undefined}
      className={cn(
        "group grid h-[5.75rem] min-w-[10.5rem] place-items-center rounded-2xl border border-line bg-surface px-6 text-muted",
        "transition-[color,background-color,border-color,transform] duration-500 ease-apple sm:h-[6.5rem]",
        interactive && ready && "cursor-default hover:-translate-y-0.5 hover:border-line-strong hover:bg-raised hover:text-ink focus-visible:text-ink",
      )}
    >
      <CompanyLogo company={company} />
    </div>
  );
}

function PartnerComment({ company }: { company: Company }) {
  return (
    <motion.aside
      key={company.name}
      role="status"
      initial={{ opacity: 0, y: 12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.8 }}
      className="mx-auto w-full max-w-2xl rounded-card border border-line bg-raised/95 p-6 shadow-lift backdrop-blur-xl sm:p-7"
    >
      <blockquote className="display text-[1.2rem] leading-[1.4] text-ink sm:text-[1.4rem]">
        “{company.testimonial}”
      </blockquote>
      <div className="mt-5 flex items-end justify-between gap-5 border-t border-line pt-4">
        <p className="min-w-0 text-sm text-ink">
          <span className="block font-medium">{company.partnerName}</span>
          <span className="mt-0.5 block text-xs text-faint">{company.partnerTitle}</span>
        </p>
        {company.caseStudyUrl ? (
          <a className="flex shrink-0 items-center gap-1.5 text-xs text-muted transition-colors hover:text-ink" href={company.caseStudyUrl}>
            Case study <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </motion.aside>
  );
}

function DesktopRows({ onActive }: { onActive: (company: Company | null) => void }) {
  return (
    <div className="hidden space-y-8 md:block" onMouseLeave={() => onActive(null)}>
      {companyRows.map((row) => {
        const rowCompanies = companies.filter((company) => company.category === row.category);
        return (
          <div key={row.category}>
            {row.category === "current-client" ? (
              <h2 id="trusted-companies-title" className="eyebrow">Current Clients</h2>
            ) : row.category === "in-house" ? (
              <div className="pt-4">
                <h2 className="eyebrow">Experience</h2>
                <h3 className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint">In-House</h3>
              </div>
            ) : (
              <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint">Agency-Side</h3>
            )}
            <div className={cn("mt-3 grid gap-3", rowCompanies.length === 5 ? "grid-cols-5" : rowCompanies.length === 4 ? "grid-cols-4" : "grid-cols-3 max-w-3xl")}>
              {rowCompanies.map((company) => (
                <LogoTile key={company.name} company={company} interactive onEnter={() => onActive(company)} onFocus={() => onActive(company)} onBlur={() => onActive(null)} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MobileRows() {
  const reduce = useReducedMotion();
  return (
    <div className="space-y-7 md:hidden">
      {companyRows.map((row, rowIndex) => {
        const rowCompanies = companies.filter((company) => company.category === row.category);
        const repeated = [...rowCompanies, ...rowCompanies];
        return (
          <div key={row.category}>
            {row.category === "current-client" ? (
              <h2 id="trusted-companies-title-mobile" className="px-5 eyebrow sm:px-8">Current Clients</h2>
            ) : row.category === "in-house" ? (
              <div className="px-5 pt-3 sm:px-8">
                <h2 className="eyebrow">Experience</h2>
                <h3 className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint">In-House</h3>
              </div>
            ) : (
              <h3 className="px-5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-faint sm:px-8">Agency-Side</h3>
            )}
            <div className="mask-fade-x mt-3 overflow-hidden" aria-label={`${row.label}: ${rowCompanies.map((company) => company.name).join(", ")}`}>
              <motion.div
                aria-hidden="true"
                className="flex w-max gap-3 pl-3"
                animate={reduce ? undefined : { x: rowIndex % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: 24 + rowIndex * 3, repeat: Infinity, ease: "linear" }}
              >
                {repeated.map((company, index) => <LogoTile key={`${company.name}-${index}`} company={company} />)}
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function TrustedCompanies() {
  const [active, setActive] = React.useState<Company | null>(null);
  const hasComments = companies.some(commentIsReady);

  return (
    <section aria-label="Company experience" className="overflow-hidden rounded-[1.5rem] border border-line bg-surface/70 py-8 shadow-card backdrop-blur-sm sm:py-10">
      <div className="px-5 sm:px-8">
        {hasComments ? (
          <div className="relative hidden min-h-[12rem] items-end md:flex">
            <AnimatePresence mode="wait">{active ? <PartnerComment company={active} /> : null}</AnimatePresence>
          </div>
        ) : null}

        <Reveal dir="none" blur={false}><DesktopRows onActive={setActive} /></Reveal>
      </div>

      <MobileRows />
    </section>
  );
}
