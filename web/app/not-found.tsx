import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] items-center py-section">
      <div className="shell">
        <span className="eyebrow">Error 404</span>
        <h1 className="mt-4 max-w-[24ch] text-display-md font-semibold text-ink">
          That page has <span className="grad-text">moved on.</span>
        </h1>
        <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
          The link is broken or the page no longer exists. The main entry points
          are below.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg" className="w-full sm:w-auto">
            Back to home
          </Button>
          <Button
            href="/companies"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            For Companies
          </Button>
          <Button
            href="/leaders"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            For Leaders
          </Button>
        </div>
      </div>
    </section>
  );
}
