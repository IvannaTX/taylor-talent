"use client";

import * as React from "react";
import Script from "next/script";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

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

  const initializeWidget = React.useCallback(() => {
    const parentElement = widgetRef.current;

    if (
      !parentElement ||
      parentElement.querySelector("iframe") ||
      !window.Calendly
    ) {
      return;
    }

    window.Calendly.initInlineWidget({
      url: CALENDLY_EMBED_URL,
      parentElement,
    });
  }, []);

  // Handles client-side navigation after Calendly's script has already loaded.
  React.useEffect(() => {
    initializeWidget();
  }, [initializeWidget]);

  return (
    <div className={cn("artifact min-w-0 overflow-hidden", className)}>
      <div
        ref={widgetRef}
        className="calendly-inline-widget h-[700px] w-full min-w-0"
        data-url={CALENDLY_EMBED_URL}
        aria-label="Schedule a discovery call with Jarod Taylor"
      />
      <Script
        id="calendly-inline-widget-script"
        src={CALENDLY_WIDGET_SCRIPT}
        strategy="afterInteractive"
        onReady={initializeWidget}
      />
    </div>
  );
}
