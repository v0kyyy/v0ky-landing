"use client";

import { Wrench } from "lucide-react";
import SectionHeading, { SectionWatermark } from "@/components/ui/SectionHeading";
import Experience from "@/components/sections/Experience";
import Specializations from "@/components/sections/Specializations";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function HelpSection() {
  const { locale, t } = useI18n();

  return (
    <>
      <section id="experience" className="relative overflow-x-clip">
        <div className="relative mx-auto max-w-6xl px-6 pt-28 md:pt-40 lg:px-8">
          <SectionWatermark icon={Wrench} />
          <SectionHeading
            key={locale}
            index="02"
            label="career --log"
            title={t.experience.title}
            className="mb-6 md:mb-10"
          />
        </div>
        <Experience />
      </section>
      <Specializations />
    </>
  );
}
