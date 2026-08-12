import { site } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = `${site.name} — ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "Executive Search · Austin, TX",
    title: "Hiring decisions compound.",
    lede: "Executive search and embedded recruiting. One point of contact, intake to signed offer.",
  });
}
