/**
 * Quinn, the Qalt merchant assistant (rule-based release). Answers merchant questions from verified
 * calculations in merchant-intelligence.ts; it never invents numbers, never
 * writes data and never contacts customers. Pure: callers pass rows already
 * scoped to the signed-in company.
 */
import {
  PERIOD_LABEL,
  MIN_SAMPLE,
  buildInsights,
  groupStats,
  isBooked,
  isClosed,
  money,
  pct,
  ageText,
  requiredRevenue,
  targetMargin,
  vehicleKey,
  vehicleLabel,
  type AnalyzedQuote,
  type CostProfile,
  type InsightPeriod,
  type Recommendation,
} from "./merchant-intelligence";

export type AssistantIntent =
  | "revenue"
  | "most_profitable"
  | "why_unprofitable"
  | "low_margin"
  | "charging_enough"
  | "best_vehicle"
  | "outstanding"
  | "conversion"
  | "recommendations"
  | "help";

export type AssistantAnswer = {
  intent: AssistantIntent;
  answer: string;
  facts: { label: string; value: string }[];
  quoteIds: string[];
  matched: boolean;
};

export const SUGGESTED_QUESTIONS = [
  "What was my most profitable quote this week?",
  "Which deliveries have low margins?",
  "Am I charging enough for cargo van deliveries?",
  "Which customers have outstanding quotes?",
  "How much revenue did I generate this month?",
  "Which vehicle type performs best?",
  "Why is this quote unprofitable?",
];

export const MAX_QUESTION_LENGTH = 300;

type Ctx = { quotes: AnalyzedQuote[]; profiles: CostProfile[]; recommendations: Recommendation[]; now: Date; quoteId?: string | null; timeZone?: string };
type Estimated = AnalyzedQuote & { estimate: Extract<AnalyzedQuote["estimate"], { status: "ok" }> };

const ok = (q: AnalyzedQuote): q is Estimated => q.estimate.status === "ok";
const time = (v: Date | string) => new Date(v).getTime();
const who = (q: AnalyzedQuote) => q.customerName?.trim() || "Unnamed customer";
let zone = "UTC";
const when = (q: AnalyzedQuote) => new Date(q.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: zone });
const NO_COSTS = "I can't estimate profit yet because your cost settings are incomplete. Add fuel, driver cost and average speed under Cost settings and I'll answer from your real numbers.";

export function detectPeriod(text: string, fallback: InsightPeriod): InsightPeriod {
  if (/\b(today|24 ?h|day)\b/.test(text)) return "day";
  if (/\b(month|30 ?days?)\b/.test(text)) return "month";
  if (/\b(week|7 ?days?)\b/.test(text)) return "week";
  return fallback;
}

export function detectIntent(text: string): AssistantIntent {
  const t = text.toLowerCase();
  if (/\bwhy\b/.test(t) && /(unprofitable|loss|losing|low margin|not profitable|lose money)/.test(t)) return "why_unprofitable";
  if (/(most profitable|best quote|highest (profit|margin)|top quote)/.test(t)) return "most_profitable";
  if (/(charging enough|charge enough|underpric|under-pric|priced right|pricing right|too cheap)/.test(t)) return "charging_enough";
  if (/(low margin|low-margin|unprofitable|losing money|lose money|below target|thin margin)/.test(t)) return "low_margin";
  if (/vehicle/.test(t) && /(best|perform|most profitable|compare|which)/.test(t)) return "best_vehicle";
  if (/(outstanding|pending|open quote|follow ?up|haven.?t (booked|paid)|waiting)/.test(t)) return "outstanding";
  if (/(conversion|close rate|booking rate|win rate|how many.*book)/.test(t)) return "conversion";
  if (/(revenue|earn|made|make|sales|income|generate|paid)/.test(t)) return "revenue";
  if (/(recommend|suggest|improve|advice|what should i)/.test(t)) return "recommendations";
  return "help";
}

function inPeriod(quotes: AnalyzedQuote[], period: InsightPeriod, now: Date) {
  const days = { day: 1, week: 7, month: 30 }[period];
  const start = now.getTime() - days * 86_400_000;
  return quotes.filter((q) => time(q.createdAt) >= start);
}

function line(q: Estimated) {
  return `${who(q)} (${when(q)}): ${money(q.estimatedPrice, 2)} quote, ${money(q.estimate.profit, 2)} estimated profit, ${pct(q.estimate.marginPercent)} margin`;
}

export function answerQuestion(question: string, ctx: Ctx): AssistantAnswer {
  zone = ctx.timeZone ?? "UTC";
  const text = question.slice(0, MAX_QUESTION_LENGTH).toLowerCase();
  const intent = detectIntent(text);
  const base = { intent, facts: [] as AssistantAnswer["facts"], quoteIds: [] as string[], matched: intent !== "help" };
  const estimated = ctx.quotes.filter(ok);
  const hasCosts = ctx.quotes.length === 0 || estimated.length > 0;

  switch (intent) {
    case "revenue": {
      const period = detectPeriod(text, "month");
      const s = buildInsights(ctx.quotes, period, ctx.now);
      return {
        ...base,
        answer:
          s.totalQuotes === 0
            ? `You had no quote requests in the ${s.label}.`
            : `In the ${s.label} you collected ${money(s.paidRevenue, 2)} in online payments from ${s.paidCount} paid quote${s.paidCount === 1 ? "" : "s"}. Booked quotes (paid or marked confirmed/won) total ${money(s.bookedValue, 2)} in quoted value. Payments you take offline are not tracked by Qalt, so booked value is an estimate, not collected money.`,
        facts: [
          { label: "Paid online", value: money(s.paidRevenue, 2) },
          { label: "Booked value", value: money(s.bookedValue, 2) },
          { label: "All quoted value", value: money(s.quotedValue, 2) },
          ...(s.estimatedProfit !== null ? [{ label: "Estimated profit on booked", value: money(s.estimatedProfit, 2) }] : []),
        ],
      };
    }
    case "most_profitable": {
      if (!hasCosts) return { ...base, answer: NO_COSTS };
      const period = detectPeriod(text, "week");
      const rows = inPeriod(estimated, period, ctx.now).filter((q) => !isClosed(q)) as Estimated[];
      if (!rows.length) return { ...base, answer: `No quotes with a profit estimate in the ${PERIOD_LABEL[period]}.` };
      const top = [...rows].sort((a, b) => b.estimate.profit - a.estimate.profit)[0];
      return {
        ...base,
        answer: `Your most profitable quote in the ${PERIOD_LABEL[period]} is ${line(top)}.${isBooked(top) ? " It is booked." : " It is not booked yet."}`,
        quoteIds: [top.id],
      };
    }
    case "low_margin": {
      if (!hasCosts) return { ...base, answer: NO_COSTS };
      const rows = estimated
        .filter((q) => q.estimate.tone !== "healthy" && !isClosed(q) && ctx.now.getTime() - time(q.createdAt) <= 30 * 86_400_000)
        .sort((a, b) => a.estimate.marginPercent - b.estimate.marginPercent);
      if (!rows.length) return { ...base, answer: "None of your open or booked quotes from the last 30 days are below your target margin." };
      const shown = rows.slice(0, 5);
      return {
        ...base,
        answer: `${rows.length} quote${rows.length === 1 ? " is" : "s are"} below target margin in the last 30 days${rows.length > 5 ? " (lowest 5 shown)" : ""}:\n${shown.map((q) => `• ${line(q)}`).join("\n")}`,
        quoteIds: shown.map((q) => q.id),
      };
    }
    case "why_unprofitable": {
      if (!hasCosts) return { ...base, answer: NO_COSTS };
      const picked =
        estimated.find((q) => q.id === ctx.quoteId) ??
        estimated.find((q) => text.includes(who(q).toLowerCase()) && who(q).length > 2) ??
        estimated.filter((q) => q.estimate.tone !== "healthy" && !isClosed(q)).sort((a, b) => time(b.createdAt) - time(a.createdAt))[0];
      if (!picked) return { ...base, answer: "I couldn't find an unprofitable quote. Open a quote and ask again, or name the customer." };
      const e = picked.estimate;
      const drivers = Object.entries({
        "driver time": e.costs.driver,
        fuel: e.costs.fuel,
        "deadhead (empty) driving": e.costs.deadhead,
        tolls: e.costs.tolls,
        "other operating costs": e.costs.other,
      })
        .filter(([, v]) => v > 0)
        .sort((a, b) => b[1] - a[1]);
      const [topName, topValue] = drivers[0] ?? ["costs", e.totalCost];
      const needed = requiredRevenue(e);
      const minimum =
        picked.pricingBreakdown && typeof picked.pricingBreakdown === "object" && (picked.pricingBreakdown as { minimumApplied?: unknown }).minimumApplied === true;
      const verdict =
        e.tone === "healthy"
          ? `This quote meets your ${pct(e.targetMarginPercent)} target.`
          : `Estimated costs of ${money(e.totalCost, 2)} against a ${money(e.revenue, 2)} quote leave ${money(e.profit, 2)} (${pct(e.marginPercent)}), under your ${pct(e.targetMarginPercent)} target.`;
      return {
        ...base,
        answer: `${who(picked)}'s quote (${when(picked)}): ${verdict} The biggest cost is ${topName} at ${money(topValue, 2)}, based on ${e.assumptions.estimatedHours} estimated hours and ${e.assumptions.loadedMiles + e.assumptions.deadheadMiles} total miles.${minimum ? " This price came from your minimum charge, so the minimum may be too low for this trip." : ""}${e.tone === "healthy" || needed === null ? "" : ` To hit your target this trip would need about ${money(Math.ceil(needed))}.`}`,
        facts: drivers.map(([k, v]) => ({ label: k[0].toUpperCase() + k.slice(1), value: money(v, 2) })),
        quoteIds: [picked.id],
      };
    }
    case "charging_enough": {
      if (!hasCosts) return { ...base, answer: NO_COSTS };
      const groups = groupStats(estimated, vehicleLabel);
      const named = groups.find((g) => text.includes(g.label.toLowerCase()) || text.includes(vehicleKey(g.label)));
      const target = targetMargin(ctx.profiles, named?.label);
      const g = named ?? groupStats(estimated, () => "all your quotes")[0];
      if (!g || g.estimated === 0) return { ...base, answer: "There are no estimated quotes to compare yet." };
      const caveat = g.estimated < MIN_SAMPLE ? ` That's only ${g.estimated} quote${g.estimated === 1 ? "" : "s"}, so treat it as an early signal, not a conclusion.` : "";
      const verdict =
        g.averageMargin === null
          ? "I can't compute a margin for these quotes."
          : g.averageMargin >= target
            ? `Yes: they average a ${pct(g.averageMargin)} estimated margin, at or above your ${pct(target)} target.`
            : `Not quite: they average a ${pct(g.averageMargin)} estimated margin against your ${pct(target)} target. Review your mileage rate, vehicle fee or minimum charge.`;
      return {
        ...base,
        answer: `${named ? `For ${g.label} deliveries` : "Across all vehicles"} (${g.estimated} estimated quote${g.estimated === 1 ? "" : "s"}, last 90 days): ${verdict}${caveat}${named ? "" : " Name a vehicle to check it on its own."}`,
        facts: [
          { label: "Estimated revenue", value: money(g.revenue, 2) },
          { label: "Estimated profit", value: money(g.profit, 2) },
          ...(g.costPerMile !== null ? [{ label: "Cost per mile", value: money(g.costPerMile, 2) }] : []),
        ],
      };
    }
    case "best_vehicle": {
      if (!hasCosts) return { ...base, answer: NO_COSTS };
      const groups = groupStats(estimated, vehicleLabel).filter((g) => g.averageMargin !== null);
      if (!groups.length) return { ...base, answer: "There are no estimated quotes by vehicle yet." };
      const ranked = [...groups].sort((a, b) => b.averageMargin! - a.averageMargin!);
      const solid = ranked.filter((g) => g.estimated >= MIN_SAMPLE);
      const best = solid[0] ?? ranked[0];
      return {
        ...base,
        answer: `${best.label} performs best with a ${pct(best.averageMargin!)} average estimated margin across ${best.estimated} quotes${best.conversionRate !== null ? ` and a ${pct(best.conversionRate)} booking rate` : ""}.${solid.length ? "" : ` Every vehicle has fewer than ${MIN_SAMPLE} estimated quotes, so this is an early signal.`}`,
        facts: ranked.slice(0, 6).map((g) => ({ label: g.label, value: `${pct(g.averageMargin!)} margin · ${g.estimated} quotes` })),
      };
    }
    case "outstanding": {
      const open = ctx.quotes
        .filter((q) => q.stage === "new" || q.stage === "follow_up")
        .sort((a, b) => time(a.createdAt) - time(b.createdAt));
      if (!open.length) return { ...base, answer: "You have no outstanding quotes right now." };
      const value = open.reduce((s, q) => s + Math.max(0, q.estimatedPrice || 0), 0);
      const shown = open.slice(0, 8);
      return {
        ...base,
        answer: `${open.length} customer quote${open.length === 1 ? " is" : "s are"} still pending, worth ${money(value, 2)} in quoted value${open.length > 8 ? " (oldest 8 shown)" : ""}:\n${shown.map((q) => `• ${who(q)}: ${money(q.estimatedPrice, 2)}, waiting ${ageText(q.ageHours)}${q.stage === "follow_up" ? " (needs follow-up)" : ""}`).join("\n")}\nI won't contact anyone for you. Reach out from your Quotes page when you're ready.`,
        quoteIds: shown.map((q) => q.id),
      };
    }
    case "conversion": {
      const period = detectPeriod(text, "month");
      const s = buildInsights(ctx.quotes, period, ctx.now);
      return {
        ...base,
        answer:
          s.conversionRate === null
            ? `No quote requests in the ${s.label}.`
            : `In the ${s.label}, ${s.bookedCount} of ${s.totalQuotes} quotes booked (${pct(s.conversionRate)}).${s.totalQuotes < 10 ? " That's a small sample, so expect it to move." : ""}`,
      };
    }
    case "recommendations": {
      if (!ctx.recommendations.length) {
        return { ...base, answer: `I don't have pricing recommendations yet. I need at least ${MIN_SAMPLE} estimated quotes in a group before suggesting changes.` };
      }
      return {
        ...base,
        answer: ctx.recommendations
          .slice(0, 3)
          .map((r) => `• ${r.title}: ${r.reasoning}`)
          .join("\n"),
      };
    }
    default:
      return {
        ...base,
        answer: `I'm Quinn. I answer questions from your Qalt quotes and cost settings. Try one of these:\n${SUGGESTED_QUESTIONS.map((q) => `• ${q}`).join("\n")}`,
      };
  }
}
