import { getCurrentCompany, getDefaultPricing } from "@/lib/session";
import prisma from "@/lib/prisma";
import {
  COST_FIELDS,
  analyzeQuotes,
  buildAlerts,
  buildRecommendations,
  type CostProfile,
  type IntelJob,
  type IntelQuote,
  type PricingContext,
} from "@/lib/merchant-intelligence";

// Recommendations look back 90 days; the cap keeps the page fast for very busy
// merchants (the UI says when it was reached).
export const QUOTE_WINDOW_DAYS = 90;
export const QUOTE_LIMIT = 2000;
const JOB_ACTIVE = ["PENDING", "READY", "IN_PROGRESS", "ISSUE"];

type Company = Awaited<ReturnType<typeof getCurrentCompany>>;

/** True when the MerchantCostProfile migration has not been applied yet. */
function isMissingTable(error: unknown) {
  const e = error as { code?: string; message?: string };
  return e?.code === "P2021" || /MerchantCostProfile.*does not exist/i.test(e?.message ?? "");
}

const COST_SELECT = {
  vehicleKey: true,
  label: true,
  followUpAfterHours: true,
  ...Object.fromEntries(COST_FIELDS.map((f) => [f.key, true])),
} as const;

/** Cost rows for one company. `available: false` = table not migrated yet. */
export async function loadCostProfiles(companyId: string): Promise<{ profiles: CostProfile[]; available: boolean }> {
  try {
    const rows = await prisma.merchantCostProfile.findMany({
      where: { companyId },
      orderBy: { vehicleKey: "asc" },
      select: COST_SELECT,
    });
    return { profiles: rows as unknown as CostProfile[], available: true };
  } catch (error) {
    if (isMissingTable(error)) return { profiles: [], available: false };
    throw error;
  }
}

export function pricingContext(company: Company): PricingContext {
  const pricing = getDefaultPricing(company);
  return {
    defaultProfileId: pricing?.id ?? null,
    baseRatePerMile: pricing?.baseRatePerMile ?? null,
    minimumCharge: pricing?.minimumCharge ?? null,
    useMinimumCharge: pricing?.useMinimumCharge ?? false,
    hasFormSpecificPricing: company.pricingProfiles.some((p) => p.widgetSettingsId !== null),
  };
}

export const QUOTE_SELECT = {
  id: true,
  createdAt: true,
  customerName: true,
  status: true,
  paymentStatus: true,
  estimatedPrice: true,
  distanceMiles: true,
  vehicleType: true,
  serviceType: true,
  pickupZip: true,
  dropoffZip: true,
  pricingBreakdown: true,
} as const;

/**
 * Everything the intelligence surfaces need, scoped to the signed-in company.
 * The company id always comes from the session cookie, never from the request.
 */
export async function loadMerchantIntelligence(now = new Date()) {
  const company = await getCurrentCompany();
  const tenant = { companyId: company.id };
  const since = new Date(now.getTime() - QUOTE_WINDOW_DAYS * 86_400_000);
  const monthAgo = new Date(now.getTime() - 30 * 86_400_000);
  const [quotes, costs, jobCounts, completed, issueJobs] = await Promise.all([
    prisma.quoteRequest.findMany({
      where: { ...tenant, deletedAt: null, createdAt: { gte: since, lte: now } },
      orderBy: { createdAt: "desc" },
      take: QUOTE_LIMIT,
      select: QUOTE_SELECT,
    }),
    loadCostProfiles(company.id),
    prisma.job.groupBy({ by: ["status"], where: { ...tenant, status: { in: JOB_ACTIVE } }, _count: { _all: true } }),
    prisma.job.count({ where: { ...tenant, status: "COMPLETED", updatedAt: { gte: monthAgo } } }),
    prisma.job.findMany({
      where: { ...tenant, status: "ISSUE" },
      orderBy: { updatedAt: "desc" },
      take: 50,
      select: { id: true, status: true, quoteRequestId: true, scheduledDate: true, updatedAt: true },
    }),
  ]);
  const profiles = costs.profiles;
  const pricing = pricingContext(company);
  const analyzed = analyzeQuotes(quotes as IntelQuote[], profiles, now);
  const jobCount = (status: string) => jobCounts.find((j) => j.status === status)?._count._all ?? 0;
  return {
    companyId: company.id,
    companyName: company.name,
    now,
    profiles,
    costTableReady: costs.available,
    costsConfigured: profiles.some((p) => p.vehicleKey === ""),
    pricing,
    quotes: analyzed,
    truncated: quotes.length === QUOTE_LIMIT,
    jobs: {
      scheduled: jobCount("PENDING") + jobCount("READY"),
      inProgress: jobCount("IN_PROGRESS"),
      issue: jobCount("ISSUE"),
      completed30d: completed,
    },
    alerts: buildAlerts(analyzed, issueJobs as IntelJob[], profiles, now),
    recommendations: buildRecommendations(analyzed, profiles, pricing, now),
  };
}

export type MerchantIntelligence = Awaited<ReturnType<typeof loadMerchantIntelligence>>;
