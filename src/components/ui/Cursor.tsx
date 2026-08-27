"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/scroll";

const INTERACTIVE =
  "a, button, [role='button'], [data-cursor], [data-magnetic], label, summary";
const TEXT_FIELD = "input, textarea, select, [contenteditable='true']";

/**
 * Десктоп: нативный курсор остаётся, рядом — маленькая точка без лага.
 * На ссылках и кнопках чуть увеличивается. На touch и при reduced motion — выкл.
 */
export default function Cursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const mark = markRef.current;
    if (!mark) return;

    gsap.set(mark, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 1 });

    const xTo = gsap.quickTo(mark, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(mark, "y", { duration: 0.12, ease: "power3.out" });

    let visible = false;
    let hover = false;
    let pressed = false;
    let typing = false;

    const apply = () => {
      if (typing) {
        gsap.to(mark, { autoAlpha: 0, duration: 0.12, overwrite: "auto" });
        return;
      }
      const scale = (hover ? 2.35 : 1) * (pressed ? 0.8 : 1);
      gsap.to(mark, {
        autoAlpha: visible ? (hover ? 0.95 : 0.7) : 0,
        scale,
        backgroundColor: hover ? "rgba(232,51,42,0.18)" : "rgba(242,241,239,0.22)",
        borderColor: hover ? "rgba(232,51,42,0.85)" : "rgba(242,241,239,0.45)",
        duration: 0.2,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        apply();
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const readTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;
      typing = Boolean(target.closest(TEXT_FIELD));
      hover = !typing && Boolean(target.closest(INTERACTIVE));
      apply();
    };

    const onDown = () => {
      pressed = true;
      apply();
    };
    const onUp = () => {
      pressed = false;
      apply();
    };
    const onLeave = () => {
      visible = false;
      hover = false;
      pressed = false;
      apply();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", readTarget, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", readTarget);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(mark);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[300]">
      <div
        ref={markRef}
        className="invisible fixed left-0 top-0 size-2.5 rounded-full border opacity-0"
        style={{
          borderColor: "rgba(242,241,239,0.45)",
          backgroundColor: "rgba(242,241,239,0.22)",
        }}
      />
    </div>
  );
}
