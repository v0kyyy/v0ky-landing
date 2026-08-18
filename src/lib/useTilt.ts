"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/scroll";

/** 3D-tilt по курсору через perspective + rotateX/rotateY. Отключён на touch и при reduced motion. */
export function useTilt<T extends HTMLElement = HTMLDivElement>(maxDeg = 7, enabled = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled || !hasFinePointer() || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      rx(-relY * maxDeg * 2);
      ry(relX * maxDeg * 2);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { rotationX: 0, rotationY: 0 });
    };
  }, [maxDeg, enabled]);

  return ref;
}
