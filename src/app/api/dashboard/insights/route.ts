import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import { subDays, getDay, getHours, startOfWeek, endOfWeek } from "date-fns";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export async function GET() {
  try {
    const company = await getCurrentCompany();

    const ninetyDaysAgo = subDays(new Date(), 90);
    const thirtyDaysAgo = subDays(new Date(), 30);
    const sixtyDaysAgo = subDays(new Date(), 60);
    const thisWeekStart = startOfWeek(new Date());
    const lastWeekStart = subDays(thisWeekStart, 7);
    const lastWeekEnd = subDays(thisWeekStart, 1);

    const allQuotes = await prisma.quoteRequest.findMany({
      where: { companyId: company.id, createdAt: { gte: ninetyDaysAgo } },
      select: {
        id: true,
        createdAt: true,
        pickupZip: true,
        dropoffZip: true,
        serviceType: true,
        estimatedPrice: true,
        distanceMiles: true,
        status: true,
      },
    });

    const last30 = allQuotes.filter((q) => q.createdAt >= thirtyDaysAgo);
    const prev30 = allQuotes.filter((q) => q.createdAt >= sixtyDaysAgo && q.createdAt < thirtyDaysAgo);
    const thisWeek = allQuotes.filter((q) => q.createdAt >= thisWeekStart);
    const lastWeek = allQuotes.filter((q) => q.createdAt >= lastWeekStart && q.createdAt <= lastWeekEnd);

    // Busiest time — group by day-of-week + hour bucket
    const timeBuckets = new Map<string, number>();
    allQuotes.forEach((q) => {
      const day = DAY_NAMES[getDay(q.createdAt)];
      const hour = getHours(q.createdAt);
      const period = hour < 12 ? "AM" : "PM";
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const key = `${day}s @ ${displayHour}${period}`;
      timeBuckets.set(key, (timeBuckets.get(key) ?? 0) + 1);
    });
    let busiestTime = "Not enough data";
    if (timeBuckets.size > 0) {
      busiestTime = [...timeBuckets.entries()].reduce((a, b) => (b[1] > a[1] ? b : a))[0];
    }

    // Top region — group by 3-digit ZIP prefix
    const regionBuckets = new Map<string, number>();
    allQuotes.forEach((q) => {
      const prefix = q.pickupZip?.slice(0, 3);
      if (prefix) regionBuckets.set(prefix, (regionBuckets.get(prefix) ?? 0) + 1);
    });
    let topRegion = "Not enough data";
    if (regionBuckets.size > 0) {
      const topPrefix = [...regionBuckets.entries()].reduce((a, b) => (b[1] > a[1] ? b : a))[0];
      topRegion = topPrefix;
    }

    // Conversion rate (last 30 days)
    const converted30 = last30.filter((q) => q.status === "CONFIRMED" || q.status === "PAID").length;
    const convRate30 = last30.length > 0 ? (converted30 / last30.length) * 100 : 0;
    const converted30prev = prev30.filter((q) => q.status === "CONFIRMED" || q.status === "PAID").length;
    const convRatePrev = prev30.length > 0 ? (converted30prev / prev30.length) * 100 : 0;
    const convTrend: "up" | "down" | "neutral" =
      convRate30 > convRatePrev ? "up" : convRate30 < convRatePrev ? "down" : "neutral";

    // Top service
    const serviceBuckets = new Map<string, number>();
    allQuotes.forEach((q) => {
      if (q.serviceType) serviceBuckets.set(q.serviceType, (serviceBuckets.get(q.serviceType) ?? 0) + 1);
    });
    let topService = "Not enough data";
    if (serviceBuckets.size > 0) {
      topService = [...serviceBuckets.entries()].reduce((a, b) => (b[1] > a[1] ? b : a))[0];
    }

    // Avg quote value
    const avgValue30 = last30.length > 0 ? last30.reduce((s, q) => s + q.estimatedPrice, 0) / last30.length : 0;
    const avgValuePrev = prev30.length > 0 ? prev30.reduce((s, q) => s + q.estimatedPrice, 0) / prev30.length : 0;
    const valueTrend: "up" | "down" | "neutral" =
      avgValue30 > avgValuePrev ? "up" : avgValue30 < avgValuePrev ? "down" : "neutral";

    // Avg distance
    const distanceQuotes = allQuotes.filter((q) => q.distanceMiles && q.distanceMiles > 0);
    const avgDistance =
      distanceQuotes.length > 0 ? distanceQuotes.reduce((s, q) => s + (q.distanceMiles ?? 0), 0) / distanceQuotes.length : 0;

    // Week over week
    const wowChange = lastWeek.length > 0 ? ((thisWeek.length - lastWeek.length) / lastWeek.length) * 100 : null;

    return NextResponse.json({
      busiestTime,
      topRegion,
      conversionRate: convRate30,
      convTrend,
      topService,
      avgQuoteValue: avgValue30,
      valueTrend,
      avgDistance,
      weekOverWeek: wowChange,
      thisWeekCount: thisWeek.length,
      lastWeekCount: lastWeek.length,
      totalLast30: last30.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
