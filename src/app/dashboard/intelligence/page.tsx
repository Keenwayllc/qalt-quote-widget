import { loadMerchantIntelligence } from "@/lib/merchant-intelligence-data";
import {
  QUOTE_FILTERS,
  buildInsights,
  matchesFilter,
  paginate,
  parseFilter,
  parsePeriod,
  routeLabel,
  searchQuotes,
  vehicleLabel,
} from "@/lib/merchant-intelligence";
import { SUGGESTED_QUESTIONS } from "@/lib/merchant-assistant";
import IntelligenceDashboard from "./IntelligenceDashboard";

export const dynamic = "force-dynamic";

export default async function IntelligencePage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; filter?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const period = parsePeriod(params.period);
  const filter = parseFilter(params.filter);
  const search = typeof params.q === "string" ? params.q.slice(0, 80) : "";
  const data = await loadMerchantIntelligence();
  const { quotes, now } = data;
  const alertIds = new Set(data.alerts.flatMap((a) => (a.quoteId ? [a.quoteId] : [])));
  const searched = searchQuotes(quotes, search);
  const table = paginate(
    searched.filter((q) => matchesFilter(q, filter, alertIds)),
    Number.parseInt(params.page ?? "1", 10),
  );
  const monthAgo = now.getTime() - 30 * 86_400_000;

  return (
    <IntelligenceDashboard
      view={{
        period,
        filter,
        search,
        updatedAt: now.toISOString(),
        timeZone: data.timeZone,
        costTableReady: data.costTableReady,
        costsConfigured: data.costsConfigured,
        truncated: data.truncated,
        pipeline: {
          newQuotes: quotes.filter((q) => q.stage === "new").length,
          followUp: quotes.filter((q) => q.stage === "follow_up").length,
          booked30d: quotes.filter((q) => q.stage === "booked" && new Date(q.createdAt).getTime() >= monthAgo).length,
          ...data.jobs,
        },
        insights: buildInsights(quotes, period, now),
        alerts: data.alerts.slice(0, 12),
        alertCount: data.alerts.length,
        recommendations: data.recommendations,
        filterCounts: Object.fromEntries(
          QUOTE_FILTERS.map((f) => [f, searched.filter((q) => matchesFilter(q, f, alertIds)).length]),
        ) as Record<(typeof QUOTE_FILTERS)[number], number>,
        table: {
          page: table.page,
          pages: table.pages,
          total: table.total,
          rows: table.rows.map((q) => ({
            id: q.id,
            customerName: q.customerName,
            createdAt: new Date(q.createdAt).toISOString(),
            route: routeLabel(q),
            vehicle: vehicleLabel(q),
            serviceType: q.serviceType,
            price: q.estimatedPrice,
            distanceMiles: q.distanceMiles,
            stage: q.stage,
            status: q.status,
            paymentStatus: q.paymentStatus,
            estimate: q.estimate,
            attention: alertIds.has(q.id),
          })),
        },
        suggestedQuestions: SUGGESTED_QUESTIONS,
      }}
    />
  );
}
