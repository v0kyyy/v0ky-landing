"use client";

import TestimonialMarquee from "@/components/ui/marquee-01";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function ReviewsFeed() {
  const { t } = useI18n();

  return (
    <section aria-label={t.testimonials.title} className="relative z-10 overflow-hidden py-[calc(7rem/1.5)] md:py-[calc(10rem/1.5)]">
      <TestimonialMarquee />
      <p className="mx-auto mt-4 max-w-6xl px-6 text-right font-mono text-[11px] uppercase tracking-[0.22em] text-dim lg:px-8">
        {t.testimonials.fromKwork}
      </p>
    </section>
  );
}
