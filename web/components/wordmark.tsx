import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official TTP monogram from the original Astro brand assets.
 */
export function Wordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-pill outline-none",
        className,
      )}
      aria-label="Taylor Talent — home"
    >
      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-black">
        <Image src="/brand/ttp-logo.png" alt="" fill sizes="36px" className="object-cover" priority />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.9375rem] font-semibold tracking-[-0.02em] text-ink">
          Taylor Talent
        </span>
        <span className="mt-[0.2rem] font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-faint">
          Partners
        </span>
      </span>
    </Link>
  );
}
