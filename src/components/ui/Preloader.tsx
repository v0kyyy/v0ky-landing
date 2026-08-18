"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePreloader } from "@/components/providers/PreloaderProvider";
import { prefersReducedMotion } from "@/lib/scroll";

const NAME = "v0ky.dev";
const SESSION_KEY = "v0ky-preloader-seen";

/**
 * Прелоадер первой загрузки: счётчик 0→100%, посимвольная сборка v0ky.dev,
 * красная полоса прогресса и exit-шторка вверх. Показывается один раз за сессию.
 */
export default function Preloader() {
  const { finish } = usePreloader();

  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    const bar = barRef.current;
    const percent = percentRef.current;
    if (!root || !content || !bar || !percent) return;

    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen || prefersReducedMotion()) {
      finish();
      gsap.set(root, { display: "none" });
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const chars = content.querySelectorAll<HTMLElement>("[data-char]");
    const progress = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.documentElement.style.overflow = "";
        finish();
        gsap.set(root, { display: "none" });
      },
    });

    tl.to(progress, {
      value: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        percent.textContent = `${Math.round(progress.value).toString().padStart(3, "0")}%`;
        gsap.set(bar, { scaleX: progress.value / 100 });
      },
    })
      .from(
        chars,
        {
          yPercent: 120,
          opacity: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
        },
        0.15
      )
      .to(content, { yPercent: -40, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, ">-0.05")
      .to(
        root,
        { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "power4.inOut" },
        "<0.15"
      );

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
      aria-hidden
    >
      <div ref={contentRef} className="flex flex-col items-center gap-6">
        <div className="overflow-hidden">
          <div className="font-mono text-2xl tracking-[0.2em] text-fg md:text-4xl">
            {NAME.split("").map((char, i) => (
              <span key={i} data-char className="inline-block">
                {char === "0" ? <span className="text-accent">0</span> : char}
              </span>
            ))}
          </div>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-dim">
          version 0 → production
        </p>
      </div>

      <span
        ref={percentRef}
        className="absolute bottom-8 right-8 font-mono text-sm text-muted tabular-nums"
      >
        000%
      </span>

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-surface">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  );
}
