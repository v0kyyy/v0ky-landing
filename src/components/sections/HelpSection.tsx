"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import EngagementToggle, { type EngagementMode } from "@/components/ui/EngagementToggle";
import ResumeCta from "@/components/ui/ResumeCta";
import KworkJourney from "@/components/sections/KworkJourney";
import Experience from "@/components/sections/Experience";
import Specializations from "@/components/sections/Specializations";
import { useI18n } from "@/components/providers/LocaleProvider";

export default function HelpSection() {
  const { locale, t } = useI18n();
  const [mode, setMode] = useState<EngagementMode>("project");

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [mode]);

  return (
    <section id="experience" className="relative">
      <div className="mx-auto max-w-6xl px-6 pt-28 md:pt-40 lg:px-8">
        <SectionHeading
          key={locale}
          index="02"
          label="career --log"
          title={t.experience.title}
          className="mb-6 md:mb-10"
          action={<EngagementToggle value={mode} onChange={setMode} />}
        />
      </div>

      {mode === "project" ? (
        <>
          <KworkJourney />
          <Specializations />
        </>
      ) : (
        <>
          <Experience embedded />
          <ResumeCta />
        </>
      )}
    </section>
  );
}
