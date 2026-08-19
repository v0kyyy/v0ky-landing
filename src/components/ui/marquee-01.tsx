"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { kworkReviews } from "@/data/kwork-reviews";
import { splitReviewRows } from "@/lib/spreadReviews";
import { useI18n } from "@/components/providers/LocaleProvider";

const [firstRow, secondRow] = splitReviewRows(kworkReviews);

function ReviewCard({
  avatar,
  name,
  body,
}: {
  avatar: string | null;
  name: string;
  body: string;
}) {
  return (
    <Card className="relative h-full w-64 overflow-hidden border-line bg-surface p-4 shadow-none">
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="flex flex-row items-center gap-2">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="size-8 rounded-full object-cover" width={32} height={32} alt="" src={avatar} />
          ) : (
            <span className="flex size-8 items-center justify-center rounded-full border border-line bg-surface-deep font-mono text-[11px] text-accent">
              {name.slice(0, 1).toUpperCase()}
            </span>
          )}
          <p className="truncate text-sm font-medium text-white">{name}</p>
        </div>
        <p className="line-clamp-2 text-sm text-fg/85">{body}</p>
      </CardContent>
    </Card>
  );
}

export default function TestimonialMarquee() {
  const { locale } = useI18n();

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover>
        {firstRow.map((review) => (
          <ReviewCard
            key={`${review.id}-${locale}`}
            avatar={review.avatar}
            name={review.name}
            body={review.body[locale]}
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover>
        {secondRow.map((review) => (
          <ReviewCard
            key={`${review.id}-${locale}`}
            avatar={review.avatar}
            name={review.name}
            body={review.body[locale]}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-bg" />
    </div>
  );
}
