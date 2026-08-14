"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; title: string };

/**
 * Sticky contents rail for the legal pages, with scroll-spy.
 *
 * The observer's rootMargin masks the fixed header at the top and the lower
 * two-thirds of the viewport at the bottom, so "active" means the section whose
 * heading has most recently passed under the nav — not merely one that happens
 * to be on screen. Entries are re-sorted by position because IntersectionObserver
 * hands them back in an unspecified order.
 */
export function LegalToc({ items }: { items: readonly Item[] }) {
  const [active, setActive] = React.useState<string>(items[0]?.id ?? "");
  const ids = items.map((i) => i.id).join(",");

  React.useEffect(() => {
    const targets = ids
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const onscreen = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (onscreen[0]) setActive(onscreen[0].target.id);
      },
      { rootMargin: "-100px 0px -66% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-32">
      <h2 className="eyebrow">Contents</h2>
      <ol className="mt-5 space-y-0.5">
        {items.map((item, i) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "group flex items-start gap-3 rounded-md py-1.5 pr-2 text-[0.8125rem] leading-snug transition-colors duration-300",
                  current ? "text-ink" : "text-faint hover:text-muted",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "num mt-[0.15em] w-4 shrink-0 font-mono text-[0.625rem] tabular-nums transition-colors duration-300",
                    current ? "text-accent-indigo" : "text-faint/70",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
