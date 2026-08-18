"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { prefersReducedMotion, scrollToSection, useMediaQuery } from "@/lib/scroll";
import { usePreloader } from "@/components/providers/PreloaderProvider";
import Magnetic from "@/components/ui/Magnetic";
import SocialLinks from "@/components/ui/SocialLinks";
import { useI18n } from "@/components/providers/LocaleProvider";

/** Статичный фолбэк сцены: градиентная чёрно-бордовая подложка (мобильные, reduced motion, загрузка). */
function HeroBackdrop() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(55% 45% at 72% 38%, rgba(74,14,14,0.6), transparent 72%)," +
          "radial-gradient(35% 30% at 68% 42%, rgba(232,51,42,0.14), transparent 70%)," +
          "radial-gradient(45% 40% at 25% 75%, rgba(42,8,8,0.5), transparent 75%)",
      }}
    />
  );
}

// Сфера иконок — TagCanvas + guid() ломают SSR, грузим только на клиенте
const IconCloud = dynamic(() => import("./IconCloud"), {
  ssr: false,
  loading: () => <div className="aspect-square w-full" aria-hidden />,
});

export default function Hero() {
  const { locale, t } = useI18n();
  const { done } = usePreloader();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enable3d = isDesktop && !reducedMotion;

  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  // Intro-хореография после прелоадера: посимвольный подъём имени с blur→sharp
  useGSAP(
    () => {
      if (!done || prefersReducedMotion()) return;
      const name = nameRef.current;
      if (!name) return;

      const split = new SplitText(name, { type: "chars,words", mask: "chars" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(termRef.current, { autoAlpha: 0, y: 12, duration: 0.45 })
        .from(
          split.chars,
          {
            yPercent: 118,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.9,
            stagger: 0.035,
          },
          0.12
        )
        .from(brandRef.current, { autoAlpha: 0, x: -14, duration: 0.5 }, "-=0.55")
        .from(roleRef.current, { autoAlpha: 0, y: 26, duration: 0.7 }, "-=0.45")
        .from(ctaRef.current, { autoAlpha: 0, y: 20, duration: 0.55 }, "-=0.3")
        .from(hintRef.current, { autoAlpha: 0, duration: 0.6 }, "-=0.35")
        .from(watermarkRef.current, { autoAlpha: 0, duration: 0.6 }, "<");

      if (cloudRef.current) {
        tl.from(cloudRef.current, { autoAlpha: 0, scale: 0.92, duration: 0.9 }, 0.28);
      }

      return () => {
        split.revert();
      };
    },
    { dependencies: [done], scope: sectionRef }
  );

  // Пиннинг hero: секция не уезжает, а трансформируется — контент уходит вглубь.
  // Только desktop + no-reduced-motion.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=80%",
            pin: true,
            scrub: 0.6,
          },
        });
        tl.to(innerRef.current, { yPercent: -14, scale: 0.93, autoAlpha: 0.3 }, 0).to(
          [hintRef.current, watermarkRef.current],
          { autoAlpha: 0 },
          0
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden>
        <HeroBackdrop />
        {/* виньетка + плавный переход в следующую секцию */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgba(8,8,10,0.85)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div
        ref={innerRef}
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-14 px-6 pb-28 pt-36 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:px-8"
      >
        {/* ---- Левая колонка ---- */}
        <div>
          <p ref={termRef} className="mb-7 font-mono text-sm text-muted">
            <span className="text-accent">$</span> whoami
            <span className="ml-2 inline-block h-4 w-2 translate-y-[2px] animate-blink bg-accent align-baseline" />
          </p>

          <h1
            key={locale}
            ref={nameRef}
            className="font-display text-[clamp(2.25rem,6.4vw,5.2rem)] font-bold leading-[1.02] tracking-tight text-fg"
          >
            <span className="block whitespace-nowrap">{t.hero.firstName}</span>
            <span className="block whitespace-nowrap">{t.hero.lastName}</span>
          </h1>

          <p ref={brandRef} className="mt-4 font-mono text-sm text-dim">
            <span className="text-accent">{"//"}</span> @v0ky — version 0 → production
          </p>

          <div ref={roleRef} className="mt-8">
            <h2 className="text-xl font-semibold text-fg md:text-2xl">
              {t.hero.role}
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
              {t.hero.paragraph}
            </p>
          </div>

          {/* CTA + соцсети */}
          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-5">
            <Magnetic strength={0.3}>
              <button
                onClick={() => scrollToSection("contact")}
                className="btn-fill rounded-full border border-line-strong px-8 py-3.5 font-mono text-sm font-medium uppercase tracking-wider text-fg"
              >
                {t.hero.cta}
              </button>
            </Magnetic>
            <div className="flex items-center gap-3">
              <SocialLinks iconSize={17} />
            </div>
          </div>
        </div>

        {/* ---- Правая колонка: сфера стека с портретом в центре
             (на reduced motion — статичное фото) ---- */}
        <div className="relative hidden md:block md:justify-self-end">
          {enable3d && (
            <div
              ref={cloudRef}
              className="relative aspect-square w-full"
            >
              <div
                className="pointer-events-none absolute inset-[14%] rounded-full bg-[radial-gradient(circle_at_center,rgba(232,51,42,0.26),rgba(74,14,14,0.16)_42%,transparent_72%)] blur-3xl"
                aria-hidden
              />
              <IconCloud />
            </div>
          )}
          {isDesktop && !enable3d && (
            <div className="relative w-64 overflow-hidden rounded-2xl border border-line bg-surface lg:w-80">
              <Image
                src="/me.jpg"
                alt={t.hero.photoAlt}
                width={568}
                height={766}
                priority
                className="aspect-[3/4] h-auto w-full object-cover"
              />
              <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-accent" aria-hidden />
              <span className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-accent" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-bg/90 to-transparent px-4 pb-3 pt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                <span>v0ky.dev</span>
                <span className="text-accent">[REC]</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Индикатор скролла */}
      <div
        ref={hintRef}
        className="absolute bottom-8 left-8 z-10 hidden flex-col items-center gap-3 md:flex"
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-dim"
          style={{ writingMode: "vertical-rl" }}
        >
          {t.hero.scroll}
        </span>
        <span className="scroll-hint-line h-16 w-px bg-line-strong" />
      </div>

      {/* Вертикальный водяной знак */}
      <div
        ref={watermarkRef}
        className="pointer-events-none absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
      >
        <span
          className="font-mono text-[11px] uppercase tracking-[0.5em] text-dim/50"
          style={{ writingMode: "vertical-rl" }}
        >
          {t.hero.watermark}
        </span>
      </div>
    </section>
  );
}
