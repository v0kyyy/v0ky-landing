"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/scroll";

/**
 * Кастомный курсор: точка + кольцо с lerp-задержкой.
 * Магнитное увеличение на интерактивных элементах, текстовая подсказка
 * через data-cursor-text. На touch-устройствах не рендерится вовсе.
 */
export default function Cursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.06, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.06, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3.out" });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const setState = (state: "default" | "hover" | "label", text = "") => {
      label.textContent = text;
      if (state === "label") {
        gsap.to(ring, {
          scale: 2.6,
          backgroundColor: "rgba(232,51,42,0.95)",
          borderColor: "rgba(232,51,42,1)",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(label, { autoAlpha: 1, duration: 0.2 });
        gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
      } else if (state === "hover") {
        gsap.to(ring, {
          scale: 1.7,
          backgroundColor: "rgba(232,51,42,0.1)",
          borderColor: "rgba(232,51,42,0.9)",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(label, { autoAlpha: 0, duration: 0.15 });
        gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(232,51,42,0)",
          borderColor: "rgba(242,241,239,0.35)",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(label, { autoAlpha: 0, duration: 0.15 });
        gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;
      const labelled = target.closest<HTMLElement>("[data-cursor-text]");
      if (labelled) {
        setState("label", labelled.dataset.cursorText ?? "");
        return;
      }
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      );
      setState(interactive ? "hover" : "default");
    };

    const onDown = () => gsap.to(ring, { scale: "-=0.25", duration: 0.15 });
    const onUp = () => gsap.to(ring, { scale: "+=0.25", duration: 0.2 });
    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[300]">
      <div
        ref={ringRef}
        className="invisible fixed left-0 top-0 -ml-[22px] -mt-[22px] flex h-11 w-11 items-center justify-center rounded-full border opacity-0"
        style={{ borderColor: "rgba(242,241,239,0.35)" }}
      >
        <span
          ref={labelRef}
          className="invisible font-mono text-[9px] font-semibold uppercase tracking-wider text-bg opacity-0"
        />
      </div>
      <div
        ref={dotRef}
        className="invisible fixed left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent opacity-0"
      />
    </div>
  );
}
