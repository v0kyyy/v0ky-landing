"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  CalendarClock,
  Flag,
  MessageCircle,
  MousePointerClick,
  ThumbsUp,
  Timer,
  UserRoundPlus,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/scroll";
import { experience } from "@/data/experience";
import { kworkStats } from "@/data/kwork";
import { site } from "@/data/site";
import { useI18n } from "@/components/providers/LocaleProvider";

function TimelineLine({
  lineRef,
  className,
}: {
  lineRef: RefObject<SVGLineElement | null>;
  className?: string;
}) {
  return (
    <svg
      className={className}
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
  );
}

function StatRow({
  icon: Icon,
  children,
}: {
  icon: typeof Flag;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-3 px-5 py-4 md:px-6">
      <Icon className="size-[18px] shrink-0 text-muted" strokeWidth={1.75} aria-hidden />
      <div className="min-w-0 flex-1 text-[15px] leading-snug text-fg/85">{children}</div>
    </li>
  );
}

function KworkCard({
  ordersRef,
  reviewsRef,
  initialOrders,
  initialReviews,
}: {
  ordersRef?: RefObject<HTMLSpanElement | null>;
  reviewsRef?: RefObject<HTMLSpanElement | null>;
  initialOrders: number;
  initialReviews: number;
}) {
  const { locale, t } = useI18n();
  const kworkHref = site.links.kwork[locale];

  return (
    <article className="relative overflow-hidden rounded-2xl border border-line bg-surface-deep transition-colors duration-300 hover:border-accent/40">
      <span
        data-xp-dot
        className="absolute -left-[29px] top-8 block h-3 w-3 rounded-full border-2 lg:-right-[1.375rem] lg:left-auto lg:top-10"
        style={{ backgroundColor: "#08080a", borderColor: "#6e6b67" }}
        aria-hidden
      />

      <a
        href={kworkHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.help.kworkOpen}
        className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
      >
        <MousePointerClick size={16} strokeWidth={1.8} />
      </a>

      <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4 pr-14 md:px-6">
        <Image
          src="/me.jpg"
          alt={t.hero.photoAlt}
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-full object-cover object-[center_20%] ring-1 ring-white/10"
        />
        <h3 className="font-display text-xl font-semibold text-accent">
          {t.help.kworkName}
        </h3>
      </div>

      <ul className="divide-y divide-white/[0.06]">
        <StatRow icon={CalendarClock}>
          <span className="text-fg/90">{t.help.kworkSince}</span>
        </StatRow>
        <StatRow icon={Flag}>
          <span>
            <span ref={ordersRef} className="font-semibold tabular-nums text-fg">
              {initialOrders}
            </span>{" "}
            {t.help.kworkOrders}
          </span>
        </StatRow>
        <StatRow icon={MessageCircle}>
          <span>
            <span ref={reviewsRef} className="font-semibold tabular-nums text-fg">
              {initialReviews}
            </span>{" "}
            {t.help.kworkReviews}
          </span>
        </StatRow>
        <StatRow icon={ThumbsUp}>
          <span>
            <span className="font-semibold tabular-nums text-fg">100%</span>{" "}
            {t.help.kworkSuccess}
          </span>
        </StatRow>
        <StatRow icon={Timer}>
          <span>
            <span className="font-semibold tabular-nums text-fg">100%</span>{" "}
            {t.help.kworkOnTime}
          </span>
        </StatRow>
        <StatRow icon={UserRoundPlus}>
          <span>
            <span className="font-semibold tabular-nums text-fg">48%</span>{" "}
            {t.help.kworkRepeat}
          </span>
        </StatRow>
      </ul>
    </article>
  );
}

export default function Experience() {
  const { locale, ready } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ordersRef = useRef<HTMLSpanElement>(null);
  const reviewsRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const line = lineRef.current;
      if (!ready || !wrap || !line) return;

      const jobs = Array.from(wrap.querySelectorAll<HTMLElement>("[data-xp-item]"));
      let activeJob = -1;
      const setActiveJob = (index: number) => {
        if (index === activeJob || !jobs.length) return;
        activeJob = index;
        jobs.forEach((item, i) => {
          const on = i === index;
          item.dataset.active = on ? "true" : "false";
          const dot = item.querySelector<HTMLElement>("[data-xp-dot]");
          if (!dot) return;
          gsap.to(dot, {
            backgroundColor: on ? "#e8332a" : "#08080a",
            borderColor: on ? "#e8332a" : "#6e6b67",
            scale: on ? 1.3 : 1,
            boxShadow: on ? "0 0 18px rgba(232,51,42,0.55)" : "0 0 0 rgba(232,51,42,0)",
            duration: 0.35,
            overwrite: "auto",
          });
        });
      };
      const pickActiveJob = () => {
        if (!jobs.length) return;
        const card = cardRef.current;
        const desktop = window.matchMedia("(min-width: 1024px)").matches;
        const probe =
          desktop && card
            ? card.getBoundingClientRect().top + 48
            : window.innerHeight * 0.42;
        let best = 0;
        let bestDist = Infinity;
        jobs.forEach((item, i) => {
          const dist = Math.abs(item.getBoundingClientRect().top - probe);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setActiveJob(best);
      };

      const dots = wrap.querySelectorAll<HTMLElement>("[data-xp-dot]");
      const counters = {
        orders: kworkStats.startOrders,
        reviews: kworkStats.startReviews,
      };
      let shownOrders = -1;
      let shownReviews = -1;
      const setCounts = () => {
        const orders = Math.round(counters.orders);
        const reviews = Math.round(counters.reviews);
        if (ordersRef.current && orders !== shownOrders) {
          shownOrders = orders;
          ordersRef.current.textContent = `${orders}`;
        }
        if (reviewsRef.current && reviews !== shownReviews) {
          shownReviews = reviews;
          reviewsRef.current.textContent = `${reviews}`;
        }
      };

      if (prefersReducedMotion()) {
        gsap.set(line, { strokeDashoffset: 0 });
        dots.forEach((dot) =>
          gsap.set(dot, { backgroundColor: "#08080a", borderColor: "#6e6b67" })
        );
        counters.orders = kworkStats.orders;
        counters.reviews = kworkStats.reviews;
        setCounts();
        setActiveJob(Math.max(0, jobs.length - 1));
        return;
      }

      const desktop = window.matchMedia("(min-width: 1024px)").matches;

      const scrollRange = {
        trigger: wrap,
        start: "top 72%",
        end: "bottom 55%",
        scrub: 0.5,
      } as const;

      gsap.fromTo(
        line,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, ease: "none", scrollTrigger: scrollRange }
      );

      if (desktop) {
        gsap.fromTo(
          counters,
          { orders: kworkStats.startOrders, reviews: kworkStats.startReviews },
          {
            orders: kworkStats.orders,
            reviews: kworkStats.reviews,
            ease: "none",
            onUpdate: setCounts,
            scrollTrigger: {
              trigger: wrap,
              start: "top 18%",
              end: "bottom 82%",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const rail = railRef.current;
        const card = cardRef.current;
        if (!rail || !card) return;

        gsap.fromTo(
          card,
          { y: 0 },
          {
            y: () => Math.max(0, rail.offsetHeight - card.offsetHeight),
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top 18%",
              end: "bottom 82%",
              scrub: 0.7,
              invalidateOnRefresh: true,
              onUpdate: pickActiveJob,
            },
          }
        );
      });

      ScrollTrigger.create({
        trigger: wrap,
        start: "top 18%",
        end: "bottom 82%",
        onUpdate: pickActiveJob,
        onRefresh: pickActiveJob,
      });
      pickActiveJob();

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [ready] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-6xl overflow-x-clip px-6 pb-28 pt-2 md:pb-40 lg:px-8"
    >
      <div
        ref={wrapRef}
        className="relative grid lg:grid-cols-[20rem_2rem_minmax(0,1fr)]"
      >
        <TimelineLine
          lineRef={lineRef}
          className="pointer-events-none absolute left-2 top-0 h-full w-[2px] lg:left-[21rem]"
        />

        <aside ref={railRef} className="relative hidden pl-8 lg:block lg:h-full lg:pl-0">
          <div
            ref={cardRef}
            className="relative lg:absolute lg:inset-x-0 lg:top-0"
          >
            <KworkCard
              ordersRef={ordersRef}
              reviewsRef={reviewsRef}
              initialOrders={kworkStats.startOrders}
              initialReviews={kworkStats.startReviews}
            />
          </div>
        </aside>

        <div className="relative min-w-0 pl-8 lg:col-start-3 lg:pl-0">
          {experience.toReversed().map(({ id, company, url, role, period, current, bullets, stack }, index) => (
            <article
              key={id}
              data-xp-item
              data-active={index === 0 ? "true" : "false"}
              className="relative mb-12 rounded-2xl border border-line bg-surface-deep p-7 opacity-[0.34] transition-[opacity,border-color] duration-500 ease-out data-[active=true]:border-accent/40 data-[active=true]:opacity-100 lg:last:mb-0 md:p-9"
            >
              <span
                data-xp-dot
                className="absolute -left-[29px] top-10 block h-3 w-3 rounded-full border-2 lg:-left-[1.375rem]"
                style={{ backgroundColor: "#08080a", borderColor: "#6e6b67" }}
                aria-hidden
              />

              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-fg md:text-xl">{role}</h3>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 font-mono text-sm text-accent transition-colors duration-300 hover:text-fg"
                    >
                      {company}
                      <ArrowUpRight size={13} strokeWidth={2} aria-hidden />
                    </a>
                  ) : (
                    <p className="mt-1 font-mono text-sm text-accent">{company}</p>
                  )}
                </div>
                <span
                  className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-wide ${
                    current ? "border-accent/50 text-accent" : "border-line text-muted"
                  }`}
                >
                  {period[locale]}
                </span>
              </div>

              <ul className="space-y-3">
                {bullets[locale].map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
                    <span className="mt-[9px] block h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
          <div className="relative lg:hidden">
            <KworkCard
              initialOrders={kworkStats.orders}
              initialReviews={kworkStats.reviews}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
