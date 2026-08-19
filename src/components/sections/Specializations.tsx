"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Layers, Plus, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import { useTilt } from "@/lib/useTilt";
import SectionHeading from "@/components/ui/SectionHeading";
import { specializations, type Specialization } from "@/data/specializations";
import { useI18n } from "@/components/providers/LocaleProvider";

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.45, ease: [0.65, 0, 0.35, 1] as const },
  }),
};

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

  // при раскрытии подводим карточку в вьюпорт
  useEffect(() => {
    if (!expanded) return;
    const el = cardRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      window.__lenis?.scrollTo(el, { offset: -96, duration: 0.9 });
    }, 150);
    return () => clearTimeout(timer);
  }, [expanded]);

  // Escape закрывает раскрытую панель
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onToggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, onToggle]);

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
      {/* красный градиентный glow в углу при hover */}
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
            data-cursor-text={t.specs.openCursor}
          >
            <div ref={tiltRef} className="flex h-full flex-col p-7 will-change-transform">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-accent">{spec.num}</span>
                <spec.icon size={18} strokeWidth={1.75} className="text-accent" aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-fg">
                {spec.title[locale]}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{spec.short[locale]}</p>
              <span className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-dim transition-colors duration-300 group-hover:text-accent">
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
                  {/* абстрактное превью в чёрно-красной гамме — чистый CSS-паттерн */}
                  <div
                    className={`relative h-24 ${project.pattern}`}
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
                  <div className="flex flex-1 flex-col p-5">
                    <h4 className="text-sm font-semibold leading-snug text-fg">{project.name[locale]}</h4>
                    <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-muted">
                      {project.description[locale]}
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
    </motion.div>
  );
}

export default function Specializations() {
  const { locale, t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gridRef.current?.children;
      if (!cards?.length) return;
      gsap.from(cards, {
        y: 44,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="relative mx-auto max-w-6xl px-6 py-28 md:py-40 lg:px-8"
    >
      <SectionHeading
        key={locale}
        index="03"
        label="cases --list"
        title={t.specs.title}
        icon={Layers}
      />

      <div ref={gridRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {specializations.map((spec) => (
          /* обёртка — цель GSAP-анимации входа: без CSS-transition и без framer,
             чтобы не конфликтовать ни с transition на opacity, ни с layout-проекцией */
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
