import { useCallback, useSyncExternalStore } from "react";
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

/** Плавный скролл к секции: через Lenis, с фолбэком на нативный smooth-scroll. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -88, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.6 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/** Один источник правды про reduced motion — используется всеми анимационными компонентами. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Устройство с точным указателем (мышь/трекпад) — критерий для кастомного курсора и tilt-эффектов. */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

/** Реактивный media query без setState-в-эффекте (SSR-безопасно, серверное значение — false). */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
