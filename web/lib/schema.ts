import { site } from "@/lib/site";

/**
 * BreadcrumbList for an interior page. Two levels is the real depth of this
 * site — inventing a deeper trail would describe an architecture that does not
 * exist.
 */
export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${site.url}${path}`,
      },
    ],
  };
}

/** Serialisable <script> payload for a JSON-LD block. */
export function jsonLdProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  } as const;
}
