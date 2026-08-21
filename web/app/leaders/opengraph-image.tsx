import { site } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = `For Leaders | ${site.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "For Senior Leaders",
    title: "Have the conversation before you need it.",
    lede: "A confidential, standing relationship. Curated mandates, never mass outreach.",
  });
}
