import type { KworkReview } from "@/data/kwork-reviews";

const MIN_BETWEEN = 2;

function senderOf(review: KworkReview) {
  return review.username;
}

function groupBySender(reviews: KworkReview[]) {
  const groups = new Map<string, KworkReview[]>();
  for (const review of reviews) {
    const key = senderOf(review);
    const list = groups.get(key);
    if (list) list.push(review);
    else groups.set(key, [review]);
  }
  return [...groups.values()].sort((a, b) => b.length - a.length);
}

function circularOk(reviews: KworkReview[], minBetween: number) {
  const n = reviews.length;
  if (n === 0) return true;
  for (let i = 0; i < n; i++) {
    for (let d = 1; d <= minBetween; d++) {
      const j = (i + d) % n;
      if (senderOf(reviews[i]) === senderOf(reviews[j])) return false;
    }
  }
  return true;
}

function slotLegal(
  slots: Array<KworkReview | null>,
  index: number,
  review: KworkReview,
  minBetween: number
) {
  const n = slots.length;
  const sender = senderOf(review);
  for (let d = 1; d <= minBetween; d++) {
    const next = slots[(index + d) % n];
    const prev = slots[(index - d + n) % n];
    if (next && senderOf(next) === sender) return false;
    if (prev && senderOf(prev) === sender) return false;
  }
  return true;
}

/** Расставляет отзывы по кругу так, чтобы у одного отправителя между появлениями было ≥ minBetween чужих. */
export function spreadReviews(
  reviews: KworkReview[],
  minBetween = MIN_BETWEEN
): KworkReview[] {
  const n = reviews.length;
  if (n <= minBetween + 1) return [...reviews];

  const minDist = minBetween + 1;
  const slots: Array<KworkReview | null> = Array.from({ length: n }, () => null);
  const groups = groupBySender(reviews);

  for (const group of groups) {
    const k = group.length;
    const step = Math.max(minDist, Math.floor(n / k));
    let placed = false;

    for (let start = 0; start < n && !placed; start++) {
      const positions: number[] = [];
      let fits = true;
      for (let i = 0; i < k; i++) {
        const pos = (start + i * step) % n;
        if (slots[pos] !== null || positions.includes(pos)) {
          fits = false;
          break;
        }
        if (!slotLegal(slots, pos, group[i], minBetween)) {
          fits = false;
          break;
        }
        positions.push(pos);
      }
      if (!fits) continue;
      positions.forEach((pos, i) => {
        slots[pos] = group[i];
      });
      placed = true;
    }

    if (placed) continue;

    for (const review of group) {
      let pos = slots.findIndex(
        (slot, i) => slot === null && slotLegal(slots, i, review, minBetween)
      );
      if (pos === -1) pos = slots.findIndex((slot) => slot === null);
      if (pos !== -1) slots[pos] = review;
    }
  }

  const result = slots.filter((slot): slot is KworkReview => slot !== null);
  return circularOk(result, minBetween) ? result : repairCircular(result, minBetween);
}

function repairCircular(reviews: KworkReview[], minBetween: number) {
  const n = reviews.length;
  const result = [...reviews];

  const conflictCount = (list: KworkReview[]) => {
    let count = 0;
    for (let i = 0; i < n; i++) {
      for (let d = 1; d <= minBetween; d++) {
        if (senderOf(list[i]) === senderOf(list[(i + d) % n])) count += 1;
      }
    }
    return count;
  };

  for (let attempt = 0; attempt < n * 4 && !circularOk(result, minBetween); attempt++) {
    let improved = false;
    for (let i = 0; i < n; i++) {
      for (let d = 1; d <= minBetween; d++) {
        const j = (i + d) % n;
        if (senderOf(result[i]) !== senderOf(result[j])) continue;
        const current = conflictCount(result);
        let bestK = -1;
        let bestScore = current;
        for (let k = 0; k < n; k++) {
          if (k === i || k === j) continue;
          [result[j], result[k]] = [result[k], result[j]];
          const score = conflictCount(result);
          [result[j], result[k]] = [result[k], result[j]];
          if (score < bestScore) {
            bestScore = score;
            bestK = k;
          }
        }
        if (bestK >= 0) {
          [result[j], result[bestK]] = [result[bestK], result[j]];
          improved = true;
        }
      }
    }
    if (!improved) break;
  }

  return result;
}

/** Две ленты: повторы одного человека разведены по рядам, внутри ряда — с зазором. */
export function splitReviewRows(
  reviews: KworkReview[],
  minBetween = MIN_BETWEEN
): [KworkReview[], KworkReview[]] {
  const rowA: KworkReview[] = [];
  const rowB: KworkReview[] = [];
  const countA = new Map<string, number>();
  const countB = new Map<string, number>();

  for (const group of groupBySender(reviews)) {
    for (const review of group) {
      const key = senderOf(review);
      const a = countA.get(key) ?? 0;
      const b = countB.get(key) ?? 0;
      if (a < b || (a === b && rowA.length <= rowB.length)) {
        rowA.push(review);
        countA.set(key, a + 1);
      } else {
        rowB.push(review);
        countB.set(key, b + 1);
      }
    }
  }

  return [spreadReviews(rowA, minBetween), spreadReviews(rowB, minBetween)];
}

export function reviewsHaveSenderGap(reviews: KworkReview[], minBetween = MIN_BETWEEN) {
  return circularOk(reviews, minBetween);
}
