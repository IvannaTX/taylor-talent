import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Public marketing content stays open to every crawler, search and AI alike —
 * no per-agent allowlist, because a blanket allow already covers them and
 * naming individual bots only creates a list that goes stale.
 *
 * The one exclusion is /archive, a superseded snapshot of the previous site. It
 * duplicates live copy and states the old positioning, so leaving it indexable
 * would put two conflicting descriptions of the same firm into the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/archive/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
