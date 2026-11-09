"use client";

import * as React from "react";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CALENDLY_WIDGET_SCRIPT =
  "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_EMBED_URL = `${site.bookCall}?background_color=1a1a1a&text_color=ffffff`;

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget(options: {
        url: string;
        parentElement: HTMLElement;
      }): void;
    };
  }
}

/** The real Calendly booking flow, embedded inside the existing finale panel. */
export function SchedulerArtifact({ className }: { className?: string }) {
  const widgetRef = React.useRef<HTMLDivElement>(null);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">(
    "loading",
  );

  const initializeWidget = React.useCallback(() => {
    const parentElement = widgetRef.current;

    if (
      !parentElement ||
      parentElement.querySelector("iframe") ||
      !window.Calendly
    ) {
      return;
    }

    try {
      window.Calendly.initInlineWidget({
        url: CALENDLY_EMBED_URL,
        parentElement,
      });
    } catch {
      setStatus("error");
    }
  }, []);

  // Handles client-side navigation after Calendly's script has already loaded.
  React.useEffect(() => {
    initializeWidget();
  }, [initializeWidget]);

  // Calendly injects the iframe after its external script initializes. Watch
  // for that concrete success signal and keep a direct booking path visible if
  // the script is blocked, times out, or throws.
  React.useEffect(() => {
    const parentElement = widgetRef.current;
    if (!parentElement) return;

    const markReady = () => {
      if (parentElement.querySelector("iframe")) setStatus("ready");
    };

    markReady();
    const observer = new MutationObserver(markReady);
    observer.observe(parentElement, { childList: true, subtree: true });

    const timeout = window.setTimeout(() => {
      setStatus((current) => (current === "ready" ? current : "error"));
    }, 8000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={cn("artifact min-w-0 overflow-hidden", className)}>
      <div
        ref={widgetRef}
        className="calendly-inline-widget h-[700px] w-full min-w-0"
        data-url={CALENDLY_EMBED_URL}
        aria-label="Schedule a discovery call with Jarod Taylor"
      />
      {status !== "ready" && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-0 grid place-items-center bg-surface px-6 text-center"
        >
          <div className="max-w-sm">
            <p className="eyebrow">
              {status === "loading"
                ? "Loading the booking calendar"
                : "Calendar unavailable"}
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
              {status === "loading"
                ? "The scheduler should appear here in a moment. You can also open it directly."
                : "The embedded scheduler could not load. Open Calendly directly to choose a time."}
            </p>
            <Button href={site.bookCall} className="mt-6">
              Open Calendly directly
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </Button>
          </div>
        </div>
      )}
      <Script
        id="calendly-inline-widget-script"
        src={CALENDLY_WIDGET_SCRIPT}
        strategy="afterInteractive"
        onReady={initializeWidget}
        onError={() => setStatus("error")}
      />
    </div>
  );
}
