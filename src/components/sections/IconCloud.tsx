"use client";

import { memo, useEffect, useMemo, useState, type MouseEvent } from "react";
import {
  Cloud,
  fetchSimpleIcons,
  renderSimpleIcon,
  type ICloud,
  type SimpleIcon,
} from "react-icon-cloud";

/** Simple Icons slugs (v14) — стек с лендинга, без инструментов, которых нет в наборе. */
export const STACK_ICON_SLUGS = [
  "python",
  "typescript",
  "javascript",
  "nodedotjs",
  "react",
  "nextdotjs",
  "html5",
  "css3",
  "tailwindcss",
  "fastapi",
  "flask",
  "docker",
  "nginx",
  "linux",
  "postgresql",
  "mysql",
  "sqlite",
  "redis",
  "pandas",
  "plotly",
  "jupyter",
  "selenium",
  "n8n",
  "celery",
  "gnubash",
  "git",
  "github",
  "google",
  "telegram",
  "discord",
  "chartdotjs",
];

const PORTRAIT_SRC = "/me-portrait.png";
const CARD_W = 500;
const CARD_H = 640;
const CARD_RADIUS = 108;
const PIXEL = 7;
const PAD = 56;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sdfRoundRect(x: number, y: number, w: number, h: number, r: number) {
  const dx = Math.abs(x - w / 2) - (w / 2 - r);
  const dy = Math.abs(y - h / 2) - (h / 2 - r);
  const ox = Math.max(dx, 0);
  const oy = Math.max(dy, 0);
  return Math.hypot(ox, oy) + Math.min(Math.max(dx, dy), 0) - r;
}

function pathRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function buildPortraitDataUrl(img: HTMLImageElement) {
  const photo = document.createElement("canvas");
  photo.width = CARD_W;
  photo.height = CARD_H;
  const pctx = photo.getContext("2d");
  if (!pctx) return null;

  const cover = Math.max(CARD_W / img.naturalWidth, CARD_H / img.naturalHeight);
  const dw = img.naturalWidth * cover;
  const dh = img.naturalHeight * cover;
  pctx.drawImage(img, (CARD_W - dw) / 2, (CARD_H - dh) / 2, dw, dh);
  const src = pctx.getImageData(0, 0, CARD_W, CARD_H);

  const out = document.createElement("canvas");
  out.width = CARD_W + PAD * 2;
  out.height = CARD_H + PAD * 2;
  const ctx = out.getContext("2d");
  if (!ctx) return null;

  const inset = 18;
  ctx.save();
  pathRoundRect(
    ctx,
    PAD + inset,
    PAD + inset,
    CARD_W - inset * 2,
    CARD_H - inset * 2,
    Math.max(8, CARD_RADIUS - inset)
  );
  ctx.clip();
  ctx.drawImage(photo, PAD, PAD);
  ctx.restore();

  ctx.imageSmoothingEnabled = false;
  const rnd = mulberry32(0xa11ce);
  const band = 62;

  const sample = (x: number, y: number) => {
    const sx = Math.min(CARD_W - 1, Math.max(0, Math.floor(x)));
    const sy = Math.min(CARD_H - 1, Math.max(0, Math.floor(y)));
    const i = (sy * CARD_W + sx) * 4;
    return src.data.subarray(i, i + 4);
  };

  const stamp = (x: number, y: number, size: number, alpha: number) => {
    const px = x + size / 2;
    const py = y + size / 2;
    if (px < 0 || py < 0 || px >= CARD_W || py >= CARD_H) return;
    const p = sample(px, py);
    ctx.fillStyle = `rgba(${p[0]},${p[1]},${p[2]},${(p[3] / 255) * alpha})`;
    ctx.fillRect(Math.round(x + PAD), Math.round(y + PAD), size, size);
  };

  for (let y = -PAD; y < CARD_H + PAD; y += PIXEL) {
    for (let x = -PAD; x < CARD_W + PAD; x += PIXEL) {
      const cx = x + PIXEL / 2;
      const cy = y + PIXEL / 2;
      const d = sdfRoundRect(cx, cy, CARD_W, CARD_H, CARD_RADIUS);
      const t = (d + inset) / band;
      if (t <= 0) continue;

      const nx = cx - CARD_W / 2;
      const ny = cy - CARD_H / 2;
      const len = Math.hypot(nx, ny) || 1;
      const ux = nx / len;
      const uy = ny / len;

      if (t < 1) {
        if (rnd() > 1 - t * t) continue;
        const scatter = t * t * 26;
        stamp(x + ux * scatter, y + uy * scatter, PIXEL, 1 - t * 0.4);
        if (rnd() > 0.55) {
          const extra = scatter + PIXEL * (1 + rnd() * 2);
          stamp(
            x + ux * extra + (rnd() - 0.5) * PIXEL,
            y + uy * extra + (rnd() - 0.5) * PIXEL,
            PIXEL - 2,
            0.7 - t * 0.35
          );
        }
        continue;
      }

      if (rnd() > 0.1) continue;
      const scatter = 28 + rnd() * 36;
      stamp(
        x + ux * scatter + (rnd() - 0.5) * 10,
        y + uy * scatter + (rnd() - 0.5) * 10,
        PIXEL - 2,
        0.35 + rnd() * 0.25
      );
    }
  }

  return out.toDataURL("image/png");
}

function makeCloudProps(centreImage: string): Omit<ICloud, "children"> {
  return {
    id: "hero-stack-cloud",
    containerProps: {
      className: "hero-icon-cloud flex w-full items-center justify-center",
    },
    canvasProps: {
      className: "h-auto w-full",
      style: { width: "100%", maxWidth: "none" },
    },
    options: {
      reverse: true,
      depth: 1,
      wheelZoom: false,
      pinchZoom: false,
      imageScale: 2,
      activeCursor: "default",
      tooltip: null,
      initial: [0.03, -0.03],
      clickToFront: 500,
      tooltipDelay: 0,
      outlineColour: "#0000",
      outlineMethod: "none",
      maxSpeed: 0.01,
      minSpeed: 0.003,
      dragControl: false,
      fadeIn: 500,
      shape: "sphere",
      noSelect: true,
      centreImage,
    },
  };
}

function renderCustomIcon(icon: SimpleIcon) {
  return renderSimpleIcon({
    icon: { ...icon, hex: "8a8783" },
    bgHex: "#08080a",
    fallbackHex: "#8a8783",
    minContrastRatio: 0,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
      },
    },
  });
}

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

const CloudCanvas = memo(function CloudCanvas({
  icons,
  centreImage,
}: {
  icons: ReturnType<typeof renderCustomIcon>[];
  centreImage: string;
}) {
  return <Cloud {...makeCloudProps(centreImage)}>{icons}</Cloud>;
});

export default function IconCloud() {
  const [data, setData] = useState<IconData | null>(null);
  const [centreImage, setCentreImage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.src = PORTRAIT_SRC;
    img.onload = () => {
      if (cancelled) return;
      const url = buildPortraitDataUrl(img);
      if (url) setCentreImage(url);
    };
    fetchSimpleIcons({ slugs: STACK_ICON_SLUGS }).then((result) => {
      if (!cancelled) setData(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon));
  }, [data]);

  if (!renderedIcons || !centreImage) {
    return <div className="aspect-square w-full" aria-hidden />;
  }

  return <CloudCanvas icons={renderedIcons} centreImage={centreImage} />;
}
