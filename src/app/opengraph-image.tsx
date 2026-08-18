import { ImageResponse } from "next/og";

export const alt = "Vladimir Chireev (v0ky) — Fullstack Automation Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(60% 55% at 78% 30%, #4a0e0e 0%, #150808 55%, #08080a 100%)",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", color: "#8a8783", fontSize: 26 }}>
          $ whoami — v0ky.dev
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, color: "#f2f1ef" }}>
            Vladimir Chireev
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#e8332a", marginTop: 12 }}>
            Fullstack Automation Engineer
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8a8783", marginTop: 22 }}>
            Bots · Scraping · Integrations · RPA · Dashboards
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6e6b67",
            fontSize: 22,
          }}
        >
          <span>{"// version 0 → production"}</span>
          <span style={{ color: "#e8332a" }}>@v0ky</span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 10,
            background: "#e8332a",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
