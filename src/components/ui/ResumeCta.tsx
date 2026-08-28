"use client";

import { Download } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/data/site";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function ResumeCta() {
  const { locale, t } = useI18n();

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 text-center md:py-32 lg:px-8">
      <p className="mb-8 font-mono text-xs uppercase tracking-[0.28em] text-dim">
        {t.help.resumeLead}
      </p>
      <Magnetic strength={0.28}>
        <a
          href={site.links.resume[locale]}
          download={locale === "ru" ? "Vladimir-Kireev-CV.pdf" : "Vladimir-Chireev-CV.pdf"}
          className="btn-fill inline-flex max-w-full items-center gap-3 rounded-full border border-line-strong px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-fg sm:px-12 sm:py-5 sm:text-sm sm:tracking-[0.2em] md:px-16 md:text-base"
        >
          <Download size={18} strokeWidth={1.75} />
          {t.help.resumeCta}
        </a>
      </Magnetic>
    </section>
  );
}
