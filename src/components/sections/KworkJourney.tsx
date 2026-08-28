"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import { useI18n } from "@/components/providers/LocaleProvider";
import KworkMention from "@/components/ui/KworkMention";
import { kworkExperience, kworkFinal } from "@/data/kwork";

export default function KworkJourney() {
  const { locale, t, ready } = useI18n();
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const years = kworkExperience.years;
  const lastIndex = years.length - 1;

  useGSAP(
    () => {
      const line = lineRef.current;
      const wrap = wrapRef.current;
      if (!ready || !line || !wrap) return;

      const dots = wrap.querySelectorAll<HTMLElement>("[data-xp-dot]");

      if (prefersReducedMotion()) {
        gsap.set(line, { strokeDashoffset: 0 });
        dots.forEach((dot) =>
          gsap.set(dot, { backgroundColor: "#e8332a", borderColor: "#e8332a" })
        );
        return;
      }

      gsap.fromTo(
        line,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 72%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );

      wrap.querySelectorAll<HTMLElement>("[data-xp-item]").forEach((item) => {
        gsap.fromTo(
          item,
          { x: 16, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: { trigger: item, start: "top 78%", once: true },
          }
        );

        const dot = item.querySelector<HTMLElement>("[data-xp-dot]");
        if (!dot) return;
        ScrollTrigger.create({
          trigger: item,
          start: "top 62%",
          onEnter: () =>
            gsap.to(dot, {
              backgroundColor: "#e8332a",
              borderColor: "#e8332a",
              scale: 1.3,
              boxShadow: "0 0 18px rgba(232,51,42,0.55)",
              duration: 0.4,
            }),
          onLeaveBack: () =>
            gsap.to(dot, {
              backgroundColor: "#08080a",
              borderColor: "#6e6b67",
              scale: 1,
              boxShadow: "0 0 0 rgba(232,51,42,0)",
              duration: 0.4,
            }),
        });
      });
    },
    { scope: wrapRef, dependencies: [ready] }
  );

  return (
    <div ref={wrapRef} className="relative mx-auto max-w-6xl overflow-x-clip px-6 pb-8 pt-2 md:px-8 md:pb-12">
      <p className="mb-10 max-w-xl text-sm leading-relaxed text-muted md:mb-12 md:text-base">
        <KworkMention />
      </p>

      <div className="relative pl-8 md:pl-16">
        <svg
          className="absolute left-2 top-0 h-full w-[2px] md:left-6"
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <line
            ref={lineRef}
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="#e8332a"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
          />
        </svg>

        {years.map((entry, index) => {
          const isFinal = index === lastIndex;

          return (
            <article
              key={entry.year}
              data-xp-item
              className="relative mb-12 rounded-2xl border border-line bg-surface-deep p-6 transition-colors duration-300 last:mb-0 hover:border-accent/40 md:p-9"
            >
              <span
                data-xp-dot
                className="absolute -left-[29px] top-8 block h-3 w-3 rounded-full border-2 md:-left-[45px] md:top-10"
                style={{ backgroundColor: "#08080a", borderColor: "#6e6b67" }}
                aria-hidden
              />

              <h3
                className={`font-display text-2xl font-semibold md:text-3xl ${
                  isFinal ? "text-accent" : "text-fg"
                }`}
              >
                {entry.year}
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Stat value={entry.newProjects} label={t.help.newProjects} />
                <Stat value={entry.newReviews} label={t.help.newReviews} />
              </div>

              {entry.newSkills[locale].length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                    {t.help.newSkills}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entry.newSkills[locale].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.22em] text-dim md:mt-14">
        {kworkFinal.projects} {t.help.projects}
        <span className="mx-3 text-line-strong">·</span>
        {kworkFinal.reviews} {t.help.reviews}
        <span className="mx-3 text-line-strong">·</span>
        {kworkFinal.skills}+ {t.help.skills}
      </p>
      <p className="mt-3 text-center font-mono text-xs uppercase tracking-[0.22em] text-dim">
        {t.help.kworkGrowing}
      </p>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-3">
      <p className="font-display text-2xl font-semibold tabular-nums text-fg">
        +{value}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
        {label}
      </p>
    </div>
  );
}
