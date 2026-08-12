import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const GRADIENT = "linear-gradient(135deg, #b487fc, #87abf9 52%, #31f2f1)";

/**
 * Shared Open Graph card renderer. Every route passes its own eyebrow/title/lede
 * so social previews are page-specific rather than one generic image.
 * Uses only system-safe layout (flex, no grid) as required by Satori.
 */
export function renderOgImage({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080b",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(124,58,237,0.55), rgba(124,58,237,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -140,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(37,99,235,0.5), rgba(8,145,178,0) 72%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 9999,
              background: GRADIENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9999,
                background: "#08080b",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#f4f4f8",
              letterSpacing: "-0.02em",
              fontWeight: 600,
            }}
          >
            Taylor Talent Partners
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#87abf9",
              display: "flex",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 34 ? 66 : 82,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: "#f4f4f8",
              fontWeight: 600,
              maxWidth: 960,
              display: "flex",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: "#9e9eb0",
              maxWidth: 900,
              display: "flex",
            }}
          >
            {lede}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 8,
            background: GRADIENT,
          }}
        />
      </div>
    ),
    OG_SIZE,
  );
}
