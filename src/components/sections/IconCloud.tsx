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

const cloudProps: Omit<ICloud, "children"> = {
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
    centreImage: "/me-portrait.png",
  },
};

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
}: {
  icons: ReturnType<typeof renderCustomIcon>[];
}) {
  return <Cloud {...cloudProps}>{icons}</Cloud>;
});

export default function IconCloud() {
  const [data, setData] = useState<IconData | null>(null);

  useEffect(() => {
    let cancelled = false;
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

  if (!renderedIcons) {
    return <div className="aspect-square w-full" aria-hidden />;
  }

  return <CloudCanvas icons={renderedIcons} />;
}
