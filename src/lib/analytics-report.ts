export type AnalyticsQuote = {
  id: string;
  createdAt: Date | string;
  status: string;
  paymentStatus: string | null;
  estimatedPrice: number;
  distanceMiles: number;
  serviceType: string;
  pickupZip: string;
  dropoffZip: string;
};
const DAY = 86_400_000;
export function analyticsDays(value: unknown): 7 | 30 | 90 {
  return value === "7" ? 7 : value === "90" ? 90 : 30;
}
export function analyticsWindow(days: number, now = new Date()) {
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const start = new Date(today.getTime() - (days - 1) * DAY);
  return { start, previousStart: new Date(start.getTime() - days * DAY), now };
}
export function percentageChange(
  current: number,
  previous: number,
): number | null {
  return previous > 0 ? ((current - previous) / previous) * 100 : null;
}
const price = (q: AnalyticsQuote) =>
  Number.isFinite(q.estimatedPrice) ? Math.max(0, q.estimatedPrice) : 0;
const paid = (q: AnalyticsQuote) =>
  q.status === "PAID" || q.paymentStatus === "PAID";
const booked = (q: AnalyticsQuote) =>
  paid(q) || q.status === "WON" || q.status === "CONFIRMED";
const outcome = (q: AnalyticsQuote) =>
  paid(q)
    ? "Paid"
    : booked(q)
      ? "Booked"
      : ["LOST", "CANCELLED"].includes(q.status)
        ? "Closed without booking"
        : q.status === "PENDING"
          ? "Awaiting decision"
          : "Other";
function summarize(quotes: AnalyticsQuote[]) {
  return {
    count: quotes.length,
    quotedValue: quotes.reduce((s, q) => s + price(q), 0),
    openValue: quotes
      .filter((q) => outcome(q) === "Awaiting decision")
      .reduce((s, q) => s + price(q), 0),
    booked: quotes.filter(booked).length,
    paid: quotes.filter(paid).length,
    paidValue: quotes.filter(paid).reduce((s, q) => s + price(q), 0),
    average: quotes.length
      ? quotes.reduce((s, q) => s + price(q), 0) / quotes.length
      : null,
    bookingRate: quotes.length
      ? (quotes.filter(booked).length / quotes.length) * 100
      : null,
  };
}
function breakdown(
  quotes: AnalyticsQuote[],
  key: (q: AnalyticsQuote) => string,
) {
  const groups = new Map<
    string,
    { label: string; count: number; value: number }
  >();
  quotes.forEach((q) => {
    const label = key(q);
    const group = groups.get(label) ?? { label, count: 0, value: 0 };
    group.count++;
    group.value += price(q);
    groups.set(label, group);
  });
  return [...groups.values()].sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label),
  );
}
export function buildAnalytics(
  quotes: AnalyticsQuote[],
  days: 7 | 30 | 90,
  now = new Date(),
) {
  const window = analyticsWindow(days, now);
  const valid = quotes.filter(
    (q) =>
      Number.isFinite(new Date(q.createdAt).getTime()) &&
      new Date(q.createdAt) <= now,
  );
  const current = valid.filter((q) => new Date(q.createdAt) >= window.start);
  const previous = valid.filter(
    (q) =>
      new Date(q.createdAt) >= window.previousStart &&
      new Date(q.createdAt) < window.start,
  );
  const summary = summarize(current),
    prior = summarize(previous);
  const byDate = new Map<string, number>();
  valid.forEach((q) => {
    const key = new Date(q.createdAt).toISOString().slice(0, 10);
    byDate.set(key, (byDate.get(key) ?? 0) + 1);
  });
  const daily = Array.from({ length: days }, (_, i) => {
    const date = new Date(window.start.getTime() + i * DAY);
    const prev = new Date(window.previousStart.getTime() + i * DAY);
    return {
      date: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
      quotes: byDate.get(date.toISOString().slice(0, 10)) ?? 0,
      previous: byDate.get(prev.toISOString().slice(0, 10)) ?? 0,
    };
  });
  const distances = current.filter(
    (q) => Number.isFinite(q.distanceMiles) && q.distanceMiles > 0,
  );
  const services = breakdown(
    current,
    (q) => q.serviceType?.trim().replaceAll("_", " ") || "Unspecified service",
  );
  const regions = breakdown(current, (q) =>
    /^\d{5}(?:-\d{4})?$/.test(q.pickupZip)
      ? `ZIP ${q.pickupZip.slice(0, 3)}xx`
      : "Unknown ZIP area",
  );
  const outcomes = [
    "Awaiting decision",
    "Booked",
    "Paid",
    "Closed without booking",
    "Other",
  ].map((label) => ({
    label,
    count: current.filter((q) => outcome(q) === label).length,
  }));
  const hourGroups = breakdown(current, (q) =>
    new Date(q.createdAt).getUTCHours().toString(),
  ).sort((a, b) => b.count - a.count || Number(a.label) - Number(b.label));
  return {
    days,
    start: window.start.toISOString(),
    previousStart: window.previousStart.toISOString(),
    updatedAt: now.toISOString(),
    summary,
    prior,
    quoteChange: percentageChange(summary.count, prior.count),
    valueChange: percentageChange(summary.quotedValue, prior.quotedValue),
    daily,
    services,
    regions,
    outcomes,
    averageDistance: distances.length
      ? distances.reduce((s, q) => s + q.distanceMiles, 0) / distances.length
      : null,
    peakHour: hourGroups.length
      ? `${hourGroups[0].label.padStart(2, "0")}:00 UTC`
      : null,
    recent: [...current]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 6)
      .map((q) => ({
        id: q.id,
        createdAt: new Date(q.createdAt).toISOString(),
        status: outcome(q),
        value: price(q),
        route: `${q.pickupZip || "Unknown"} → ${q.dropoffZip || "Unknown"}`,
      })),
  };
}
export type AnalyticsReport = ReturnType<typeof buildAnalytics>;
