"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Layers, Plus, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import { useTilt } from "@/lib/useTilt";
import SectionHeading, { SectionWatermark } from "@/components/ui/SectionHeading";
import {
  specializations,
  type Specialization,
} from "@/data/specializations";
import { useI18n } from "@/components/providers/LocaleProvider";

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.45, ease: [0.65, 0, 0.35, 1] as const },
  }),
};

function SpecCover({ src }: { src: string }) {
  return (
    <div className="spec-cover" aria-hidden>
      <div className="spec-cover-media spec-cover-soft">
        <Image src={src} alt="" fill sizes="320px" className="object-cover object-[center_12%]" />
      </div>
      <div className="spec-cover-media spec-cover-sharp">
        <Image src={src} alt="" fill sizes="320px" className="object-cover object-[center_12%]" />
      </div>
      <div className="spec-cover-fade" />
    </div>
  );
}

function SpecCard({
  spec,
  expanded,
  dimmed,
  onToggle,
}: {
  spec: Specialization;
  expanded: boolean;
  dimmed: boolean;
  onToggle: () => void;
}) {
  const { locale, t } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useTilt<HTMLDivElement>(3, !expanded);
  const [shot, setShot] = useState<{ src: string; alt: string } | null>(null);
  const cover = spec.projects.find((project) => project.image)?.image;

  useEffect(() => {
    if (!expanded) return;
    const el = cardRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      window.__lenis?.scrollTo(el, { offset: -96, duration: 0.9 });
    }, 150);
    return () => clearTimeout(timer);
  }, [expanded]);

  useEffect(() => {
    if (!expanded && !shot) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (shot) {
        setShot(null);
        return;
      }
      onToggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, onToggle, shot]);

  return (
    <motion.div
      ref={cardRef}
      layout
      transition={{ layout: { duration: 0.55, ease: [0.65, 0, 0.35, 1] } }}
      className={`group relative h-full overflow-hidden rounded-2xl border bg-surface-deep transition-[opacity,filter,border-color] duration-500 ${
        expanded
          ? "z-10 border-accent/40"
          : dimmed
            ? "border-line opacity-30 blur-[1.5px]"
            : "border-line hover:border-accent/40"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />

      <AnimatePresence mode="wait" initial={false}>
        {!expanded ? (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onToggle}
            aria-expanded={false}
            className="block h-full w-full text-left"
          >
            <div ref={tiltRef} className="relative flex h-full min-h-[280px] flex-col p-7 will-change-transform">
              {cover ? <SpecCover src={cover} /> : null}
              <span className="relative font-mono text-sm text-accent">{spec.num}</span>
              <h3 className="relative mt-5 max-w-[16ch] font-display text-lg font-semibold leading-snug text-fg">
                {spec.title[locale]}
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">{spec.short[locale]}</p>
              <span className="relative mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-dim transition-colors duration-300 group-hover:text-accent">
                <Plus size={13} /> {t.specs.more}
              </span>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-7 md:p-10"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <spec.icon size={18} strokeWidth={1.75} className="text-accent" aria-hidden />
                  <span className="font-mono text-sm text-accent">{spec.num}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-fg md:text-2xl">
                  {spec.title[locale]}
                </h3>
              </div>
              <button
                onClick={onToggle}
                aria-label={t.specs.collapse}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <X size={16} />
              </button>
            </div>

            <motion.p
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-3xl leading-relaxed text-fg/85"
            >
              {spec.long[locale]}
            </motion.p>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {spec.projects.map((project, i) => (
                <motion.div
                  key={project.name.en}
                  custom={i + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface"
                >
                  {project.image ? (
                    <button
                      type="button"
                      onClick={() =>
                        setShot({ src: project.image!, alt: project.name[locale] })
                      }
                      className="relative aspect-[16/10] w-full overflow-hidden bg-black text-left"
                    >
                      <Image
                        src={project.image}
                        alt={project.name[locale]}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                        className="object-cover object-[center_12%]"
                      />
                    </button>
                  ) : (
                    <div
                      className={`relative h-52 ${project.pattern}`}
                      style={{
                        background:
                          "radial-gradient(80% 120% at 80% 0%, rgba(74,14,14,0.55), rgba(8,8,10,0.9))",
                      }}
                      aria-hidden
                    >
                      <div className={`absolute inset-0 ${project.pattern}`} />
                      <span className="absolute bottom-2 right-3 font-mono text-[9px] uppercase tracking-[0.25em] text-dim">
                        case_{spec.num}.{i + 1}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold leading-snug text-fg">
                        {project.name[locale]}
                      </h4>
                      {project.demo ? (
                        <span className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                          {t.specs.demo}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted">
                      {project.description[locale]}
                    </p>
                    <p className="mt-3 text-[12px] leading-snug text-fg/90">
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
                        {t.specs.result}
                      </span>
                      <span className="mt-1 block">{project.result[locale]}</span>
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-dim"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {shot
        ? createPortal(
            <div
              className="fixed inset-0 z-[220] flex items-center justify-center bg-black/80 p-4 md:p-10"
              onClick={() => setShot(null)}
              role="dialog"
              aria-modal="true"
              aria-label={t.specs.closeShot}
            >
              <button
                type="button"
                onClick={() => setShot(null)}
                aria-label={t.specs.closeShot}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-deep text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <X size={16} />
              </button>
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1440}
                height={900}
                className="max-h-[90vh] w-auto max-w-full rounded-lg border border-line shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>,
            document.body
          )
        : null}
    </motion.div>
  );
}

export default function Specializations() {
  const { locale, t, ready } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useGSAP(
    () => {
      if (!ready || prefersReducedMotion()) return;
      const cards = gridRef.current?.children;
      if (!cards?.length) return;
      gsap.fromTo(
        cards,
        { y: 44, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
        }
      );
    },
    { scope: sectionRef, dependencies: [ready] }
  );

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="relative mx-auto max-w-6xl overflow-x-clip px-6 py-28 md:py-40 lg:px-8"
    >
      <SectionWatermark icon={Layers} />
      <SectionHeading
        key={locale}
        index="03"
        label="cases --list"
        title={t.specs.title}
      />

      <div ref={gridRef} className="relative z-10 mt-8 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {specializations.map((spec) => (
          <div
            key={spec.id}
            className={expanded === spec.id ? "md:col-span-2 lg:col-span-3" : ""}
          >
            <SpecCard
              spec={spec}
              expanded={expanded === spec.id}
              dimmed={expanded !== null && expanded !== spec.id}
              onToggle={() =>
                setExpanded((current) => (current === spec.id ? null : spec.id))
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
