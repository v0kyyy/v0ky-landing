"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePreloader } from "@/components/providers/PreloaderProvider";
import { prefersReducedMotion } from "@/lib/scroll";
import { Bars } from "@/components/ui/bars";

const SESSION_KEY = "v0ky-preloader-seen";

/**
 * Прелоадер первой загрузки: волна Bars, затем шторка вверх.
 * Показывается один раз за сессию.
 */
export default function Preloader() {
  const { finish } = usePreloader();
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    if (!root || !content) return;

    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen || prefersReducedMotion()) {
      finish();
      gsap.set(root, { display: "none" });
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.documentElement.style.overflow = "";
        finish();
        gsap.set(root, { display: "none" });
      },
    });

    tl.from(content, { autoAlpha: 0, scale: 0.92, duration: 0.35, ease: "power2.out" })
      .to({}, { duration: 1.35 })
      .to(content, { autoAlpha: 0, scale: 0.88, duration: 0.3, ease: "power2.in" })
      .to(root, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "power4.inOut" }, "<0.1");

    return () => {
      document.documentElement.style.overflow = "";
      tl.kill();
    };
  }, [finish]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[400] flex items-center justify-center bg-bg"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div ref={contentRef}>
        <Bars className="h-12 w-12 text-accent md:h-16 md:w-16" bars={3} />
      </div>
    </div>
  );
}
