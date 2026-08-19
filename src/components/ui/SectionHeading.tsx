import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import SplitReveal from "./SplitReveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  className?: string;
  action?: ReactNode;
};

/** Единый заголовок секции: красный номер, mono-лейбл в терминальном стиле, display-заголовок с reveal. */
export default function SectionHeading({
  index,
  label,
  title,
  className = "",
  action,
}: SectionHeadingProps) {
  return (
    <div className={`relative z-10 mb-14 md:mb-20 ${className}`}>
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-sm text-accent">{index}</span>
        <span className="h-px w-12 bg-accent/40" aria-hidden />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          $ {label}
        </span>
      </div>
      <div className="flex flex-nowrap items-end justify-between gap-4 sm:gap-8">
        <SplitReveal
          as="h2"
          mode="words"
          className="min-w-0 font-display text-[clamp(1.75rem,4.5vw,3.4rem)] font-semibold leading-[1.08] text-fg"
        >
          {title}
        </SplitReveal>
        {action ? <div className="mb-0.5 shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}

/** Крупный полупрозрачный знак секции — фон справа, под контентом. */
export function SectionWatermark({
  icon: Icon,
  className = "",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <Icon
      aria-hidden
      strokeWidth={0.7}
      className={`pointer-events-none absolute -right-16 top-8 z-0 size-[clamp(16rem,44vw,30rem)] -rotate-[16deg] text-white/[0.07] md:-right-10 md:top-16 ${className}`}
    />
  );
}
