"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";

/** Сдвиги Osmo-слоёв: дальние едут быстрее, ближние почти стоят. */
export const PARALLAX_LAYER_SHIFTS = [
  { layer: "1", yPercent: 70 },
  { layer: "2", yPercent: 55 },
  { layer: "3", yPercent: 40 },
  { layer: "4", yPercent: 10 },
] as const;

type ParallaxScrollTrigger = {
  trigger?: gsap.DOMTarget;
  start?: string;
  end?: string | (() => string);
  pin?: boolean | gsap.DOMTarget;
  scrub?: number | boolean;
  invalidateOnRefresh?: boolean;
};

/** Добавляет tweens слоёв `[data-parallax-layer]` на существующий timeline. */
export function addParallaxLayerTweens(
  tl: gsap.core.Timeline,
  root: Element,
  position: gsap.Position = 0
) {
  for (const { layer, yPercent } of PARALLAX_LAYER_SHIFTS) {
    const targets = root.querySelectorAll(`[data-parallax-layer="${layer}"]`);
    if (!targets.length) continue;
    tl.to(targets, { yPercent, ease: "none" }, position);
  }
}

type ParallaxScrollingProps = {
  children: ReactNode;
  className?: string;
  scrollTrigger?: ParallaxScrollTrigger;
};

/**
 * Обёртка слоёв `data-parallax-layers` / `data-parallax-layer`.
 * Lenis уже живёт в SmoothScrollProvider — второй инстанс не создаём.
 */
export function ParallaxScrolling({
  children,
  className,
  scrollTrigger,
}: ParallaxScrollingProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const layersRoot = rootRef.current?.querySelector("[data-parallax-layers]");
      if (!layersRoot) return;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scrollTrigger?.trigger ?? layersRoot,
          start: scrollTrigger?.start ?? "0% 0%",
          end: scrollTrigger?.end ?? "100% 0%",
          pin: scrollTrigger?.pin ?? false,
          scrub: scrollTrigger?.scrub ?? 0,
          invalidateOnRefresh: scrollTrigger?.invalidateOnRefresh ?? true,
        },
      });

      addParallaxLayerTweens(tl, layersRoot, 0);
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
