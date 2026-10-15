/**
 * Qalt Merchant Intelligence: merchant-only profit estimates, pipeline stages,
 * alerts, period insights and pricing recommendations.
 *
 * Pure functions over rows the server already scoped to one company. Every
 * number shown to merchants (and every number the assistant quotes) comes from
 * here, never from an AI model. Nothing in this module writes data, changes a
 * customer price or touches a Stripe amount: revenue is the stored,
 * server-authoritative QuoteRequest.estimatedPrice.
 */
import { estimateQuoteProfit } from "./quote-profit-intelligence";

// ---------------------------------------------------------------------------
// Cost profiles
// ---------------------------------------------------------------------------

export const DEFAULT_TARGET_MARGIN = 20; // matches estimateQuoteProfit's default
export const DEFAULT_FOLLOW_UP_HOURS = 24;
export const MIN_SAMPLE = 5; // estimated quotes before a margin conclusion
export const MIN_CONVERSION_SAMPLE = 10; // quotes before a conversion conclusion
export const RECENT_DAYS = 30; // alerts and recommendations look at this window

export const COST_FIELDS = [
  { key: "fuelPricePerGallon", label: "Fuel price", unit: "$ / gallon", max: 20, critical: true },
  { key: "milesPerGallon", label: "Fuel efficiency", unit: "miles / gallon", max: 150, critical: true },
  { key: "driverHourlyCost", label: "Driver cost", unit: "$ / hour", max: 500, critical: true },
  { key: "averageSpeedMph", label: "Average driving speed", unit: "mph", max: 90, critical: true },
  { key: "handlingMinutes", label: "Loading and handling time", unit: "minutes / job", max: 1440, critical: false },
  { key: "deadheadMiles", label: "Deadhead (empty) miles", unit: "miles / job", max: 1000, critical: false },
  { key: "tollsPerJob", label: "Tolls", unit: "$ / job", max: 1000, critical: false },
  { key: "otherCostPerJob", label: "Other operating costs", unit: "$ / job", max: 10000, critical: false },
  { key: "targetMarginPercent", label: "Target profit margin", unit: "%", max: 95, critical: false },
] as const;

export type CostFieldKey = (typeof COST_FIELDS)[number]["key"];

export type CostProfile = {
  vehicleKey: string; // "" = company default
  label: string;
  followUpAfterHours?: number | null;
} & { [K in CostFieldKey]: number | null };

export type ResolvedCosts = {
  values: { [K in CostFieldKey]: number | null };
  inherited: CostFieldKey[]; // fields a vehicle row took from the default row
  profileLabel: string;
  vehicleSpecific: boolean;
};

/** Stable key for matching a quote's vehicleType to a per-vehicle cost row. */
export function vehicleKey(name: string | null | undefined): string {
  return (name ?? "").trim().toLowerCase().replace(/\s+/g, " ").slice(0, 80);
}

/** Per-vehicle row overrides the default row field by field; null inherits. */
export function resolveCosts(profiles: CostProfile[], vehicleType: string | null | undefined): ResolvedCosts {
  const base = profiles.find((p) => p.vehicleKey === "");
  const key = vehicleKey(vehicleType);
  const specific = key ? profiles.find((p) => p.vehicleKey === key) : undefined;
  const values = {} as ResolvedCosts["values"];
  const inherited: CostFieldKey[] = [];
  for (const { key: field } of COST_FIELDS) {
    const own = specific?.[field] ?? null;
    const fallback = base?.[field] ?? null;
    values[field] = own ?? fallback;
    if (specific && own === null && fallback !== null) inherited.push(field);
  }
  return {
    values,
    inherited,
    profileLabel: specific?.label ?? base?.label ?? "Not configured",
    vehicleSpecific: !!specific,
  };
}

export function targetMargin(profiles: CostProfile[], vehicleType?: string | null): number {
  return resolveCosts(profiles, vehicleType).values.targetMarginPercent ?? DEFAULT_TARGET_MARGIN;
}

export function followUpHours(profiles: CostProfile[]): number {
  const hours = profiles.find((p) => p.vehicleKey === "")?.followUpAfterHours;
  return typeof hours === "number" && hours > 0 ? hours : DEFAULT_FOLLOW_UP_HOURS;
}

/** Validates one submitted cost row. Returns an error message or the clean row. */
export function parseCostProfile(input: unknown): { error: string } | { profile: CostProfile } {
  if (!input || typeof input !== "object") return { error: "Invalid cost profile" };
  const raw = input as Record<string, unknown>;
  const key = vehicleKey(typeof raw.vehicleKey === "string" ? raw.vehicleKey : "");
  const label =
    typeof raw.label === "string" && raw.label.trim()
      ? raw.label.trim().slice(0, 80)
      : key
        ? key
        : "All vehicles";
  const profile = { vehicleKey: key, label } as CostProfile;
  for (const field of COST_FIELDS) {
    const value = raw[field.key];
    if (value === null || value === undefined || value === "") {
      profile[field.key] = null;
      continue;
    }
    const n = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(n) || n < 0 || n > field.max) {
      return { error: `${field.label} must be between 0 and ${field.max}` };
    }
    if ((field.key === "milesPerGallon" || field.key === "averageSpeedMph") && n === 0) {
      return { error: `${field.label} must be greater than 0` };
    }
    profile[field.key] = n;
  }
  const hours = raw.followUpAfterHours;
  if (hours === null || hours === undefined || hours === "") {
    profile.followUpAfterHours = null;
  } else {
    const n = Number(hours);
    if (!Number.isInteger(n) || n < 1 || n > 720) return { error: "Follow-up time must be 1 to 720 hours" };
    profile.followUpAfterHours = key === "" ? n : null;
  }
  return { profile };
}

// ---------------------------------------------------------------------------
// Profit estimates
// ---------------------------------------------------------------------------

export type IntelQuote = {
  id: string;
  createdAt: Date | string;
  customerName: string;
  status: string;
  paymentStatus: string | null;
  estimatedPrice: number;
  distanceMiles: number;
  vehicleType: string | null;
  serviceType: string;
  pickupZip: string;
  dropoffZip: string;
  pricingBreakdown?: unknown;
};

export type IntelJob = {
  id: string;
  status: string;
  quoteRequestId: string | null;
  scheduledDate: Date | string;
  updatedAt: Date | string;
};

export type MarginTone = "healthy" | "below" | "loss";

export type ProfitEstimate =
  | {
      status: "ok";
      revenue: number;
      costs: { fuel: number; driver: number; deadhead: number; tolls: number; other: number };
      totalCost: number;
      profit: number;
      marginPercent: number;
      targetMarginPercent: number;
      tone: MarginTone;
      assumptions: {
        loadedMiles: number;
        deadheadMiles: number;
        estimatedHours: number;
        profileLabel: string;
        vehicleSpecific: boolean;
        unsetOptional: string[]; // optional costs left blank and counted as $0
      };
    }
  | { status: "unavailable"; reason: string; missing: string[] };

const cents = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function marginTone(profit: number, marginPercent: number, target: number): MarginTone {
  if (profit < 0) return "loss";
  return marginPercent < target ? "below" : "healthy";
}

/**
 * Estimates one quote's profit with the existing estimateQuoteProfit engine.
 * Hours = handling time + (loaded + deadhead miles) / average speed. Deadhead is
 * split out for display only; totals are exactly the engine's totals.
 */
export function estimateProfit(quote: Pick<IntelQuote, "estimatedPrice" | "distanceMiles" | "vehicleType">, profiles: CostProfile[]): ProfitEstimate {
  const resolved = resolveCosts(profiles, quote.vehicleType);
  const v = resolved.values;
  const missing = COST_FIELDS.filter((f) => f.critical && v[f.key] === null).map((f) => f.label);
  if (missing.length) {
    return { status: "unavailable", reason: "Add your cost settings to estimate profit.", missing };
  }
  if (!Number.isFinite(quote.estimatedPrice) || quote.estimatedPrice <= 0) {
    return { status: "unavailable", reason: "This quote has no quoted amount.", missing: [] };
  }
  if (!Number.isFinite(quote.distanceMiles) || quote.distanceMiles < 0) {
    return { status: "unavailable", reason: "This quote has no valid route distance.", missing: [] };
  }
  const fuelPrice = v.fuelPricePerGallon!;
  const mpg = v.milesPerGallon!;
  const hourly = v.driverHourlyCost!;
  const speed = v.averageSpeedMph!;
  const deadhead = v.deadheadMiles ?? 0;
  const target = v.targetMarginPercent ?? DEFAULT_TARGET_MARGIN;
  const hours = (v.handlingMinutes ?? 0) / 60 + (quote.distanceMiles + deadhead) / speed;
  let engine;
  try {
    engine = estimateQuoteProfit(quote.estimatedPrice, quote.distanceMiles, {
      fuelPricePerGallon: fuelPrice,
      vehicleMilesPerGallon: mpg,
      driverHourlyCost: hourly,
      estimatedHours: hours,
      deadheadMiles: deadhead,
      tolls: v.tollsPerJob ?? 0,
      otherCosts: v.otherCostPerJob ?? 0,
      minimumTargetMarginPercent: target,
    });
  } catch {
    return { status: "unavailable", reason: "Your cost settings could not be applied to this quote.", missing: [] };
  }
  const deadheadFuel = cents((deadhead / mpg) * fuelPrice);
  const deadheadDriver = cents((deadhead / speed) * hourly);
  const costs = {
    fuel: cents(engine.costBreakdown.fuel - deadheadFuel),
    driver: cents(engine.costBreakdown.driver - deadheadDriver),
    deadhead: cents(deadheadFuel + deadheadDriver),
    tolls: engine.costBreakdown.tolls,
    other: engine.costBreakdown.other,
  };
  return {
    status: "ok",
    revenue: engine.revenue,
    costs,
    totalCost: engine.estimatedCost,
    profit: engine.estimatedProfit,
    marginPercent: engine.marginPercent,
    targetMarginPercent: target,
    tone: marginTone(engine.estimatedProfit, engine.marginPercent, target),
    assumptions: {
      loadedMiles: engine.assumptions.loadedMiles,
      deadheadMiles: deadhead,
      estimatedHours: cents(hours),
      profileLabel: resolved.profileLabel,
      vehicleSpecific: resolved.vehicleSpecific,
      unsetOptional: COST_FIELDS.filter((f) => !f.critical && f.key !== "targetMarginPercent" && v[f.key] === null).map((f) => f.label),
    },
  };
}

// ---------------------------------------------------------------------------
// Pipeline stages (derived, read-only: existing statuses are not redefined)
// ---------------------------------------------------------------------------

export type QuoteStage = "new" | "follow_up" | "booked" | "closed" | "other";

const time = (value: Date | string) => new Date(value).getTime();
export const isPaid = (q: Pick<IntelQuote, "status" | "paymentStatus">) => q.status === "PAID" || q.paymentStatus === "PAID";
/** Money actually collected through Qalt checkout. A status of PAID can be set by hand after an offline payment. */
export const isPaidOnline = (q: Pick<IntelQuote, "paymentStatus">) => q.paymentStatus === "PAID";
export const isBooked = (q: Pick<IntelQuote, "status" | "paymentStatus">) => isPaid(q) || q.status === "WON" || q.status === "CONFIRMED";
export const isClosed = (q: Pick<IntelQuote, "status">) => q.status === "LOST" || q.status === "CANCELLED";

export function quoteStage(q: IntelQuote, followUpAfterHours: number, now: Date): QuoteStage {
  if (isBooked(q)) return "booked";
  if (isClosed(q)) return "closed";
  if (q.status !== "PENDING") return "other";
  return now.getTime() - time(q.createdAt) > followUpAfterHours * 3_600_000 ? "follow_up" : "new";
}

export function routeLabel(q: Pick<IntelQuote, "pickupZip" | "dropoffZip">): string {
  const area = (zip: string) => (/^\d{3}/.test(zip ?? "") ? `${zip.slice(0, 3)}xx` : "Unknown");
  return `${area(q.pickupZip)} → ${area(q.dropoffZip)}`;
}

export const vehicleLabel = (q: Pick<IntelQuote, "vehicleType">) => q.vehicleType?.trim() || "No vehicle selected";

// ---------------------------------------------------------------------------
// Analysis (one pass the page, alerts, recommendations and assistant share)
// ---------------------------------------------------------------------------

export type AnalyzedQuote = IntelQuote & { estimate: ProfitEstimate; stage: QuoteStage; ageHours: number };

export function analyzeQuotes(quotes: IntelQuote[], profiles: CostProfile[], now: Date): AnalyzedQuote[] {
  const followUp = followUpHours(profiles);
  return quotes.map((q) => ({
    ...q,
    estimate: estimateProfit(q, profiles),
    stage: quoteStage(q, followUp, now),
    ageHours: Math.max(0, (now.getTime() - time(q.createdAt)) / 3_600_000),
  }));
}

// ---------------------------------------------------------------------------
// Alerts: one per quote or job, highest priority reason first, so a quote
// never shows up as several separate alerts.
// ---------------------------------------------------------------------------

export type AlertKind = "checkout_incomplete" | "job_issue" | "loss" | "stale_quote" | "below_target";
export type MerchantAlert = {
  key: string;
  kind: AlertKind;
  severity: "high" | "medium";
  title: string;
  detail: string;
  reasons: string[];
  quoteId: string | null;
  jobId: string | null;
  createdAt: string;
};

const ALERT_PRIORITY: AlertKind[] = ["checkout_incomplete", "job_issue", "loss", "stale_quote", "below_target"];

export function buildAlerts(quotes: AnalyzedQuote[], jobs: IntelJob[], profiles: CostProfile[], now: Date): MerchantAlert[] {
  const followUp = followUpHours(profiles);
  const recentCutoff = now.getTime() - RECENT_DAYS * 86_400_000;
  const alerts: MerchantAlert[] = [];
  const issueJobs = new Map<string, IntelJob>();
  for (const job of jobs) {
    if (job.status !== "ISSUE") continue;
    if (job.quoteRequestId) issueJobs.set(job.quoteRequestId, job);
    else {
      alerts.push({
        key: `job:${job.id}`,
        kind: "job_issue",
        severity: "high",
        title: "A delivery job has an issue",
        detail: "A job in your Ops Console is marked Issue. Review it and update the status.",
        reasons: ["Job marked Issue"],
        quoteId: null,
        jobId: job.id,
        createdAt: new Date(job.updatedAt).toISOString(),
      });
    }
  }
  for (const q of quotes) {
    if (time(q.createdAt) < recentCutoff && !issueJobs.has(q.id)) continue;
    const found: { kind: AlertKind; reason: string }[] = [];
    const checkoutOpen = (q.paymentStatus === "PENDING" || q.paymentStatus === "FAILED") && !isPaid(q) && !isClosed(q);
    if (checkoutOpen && q.ageHours >= 1) {
      found.push({
        kind: "checkout_incomplete",
        reason: q.paymentStatus === "FAILED" ? "Payment failed" : "Checkout not completed",
      });
    }
    if (issueJobs.has(q.id)) found.push({ kind: "job_issue", reason: "Delivery job marked Issue" });
    // Margin alerts only while the quote is still open: that is when the price
    // can still change. Booked low-margin quotes stay visible in filters and
    // recommendations instead of crowding the attention list.
    if (q.estimate.status === "ok" && (q.stage === "new" || q.stage === "follow_up")) {
      if (q.estimate.tone === "loss") found.push({ kind: "loss", reason: `Estimated loss of ${money(-q.estimate.profit, 2)}` });
      else if (q.estimate.tone === "below") {
        found.push({
          kind: "below_target",
          reason: `Estimated margin ${pct(q.estimate.marginPercent)} vs ${pct(q.estimate.targetMarginPercent)} target`,
        });
      }
    }
    if (q.stage === "follow_up" && !checkoutOpen) {
      found.push({ kind: "stale_quote", reason: `Pending for ${ageText(q.ageHours)} (your follow-up time is ${followUp}h)` });
    }
    if (!found.length) continue;
    found.sort((a, b) => ALERT_PRIORITY.indexOf(a.kind) - ALERT_PRIORITY.indexOf(b.kind));
    const top = found[0].kind;
    const job = issueJobs.get(q.id);
    alerts.push({
      key: `quote:${q.id}`,
      kind: top,
      severity: top === "stale_quote" || top === "below_target" ? "medium" : "high",
      title: ALERT_TITLES[top](q),
      detail: ALERT_DETAILS[top],
      reasons: found.map((f) => f.reason),
      quoteId: q.id,
      jobId: job?.id ?? null,
      createdAt: new Date(q.createdAt).toISOString(),
    });
  }
  const alertedJobs = new Set(alerts.map((a) => a.jobId));
  for (const job of issueJobs.values()) {
    if (alertedJobs.has(job.id)) continue;
    alerts.push({
      key: `job:${job.id}`,
      kind: "job_issue",
      severity: "high",
      title: "A booked order needs attention",
      detail: "A job in your Ops Console is marked Issue. Review it and update the status.",
      reasons: ["Job marked Issue"],
      quoteId: null,
      jobId: job.id,
      createdAt: new Date(job.updatedAt).toISOString(),
    });
  }
  return alerts.sort(
    (a, b) =>
      (a.severity === b.severity ? 0 : a.severity === "high" ? -1 : 1) ||
      ALERT_PRIORITY.indexOf(a.kind) - ALERT_PRIORITY.indexOf(b.kind) ||
      time(b.createdAt) - time(a.createdAt),
  );
}

const ALERT_TITLES: Record<AlertKind, (q: AnalyzedQuote) => string> = {
  checkout_incomplete: (q) => `${q.customerName || "A customer"} has not completed checkout`,
  job_issue: (q) => `Booked order for ${q.customerName || "a customer"} needs attention`,
  loss: (q) => `Quote for ${q.customerName || "a customer"} may lose money`,
  stale_quote: (q) => `${q.customerName || "A customer"} is waiting on a follow-up`,
  below_target: (q) => `Quote for ${q.customerName || "a customer"} is below your target margin`,
};
const ALERT_DETAILS: Record<AlertKind, string> = {
  checkout_incomplete: "The customer started online payment but it has not succeeded. Reach out personally if the booking still matters.",
  job_issue: "The delivery job for this order is marked Issue in your Ops Console.",
  loss: "Your configured costs are higher than the quoted price. Review the breakdown and your pricing.",
  stale_quote: "This quote is still pending past your follow-up time. Contact the customer or mark it won or lost.",
  below_target: "The estimate is profitable but under your target margin.",
};

// ---------------------------------------------------------------------------
// Period insights. Paid revenue (money collected online) is kept separate from
// quoted and booked values, which are estimates.
// ---------------------------------------------------------------------------

export type InsightPeriod = "day" | "week" | "month";
export const PERIOD_DAYS: Record<InsightPeriod, number> = { day: 1, week: 7, month: 30 };
export const PERIOD_LABEL: Record<InsightPeriod, string> = { day: "last 24 hours", week: "last 7 days", month: "last 30 days" };

export function parsePeriod(value: unknown): InsightPeriod {
  return value === "day" || value === "month" ? value : "week";
}

export type PeriodInsights = ReturnType<typeof buildInsights>;

export function buildInsights(quotes: AnalyzedQuote[], period: InsightPeriod, now: Date) {
  const start = now.getTime() - PERIOD_DAYS[period] * 86_400_000;
  const inPeriod = quotes.filter((q) => time(q.createdAt) >= start && time(q.createdAt) <= now.getTime());
  const booked = inPeriod.filter(isBooked);
  const paid = inPeriod.filter(isPaidOnline);
  const pending = inPeriod.filter((q) => q.stage === "new" || q.stage === "follow_up");
  const bookedEstimated = booked.filter((q) => q.estimate.status === "ok");
  const sum = (rows: AnalyzedQuote[], pick: (q: AnalyzedQuote) => number) => cents(rows.reduce((s, q) => s + pick(q), 0));
  const price = (q: AnalyzedQuote) => (Number.isFinite(q.estimatedPrice) ? Math.max(0, q.estimatedPrice) : 0);
  const profitOf = (q: AnalyzedQuote) => (q.estimate.status === "ok" ? q.estimate.profit : 0);
  const estimatedRevenue = sum(bookedEstimated, price);
  const estimatedProfit = sum(bookedEstimated, profitOf);
  return {
    period,
    label: PERIOD_LABEL[period],
    start: new Date(start).toISOString(),
    totalQuotes: inPeriod.length,
    quotedValue: sum(inPeriod, price),
    bookedCount: booked.length,
    bookedValue: sum(booked, price),
    paidCount: paid.length,
    paidRevenue: sum(paid, price),
    estimatedProfit: bookedEstimated.length ? estimatedProfit : null,
    averageMargin: bookedEstimated.length && estimatedRevenue > 0 ? cents((estimatedProfit / estimatedRevenue) * 100) : null,
    profitCoverage: { estimated: bookedEstimated.length, booked: booked.length },
    conversionRate: inPeriod.length ? cents((booked.length / inPeriod.length) * 100) : null,
    outstandingCount: pending.length,
    outstandingValue: sum(pending, price),
    lowMarginCount: inPeriod.filter((q) => q.estimate.status === "ok" && q.estimate.tone !== "healthy" && !isClosed(q)).length,
    followUpCount: inPeriod.filter((q) => q.stage === "follow_up").length,
  };
}

// ---------------------------------------------------------------------------
// Grouped margin stats (shared by recommendations and the assistant)
// ---------------------------------------------------------------------------

export type GroupStats = {
  label: string;
  quotes: number;
  booked: number;
  conversionRate: number | null;
  estimated: number;
  revenue: number;
  profit: number;
  averageMargin: number | null; // revenue-weighted
  costPerMile: number | null;
  deadheadShare: number | null; // deadhead cost / total cost, %
};

export function groupStats(quotes: AnalyzedQuote[], key: (q: AnalyzedQuote) => string): GroupStats[] {
  const groups = new Map<string, AnalyzedQuote[]>();
  for (const q of quotes) {
    const k = key(q);
    groups.set(k, [...(groups.get(k) ?? []), q]);
  }
  return [...groups.entries()]
    .map(([label, rows]) => {
      const est = rows.flatMap((q) => (q.estimate.status === "ok" ? [{ q, e: q.estimate }] : []));
      const revenue = cents(est.reduce((s, x) => s + x.e.revenue, 0));
      const profit = cents(est.reduce((s, x) => s + x.e.profit, 0));
      const cost = est.reduce((s, x) => s + x.e.totalCost, 0);
      const miles = est.reduce((s, x) => s + x.e.assumptions.loadedMiles + x.e.assumptions.deadheadMiles, 0);
      const deadhead = est.reduce((s, x) => s + x.e.costs.deadhead, 0);
      const booked = rows.filter(isBooked).length;
      return {
        label,
        quotes: rows.length,
        booked,
        conversionRate: rows.length ? cents((booked / rows.length) * 100) : null,
        estimated: est.length,
        revenue,
        profit,
        averageMargin: est.length && revenue > 0 ? cents((profit / revenue) * 100) : null,
        costPerMile: miles > 0 ? cents(cost / miles) : null,
        deadheadShare: cost > 0 ? cents((deadhead / cost) * 100) : null,
      };
    })
    .sort((a, b) => b.quotes - a.quotes || a.label.localeCompare(b.label));
}

// ---------------------------------------------------------------------------
// Pricing recommendations. Read-only advice; a proposal is only ever applied
// by a separate, confirmed merchant action.
// ---------------------------------------------------------------------------

export type PricingContext = {
  defaultProfileId: string | null;
  baseRatePerMile: number | null;
  minimumCharge: number | null;
  useMinimumCharge: boolean;
  hasFormSpecificPricing: boolean; // proposals are only safe when one profile prices every quote
};

export type Recommendation = {
  id: string;
  kind: "underpriced_vehicle" | "low_margin_route" | "minimum_charge" | "rate_per_mile" | "high_cost_vehicle" | "deadhead" | "popular_service" | "low_conversion";
  severity: "high" | "medium" | "info";
  title: string;
  reasoning: string;
  sampleSize: number;
  proposal: { field: "minimumCharge" | "baseRatePerMile"; profileId: string; current: number; proposed: number; explanation: string } | null;
  reviewHref: string;
};

const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

/** Revenue needed for this estimate to reach its target margin. */
/** Revenue needed to reach the target margin, or null when no price can (target of 100% or more). */
export function requiredRevenue(e: Extract<ProfitEstimate, { status: "ok" }>): number | null {
  if (e.targetMarginPercent >= 100) return null;
  const value = e.totalCost / (1 - e.targetMarginPercent / 100);
  return Number.isFinite(value) && value >= 0 ? value : null;
}
const MAX_INCREASE = 1.5; // proposals never raise a rate by more than 50% at once
const billableMiles = (q: IntelQuote) => {
  const b = q.pricingBreakdown && typeof q.pricingBreakdown === "object" ? (q.pricingBreakdown as { billableMiles?: unknown }).billableMiles : undefined;
  return typeof b === "number" && Number.isFinite(b) ? b : q.distanceMiles;
};
const minimumApplied = (q: IntelQuote) =>
  !!q.pricingBreakdown && typeof q.pricingBreakdown === "object" && (q.pricingBreakdown as { minimumApplied?: unknown }).minimumApplied === true;

export function buildRecommendations(quotes: AnalyzedQuote[], profiles: CostProfile[], pricing: PricingContext, now: Date): Recommendation[] {
  const cutoff = now.getTime() - 90 * 86_400_000;
  const rows = quotes.filter((q) => time(q.createdAt) >= cutoff && !isClosed(q));
  const all = quotes.filter((q) => time(q.createdAt) >= cutoff);
  const recs: Recommendation[] = [];
  const canPropose = !!pricing.defaultProfileId && !pricing.hasFormSpecificPricing;

  // Vehicles below target margin.
  const vehicles = groupStats(rows, vehicleLabel);
  for (const v of vehicles) {
    if (v.estimated < MIN_SAMPLE || v.averageMargin === null) continue;
    const target = targetMargin(profiles, v.label === "No vehicle selected" ? null : v.label);
    if (v.averageMargin >= target) continue;
    recs.push({
      id: `underpriced_vehicle:${vehicleKey(v.label)}`,
      kind: "underpriced_vehicle",
      severity: v.averageMargin < 0 ? "high" : "medium",
      title: `${v.label} quotes are below your target margin`,
      reasoning: `Your ${v.label} quotes average a ${pct(v.averageMargin)} estimated margin across ${v.estimated} quotes. Your configured target is ${pct(target)}. Review your mileage rate, vehicle fee or minimum charge.`,
      sampleSize: v.estimated,
      proposal: null,
      reviewHref: "/dashboard/forms",
    });
  }

  // Routes below target margin.
  const routeTarget = targetMargin(profiles);
  for (const r of groupStats(rows, routeLabel)) {
    if (r.estimated < MIN_SAMPLE || r.averageMargin === null) continue;
    if (r.averageMargin >= routeTarget || r.label.includes("Unknown")) continue;
    recs.push({
      id: `low_margin_route:${r.label}`,
      kind: "low_margin_route",
      severity: r.averageMargin < 0 ? "high" : "medium",
      title: `Low margin on the ${r.label} route`,
      reasoning: `${r.estimated} quotes on this ZIP-area route average a ${pct(r.averageMargin)} estimated margin against your ${pct(routeTarget)} target.`,
      sampleSize: r.estimated,
      proposal: null,
      reviewHref: "/dashboard/pricing",
    });
  }

  const estimated = rows.flatMap((q) => (q.estimate.status === "ok" ? [{ q, e: q.estimate }] : []));

  // Minimum charge too low for the trips it applies to.
  if (pricing.useMinimumCharge && pricing.minimumCharge !== null) {
    const floor = estimated.filter((x) => minimumApplied(x.q));
    const below = floor.filter((x) => x.e.tone !== "healthy");
    if (floor.length >= MIN_SAMPLE && below.length / floor.length >= 0.5) {
      const needed = floor.map((x) => requiredRevenue(x.e)).filter((v): v is number => v !== null);
      const raw = needed.length ? Math.ceil(median(needed)) : 0;
      const proposed = Math.min(raw, Math.floor(pricing.minimumCharge * MAX_INCREASE));
      if (needed.length >= MIN_SAMPLE && proposed > pricing.minimumCharge) {
        recs.push({
          id: "minimum_charge:default",
          kind: "minimum_charge",
          severity: "medium",
          title: "Your minimum charge may be too low",
          reasoning: `${below.length} of ${floor.length} short trips priced at your ${money(pricing.minimumCharge)} minimum are below your target margin. ${proposed < raw ? `A typical short trip would need about ${money(raw)}. Raising the minimum to ${money(proposed)} (a 50% step) gets you closer; review your costs too.` : `A minimum of about ${money(proposed)} would reach your target on a typical short trip with your current costs.`}`,
          sampleSize: floor.length,
          proposal: canPropose
            ? {
                field: "minimumCharge",
                profileId: pricing.defaultProfileId!,
                current: pricing.minimumCharge,
                proposed,
                explanation: "Applies to new quotes only. Saved quotes and their checkout amounts do not change.",
              }
            : null,
          reviewHref: "/dashboard/pricing",
        });
      }
    }
  }

  // Per-mile rate too low on trips priced by distance.
  if (pricing.baseRatePerMile !== null && pricing.baseRatePerMile > 0) {
    const distance = estimated.filter((x) => !minimumApplied(x.q) && x.q.distanceMiles >= 10);
    const below = distance.filter((x) => x.e.tone !== "healthy");
    if (distance.length >= MIN_SAMPLE && below.length / distance.length >= 0.5) {
      // Each trip's shortfall spread over its billable miles: flat fees are not scaled.
      const extra = distance.flatMap((x) => {
        const need = requiredRevenue(x.e);
        const miles = billableMiles(x.q);
        return need !== null && miles > 0 ? [Math.max(0, need - x.e.revenue) / miles] : [];
      });
      const raw = extra.length ? pricing.baseRatePerMile + median(extra) : 0;
      const capped = raw > pricing.baseRatePerMile * MAX_INCREASE;
      const proposed = Math.ceil(Math.min(raw, pricing.baseRatePerMile * MAX_INCREASE) * 20) / 20; // round up to $0.05
      if (extra.length >= MIN_SAMPLE && proposed > pricing.baseRatePerMile) {
        recs.push({
          id: "rate_per_mile:default",
          kind: "rate_per_mile",
          severity: "medium",
          title: "Your per-mile rate may be too low",
          reasoning: `${below.length} of ${distance.length} trips over 10 miles are below your target margin at ${money(pricing.baseRatePerMile, 2)} per mile. Raising it to about ${money(proposed, 2)} would bring a typical trip ${capped ? "closer to" : "to"} target, assuming your other fees stay the same${capped ? " (capped at a 50% increase; review your costs too)" : ""}.`,
          sampleSize: distance.length,
          proposal: canPropose
            ? {
                field: "baseRatePerMile",
                profileId: pricing.defaultProfileId!,
                current: pricing.baseRatePerMile,
                proposed,
                explanation: "Applies to new quotes only. Saved quotes and their checkout amounts do not change.",
              }
            : null,
          reviewHref: "/dashboard/pricing",
        });
      }
    }
  }

  // Vehicle with notably higher operating cost per mile.
  const costed = vehicles.filter((v) => v.estimated >= MIN_SAMPLE && v.costPerMile !== null);
  if (costed.length >= 2) {
    const avg = costed.reduce((s, v) => s + v.costPerMile!, 0) / costed.length;
    const top = [...costed].sort((a, b) => b.costPerMile! - a.costPerMile!)[0];
    if (top.costPerMile! >= avg * 1.25) {
      recs.push({
        id: `high_cost_vehicle:${vehicleKey(top.label)}`,
        kind: "high_cost_vehicle",
        severity: "info",
        title: `${top.label} costs the most to run per mile`,
        reasoning: `${top.label} averages ${money(top.costPerMile!, 2)} in estimated cost per mile vs ${money(avg, 2)} across your vehicles. Make sure its price reflects that.`,
        sampleSize: top.estimated,
        proposal: null,
        reviewHref: "/dashboard/intelligence/costs",
      });
    }
  }

  // Deadhead eating into margins.
  const overall = groupStats(rows, () => "all")[0];
  if (overall && overall.estimated >= MIN_SAMPLE && overall.deadheadShare !== null && overall.deadheadShare >= 25) {
    recs.push({
      id: "deadhead:all",
      kind: "deadhead",
      severity: "info",
      title: "Empty miles are a large share of your costs",
      reasoning: `Deadhead driving is about ${pct(overall.deadheadShare)} of your estimated operating cost across ${overall.estimated} quotes. Consider a service-area limit or a distance-based pickup fee.`,
      sampleSize: overall.estimated,
      proposal: null,
      reviewHref: "/dashboard/intelligence/costs",
    });
  }

  // Most requested service.
  const services = groupStats(all, (q) => q.serviceType || "Standard");
  const totalQuotes = all.length;
  if (totalQuotes >= MIN_CONVERSION_SAMPLE && services[0] && services[0].quotes / totalQuotes >= 0.4 && services.length > 1) {
    const s = services[0];
    recs.push({
      id: `popular_service:${s.label}`,
      kind: "popular_service",
      severity: "info",
      title: `${s.label} is your most requested service`,
      reasoning: `${s.quotes} of your ${totalQuotes} recent quotes (${pct((s.quotes / totalQuotes) * 100)}) are for ${s.label}${s.averageMargin !== null ? `, at a ${pct(s.averageMargin)} average estimated margin` : ""}. Keep its pricing sharp and feature it on your site.`,
      sampleSize: s.quotes,
      proposal: null,
      reviewHref: "/dashboard/pricing",
    });
  }

  // Low conversion by vehicle or service.
  const overallConversion = totalQuotes ? (all.filter(isBooked).length / totalQuotes) * 100 : 0;
  if (totalQuotes >= MIN_CONVERSION_SAMPLE * 2 && overallConversion > 0) {
    const groups = [
      ...groupStats(all, vehicleLabel).map((g) => ({ g, scope: "vehicle" })),
      ...services.map((g) => ({ g, scope: "service" })),
    ];
    for (const { g, scope } of groups) {
      if (g.quotes < MIN_CONVERSION_SAMPLE || g.conversionRate === null || g.quotes === totalQuotes) continue;
      if (g.conversionRate >= overallConversion / 2) continue;
      recs.push({
        id: `low_conversion:${scope}:${vehicleKey(g.label)}`,
        kind: "low_conversion",
        severity: "info",
        title: `${g.label} quotes rarely book`,
        reasoning: `${g.label} quotes book at ${pct(g.conversionRate)} (${g.booked} of ${g.quotes}) vs ${pct(overallConversion)} overall. The price or the follow-up may be turning customers away.`,
        sampleSize: g.quotes,
        proposal: null,
        reviewHref: "/dashboard/quotes",
      });
    }
  }

  const rank = { high: 0, medium: 1, info: 2 };
  const unique = new Map(recs.map((r) => [r.id, r]));
  return [...unique.values()].sort((a, b) => rank[a.severity] - rank[b.severity] || b.sampleSize - a.sampleSize);
}

// ---------------------------------------------------------------------------
// Quote table: filters, search and pagination (server side, so only one page
// of rows is ever sent to the browser).
// ---------------------------------------------------------------------------

export const QUOTE_FILTERS = ["all", "attention", "follow_up", "low_margin", "new", "booked"] as const;
export type QuoteFilter = (typeof QUOTE_FILTERS)[number];
export const PAGE_SIZE = 20;

export function parseFilter(value: unknown): QuoteFilter {
  return QUOTE_FILTERS.includes(value as QuoteFilter) ? (value as QuoteFilter) : "all";
}

export function matchesFilter(q: AnalyzedQuote, filter: QuoteFilter, alertQuoteIds: Set<string>): boolean {
  switch (filter) {
    case "attention":
      return alertQuoteIds.has(q.id);
    case "follow_up":
      return q.stage === "follow_up";
    case "low_margin":
      return q.estimate.status === "ok" && q.estimate.tone !== "healthy" && !isClosed(q);
    case "new":
      return q.stage === "new";
    case "booked":
      return q.stage === "booked";
    default:
      return true;
  }
}

export function searchQuotes(quotes: AnalyzedQuote[], term: string): AnalyzedQuote[] {
  const t = term.trim().toLowerCase().slice(0, 80);
  if (!t) return quotes;
  return quotes.filter((q) =>
    [q.customerName, q.pickupZip, q.dropoffZip, q.vehicleType ?? "", q.serviceType, q.id].some((v) => (v ?? "").toLowerCase().includes(t)),
  );
}

export function paginate<T>(rows: T[], page: number) {
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const current = Math.min(pages, Math.max(1, Number.isInteger(page) ? page : 1));
  return { rows: rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE), page: current, pages, total: rows.length };
}

// ---------------------------------------------------------------------------
// Formatting shared with the assistant and the UI.
// ---------------------------------------------------------------------------

export function money(value: number, digits = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}
export const pct = (value: number) => `${Math.round(value * 10) / 10}%`;
/** The company's IANA time zone if valid, else UTC. Used so server and browser format dates identically. */
export function safeTimeZone(zone: string | null | undefined): string {
  try {
    if (zone) {
      new Intl.DateTimeFormat("en-US", { timeZone: zone });
      return zone;
    }
  } catch {}
  return "UTC";
}
export function ageText(hours: number): string {
  if (hours < 1) return "under an hour";
  if (hours < 48) return `${Math.floor(hours)}h`;
  return `${Math.floor(hours / 24)} days`;
}
