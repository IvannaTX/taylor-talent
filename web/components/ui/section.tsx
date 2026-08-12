import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal, TextReveal } from "@/components/motion/reveal";

export function Section({
  id,
  children,
  className,
  bleed = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Skip the shell so the child can run edge-to-edge. */
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      // scroll-mt clears the fixed header for in-page anchors.
      className={cn("relative scroll-mt-24 py-section", className)}
    >
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}

/**
 * Section header. The eyebrow and lede fade in; the title reveals word by word.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <Reveal delay={0.02} blur={false}>
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-1 w-1 rounded-full bg-ring-gradient"
            />
            <span className="eyebrow">{eyebrow}</span>
          </div>
        </Reveal>
      )}

      <TextReveal
        as={as}
        text={title}
        delay={0.06}
        className={cn(
          "mt-4 max-w-[22ch] text-display-sm font-semibold text-ink sm:max-w-[28ch]",
          centered && "mx-auto",
        )}
      />

      {lede && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-muted sm:text-lg",
              centered && "mx-auto",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Small monospace index label used across cards and steps. */
export function Index({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-faint">
      {children}
    </span>
  );
}
