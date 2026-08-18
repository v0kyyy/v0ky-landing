import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
  children?: ReactNode;
};

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  repeat = 2,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn("overflow-hidden py-2", pauseOnHover && "group", className)}
    >
      <div
        className={cn(
          "flex w-max will-change-transform",
          reverse ? "marquee-track-reverse" : "marquee-track"
        )}
      >
        {Array.from({ length: repeat }, (_, i) => (
          <div
            key={i}
            className="flex shrink-0 items-stretch pr-[var(--gap)] [gap:var(--gap)]"
            aria-hidden={i > 0}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
