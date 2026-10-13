import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import {
  analyticsDays,
  analyticsWindow,
  buildAnalytics,
} from "@/lib/analytics-report";
import AnalyticsDashboard from "./AnalyticsClientComponents";

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const company = await getCurrentCompany();
  const days = analyticsDays((await searchParams).days);
  const now = new Date();
  const { previousStart } = analyticsWindow(days, now);
  const quotes = await prisma.quoteRequest.findMany({
    where: {
      companyId: company.id,
      deletedAt: null,
      createdAt: { gte: previousStart, lte: now },
    },
    select: {
      id: true,
      createdAt: true,
      status: true,
      paymentStatus: true,
      estimatedPrice: true,
      distanceMiles: true,
      serviceType: true,
      pickupZip: true,
      dropoffZip: true,
    },
  });
  return <AnalyticsDashboard report={buildAnalytics(quotes, days, now)} />;
}
