import { site } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = `For Companies — ${site.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "For Companies",
    title: "The seat is open. The clock is running.",
    lede: "Retained executive search and embedded recruiting. Full market maps, calibrated shortlists.",
  });
}
