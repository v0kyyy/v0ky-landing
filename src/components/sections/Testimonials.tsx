"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function Testimonials() {
  const { locale, t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [constraint, setConstraint] = useState(0);

  // границы drag-карусели: пересчитываются на resize
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;
      setConstraint(Math.max(0, track.scrollWidth - wrap.offsetWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [locale]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = trackRef.current?.children;
      if (!cards?.length) return;
      gsap.from(cards, {
        x: 90,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: wrapRef.current, start: "top 78%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative mx-auto max-w-6xl px-6 py-28 md:py-40 lg:px-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading key={locale} index="04" label="reviews --from-clients" title={t.testimonials.title} className="mb-0" />
        <p className="mb-2 hidden font-mono text-[11px] uppercase tracking-[0.3em] text-dim md:block">
          {t.testimonials.dragHint}
        </p>
      </div>

      <div ref={wrapRef} className="mt-14 overflow-hidden md:mt-20" data-cursor-text={t.testimonials.dragCursor}>
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -constraint, right: 0 }}
          dragElastic={0.08}
          className="flex cursor-grab gap-5 active:cursor-grabbing"
        >
          {testimonials.map(({ id, name, role, text, initials }) => (
            <article
              key={id}
              className="flex w-[320px] shrink-0 select-none flex-col rounded-2xl border border-line bg-surface-deep p-7 transition-colors duration-300 hover:border-accent/35 md:w-[400px] md:p-8"
            >
              <div className="flex gap-1" aria-label={t.testimonials.ratingAria}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="mt-5 flex-1 text-[15px] leading-relaxed text-fg/85">
                &laquo;{text[locale]}&raquo;
              </p>
              <div className="mt-7 flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-surface font-mono text-xs text-accent">
                  {initials[locale]}
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">{name[locale]}</p>
                  <p className="mt-0.5 text-xs leading-snug text-muted">{role[locale]}</p>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
