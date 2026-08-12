"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import { EASE } from "@/components/motion/reveal";

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // Close the sheet on navigation.
  React.useEffect(() => setOpen(false), [pathname]);

  // Lock the page behind the sheet without letting the layout shift.
  React.useEffect(() => {
    if (!open) return;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  // Escape closes.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-pill focus-visible:bg-raised focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-apple",
            scrolled
              ? "border-b border-line bg-bg/70 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-bg/60"
              : "border-b border-transparent bg-transparent",
          )}
        >
          <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
            <Wordmark />

            {/* Desktop */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 lg:flex"
            >
              {nav.map((linkItem) => (
                <Link
                  key={linkItem.href}
                  href={linkItem.href}
                  aria-current={isActive(linkItem.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-pill px-3.5 py-2 text-[0.875rem] transition-colors duration-300",
                    isActive(linkItem.href)
                      ? "text-ink"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {isActive(linkItem.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-pill bg-raised/80"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  {linkItem.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle className="hidden sm:inline-flex" />
              {/* Full label from lg up, shortened where the bar gets tight —
                  same destination, so the CTA never wraps or truncates. */}
              <Button
                href={site.bookCall}
                size="sm"
                className="hidden sm:inline-flex"
              >
                <span className="hidden lg:inline">Book a Discovery Call</span>
                <span className="lg:hidden">Book a call</span>
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
              </Button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid h-10 w-10 place-items-center rounded-pill border border-line bg-surface/70 text-ink backdrop-blur-md lg:hidden"
              >
                {open ? (
                  <X className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.9} />
                ) : (
                  <Menu className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.9} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile sheet — a vertical stack, full width, scrollable if it ever
          needs to be. No off-canvas horizontal movement of the page itself. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="fixed inset-0 z-40 overflow-y-auto bg-bg/92 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell flex min-h-full flex-col pb-10 pt-24">
              <nav aria-label="Mobile" className="flex flex-col">
                {nav.map((linkItem, i) => (
                  <motion.div
                    key={linkItem.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.06 + i * 0.05,
                      ease: EASE,
                    }}
                  >
                    <Link
                      href={linkItem.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-center justify-between border-b border-line py-5 text-[1.75rem] text-ink"
                    >
                      {linkItem.label}
                      <ArrowUpRight
                        className="h-5 w-5 text-faint"
                        strokeWidth={1.6}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.06 + nav.length * 0.05,
                  ease: EASE,
                }}
                className="mt-auto flex flex-col gap-5 pt-10"
              >
                <Button href={site.bookCall} size="lg" className="w-full">
                  Book a Discovery Call
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                </Button>
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Theme</span>
                  <ThemeToggle />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
