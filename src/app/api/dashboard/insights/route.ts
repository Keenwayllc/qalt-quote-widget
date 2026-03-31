import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import { getEntitlements } from "@/lib/plans";
import prisma from "@/lib/prisma";
import { subDays, format, getDay, getHours, startOfWeek, endOfWeek, startOfDay, endOfDay } from "date-fns";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatHour(hour: number): string {
  if (hour === 0) return "12AM";
  if (hour === 12) return "12PM";
  return hour < 12 ? `${hour}AM` : `${hour - 12}PM`;
}

// Resolve ZIP to a rough city/region label using the zipcodes package
function resolveZipToRegion(zip: string): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const zipcodes = require("zipcodes");
    const info = zipcodes.lookup(zip);
    if (info) return `${info.city}, ${info.state}`;
  } catch {
    // package may not be available at runtime – fall back
  }
  return zip;
}

export async function GET() {
  try {
    const company = await getCurrentCompany();
    const entitlements = getEntitlements(company.subscriptionPlan);

    if (!entitlements.isAnalyticsDashboardEnabled) {
      return NextResponse.json({ error: "Analytics not available on your plan" }, { status: 403 });
    }

    // ── Fetch all quotes from the last 90 days for richer analysis ──
    const ninetyDaysAgo = subDays(new Date(), 90);
    const thirtyDaysAgo = subDays(new Date(), 30);

    const allQuotes = await prisma.quoteRequest.findMany({
      where: { companyId: company.id, createdAt: { gte: ninetyDaysAgo } },
      orderBy: { createdAt: "desc" },
    });

    const last30 = allQuotes.filter((q) => new Date(q.createdAt) >= thirtyDaysAgo);
    const prev30 = allQuotes.filter(
      (q) => new Date(q.createdAt) < thirtyDaysAgo && new Date(q.createdAt) >= subDays(thirtyDaysAgo, 30)
    );

    // ── 1. Busiest Time (day + hour) ──
    const hourDayBuckets: Record<string, number> = {};
    last30.forEach((q) => {
      const d = new Date(q.createdAt);
      const key = `${getDay(d)}-${getHours(d)}`;
      hourDayBuckets[key] = (hourDayBuckets[key] || 0) + 1;
    });

    let busiestKey = "";
    let busiestCount = 0;
    for (const [key, count] of Object.entries(hourDayBuckets)) {
      if (count > busiestCount) {
        busiestCount = count;
        busiestKey = key;
      }
    }

    let busiestTime = "Not enough data";
    if (busiestKey) {
      const [dayIdx, hourIdx] = busiestKey.split("-").map(Number);
      busiestTime = `${DAY_NAMES[dayIdx]}s @ ${formatHour(hourIdx)}`;
    }

    // ── 2. Top Region (most common pickup or dropoff ZIP area) ──
    const regionCounts: Record<string, number> = {};
    last30.forEach((q) => {
      [q.pickupZip, q.dropoffZip].forEach((zip) => {
        if (zip) {
          const prefix = zip.substring(0, 3); // group by 3-digit prefix for region
          regionCounts[prefix] = (regionCounts[prefix] || 0) + 1;
        }
      });
    });

    let topRegionZipPrefix = "";
    let topRegionCount = 0;
    for (const [prefix, count] of Object.entries(regionCounts)) {
      if (count > topRegionCount) {
        topRegionCount = count;
        topRegionZipPrefix = prefix;
      }
    }

    // Find a representative full ZIP from that prefix to resolve a city name
    let topRegion = "Not enough data";
    if (topRegionZipPrefix) {
      const representativeQuote = last30.find(
        (q) => q.pickupZip.startsWith(topRegionZipPrefix) || q.dropoffZip.startsWith(topRegionZipPrefix)
      );
      if (representativeQuote) {
        const fullZip = representativeQuote.pickupZip.startsWith(topRegionZipPrefix)
          ? representativeQuote.pickupZip
          : representativeQuote.dropoffZip;
        topRegion = resolveZipToRegion(fullZip);
      }
    }

    // ── 3. Conversion Rate ──
    // We define conversion as quotes with status !== "PENDING" (i.e. confirmed/paid)
    const totalLast30 = last30.length;
    const convertedLast30 = last30.filter(
      (q) => q.status === "CONFIRMED" || q.paymentStatus === "PAID"
    ).length;
    const conversionRate = totalLast30 > 0 ? ((convertedLast30 / totalLast30) * 100) : 0;

    // Previous period conversion for trend
    const totalPrev30 = prev30.length;
    const convertedPrev30 = prev30.filter(
      (q) => q.status === "CONFIRMED" || q.paymentStatus === "PAID"
    ).length;
    const prevConversionRate = totalPrev30 > 0 ? ((convertedPrev30 / totalPrev30) * 100) : 0;
    const conversionTrend = conversionRate > prevConversionRate ? "up" : conversionRate < prevConversionRate ? "down" : "neutral";

    // ── 4. Average Quote Value ──
    const avgValue = totalLast30 > 0 ? last30.reduce((s, q) => s + (q.estimatedPrice || 0), 0) / totalLast30 : 0;
    const prevAvgValue = totalPrev30 > 0 ? prev30.reduce((s, q) => s + (q.estimatedPrice || 0), 0) / totalPrev30 : 0;
    const avgValueTrend = avgValue > prevAvgValue ? "up" : avgValue < prevAvgValue ? "down" : "neutral";

    // ── 5. Quote Volume Trend ──
    const volumeTrend = totalLast30 > totalPrev30 ? "up" : totalLast30 < totalPrev30 ? "down" : "neutral";

    // ── 6. Busiest Day of Week ──
    const dayCounts: Record<number, number> = {};
    last30.forEach((q) => {
      const day = getDay(new Date(q.createdAt));
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    let busiestDayIdx = 0;
    let busiestDayCount = 0;
    for (const [day, count] of Object.entries(dayCounts)) {
      if (count > busiestDayCount) {
        busiestDayCount = count;
        busiestDayIdx = Number(day);
      }
    }
    const busiestDay = last30.length > 0 ? DAY_NAMES[busiestDayIdx] : "Not enough data";

    // ── 7. Top Service Type ──
    const serviceCounts: Record<string, number> = {};
    last30.forEach((q) => {
      if (q.serviceType) {
        serviceCounts[q.serviceType] = (serviceCounts[q.serviceType] || 0) + 1;
      }
    });
    let topService = "Standard";
    let topServiceCount = 0;
    for (const [svc, count] of Object.entries(serviceCounts)) {
      if (count > topServiceCount) {
        topServiceCount = count;
        topService = svc;
      }
    }

    // ── 8. Average Distance ──
    const distances = last30.filter((q) => q.distanceMiles && q.distanceMiles > 0).map((q) => q.distanceMiles!);
    const avgDistance = distances.length > 0 ? distances.reduce((a, b) => a + b, 0) / distances.length : 0;

    // ── 9. Peak Hour Distribution (for recommendations) ──
    const hourCounts: Record<number, number> = {};
    last30.forEach((q) => {
      const h = getHours(new Date(q.createdAt));
      hourCounts[h] = (hourCounts[h] || 0) + 1;
    });

    // ── 10. Weekly comparison ──
    const thisWeekStart = startOfWeek(new Date());
    const thisWeekEnd = endOfWeek(new Date());
    const lastWeekStart = subDays(thisWeekStart, 7);
    const lastWeekEnd = subDays(thisWeekEnd, 7);

    const thisWeekQuotes = last30.filter(
      (q) => new Date(q.createdAt) >= thisWeekStart && new Date(q.createdAt) <= thisWeekEnd
    ).length;
    const lastWeekQuotes = last30.filter(
      (q) => new Date(q.createdAt) >= lastWeekStart && new Date(q.createdAt) <= lastWeekEnd
    ).length;
    const weekOverWeekChange = lastWeekQuotes > 0 ? ((thisWeekQuotes - lastWeekQuotes) / lastWeekQuotes) * 100 : 0;

    // ── Build Optimize Conversion Recommendations ──
    const recommendations: { title: string; description: string; action: string; actionUrl: string; priority: "high" | "medium" | "low"; icon: string }[] = [];

    // Check widget settings for optimization opportunities
    const widgetSettings = await prisma.widgetSettings.findFirst({
      where: { companyId: company.id },
    });

    if (widgetSettings) {
      if (!widgetSettings.backgroundImageUrl) {
        recommendations.push({
          title: "Add a Background Image",
          description: "Widgets with a custom background image see up to 23% higher engagement. Add a professional image to make your quote form stand out.",
          action: "Customize Widget",
          actionUrl: "/dashboard/widget",
          priority: "high",
          icon: "image",
        });
      }

      if (widgetSettings.buttonText === "Get Instant Quote") {
        recommendations.push({
          title: "Customize Your CTA Button",
          description: "Personalized call-to-action text converts better than generic defaults. Try something like 'Get My Delivery Price' or 'See My Rate Now'.",
          action: "Edit Button Text",
          actionUrl: "/dashboard/widget",
          priority: "medium",
          icon: "type",
        });
      }

      if (widgetSettings.headerText === "Delivery Quote Calculator") {
        recommendations.push({
          title: "Update Your Widget Header",
          description: "A compelling header builds trust. Try 'Get Your Instant Delivery Quote' or include your company name for brand recognition.",
          action: "Edit Header",
          actionUrl: "/dashboard/widget",
          priority: "medium",
          icon: "heading",
        });
      }

      if (!widgetSettings.logoUrl) {
        recommendations.push({
          title: "Add Your Company Logo",
          description: "Displaying your logo increases trust and brand recognition. Customers are more likely to submit quotes when they see a professional brand presence.",
          action: "Upload Logo",
          actionUrl: "/dashboard/widget",
          priority: "high",
          icon: "shield",
        });
      }

      if (!widgetSettings.showExtras) {
        recommendations.push({
          title: "Enable Service Extras",
          description: "Offering extras like inside delivery and stairs handling increases average quote value. Your current avg is $" + avgValue.toFixed(0) + " — extras could push this higher.",
          action: "Enable Extras",
          actionUrl: "/dashboard/widget",
          priority: "medium",
          icon: "plus-circle",
        });
      }
    }

    // Data-driven recommendations
    if (conversionRate < 5) {
      recommendations.push({
        title: "Improve Your Conversion Rate",
        description: `Your conversion rate is ${conversionRate.toFixed(1)}%. Consider reviewing your pricing — if quotes feel too high, customers may abandon. Try adjusting your base rate or minimum charge.`,
        action: "Review Pricing",
        actionUrl: "/dashboard/pricing",
        priority: "high",
        icon: "trending-up",
      });
    }

    if (totalLast30 < 10) {
      recommendations.push({
        title: "Drive More Traffic to Your Widget",
        description: "You've received only " + totalLast30 + " quotes in the last 30 days. Make sure your widget is prominently placed on your website — above the fold works best.",
        action: "Get Embed Code",
        actionUrl: "/dashboard/embed",
        priority: "high",
        icon: "code",
      });
    }

    if (avgDistance > 100) {
      recommendations.push({
        title: "Optimize Long-Distance Pricing",
        description: `Your average delivery distance is ${avgDistance.toFixed(0)} miles. Consider offering tiered rates for long-haul deliveries to stay competitive while maintaining margins.`,
        action: "Adjust Rates",
        actionUrl: "/dashboard/pricing",
        priority: "medium",
        icon: "map",
      });
    }

    if (busiestDayCount > 0 && Object.keys(dayCounts).length >= 3) {
      const quietDays = Object.entries(dayCounts)
        .sort(([, a], [, b]) => a - b)
        .slice(0, 2)
        .map(([d]) => DAY_NAMES[Number(d)]);
      if (quietDays.length > 0) {
        recommendations.push({
          title: "Boost Slow-Day Volume",
          description: `${quietDays.join(" and ")} ${quietDays.length > 1 ? "are" : "is"} your slowest. Consider running promotions or offering discounts on these days to even out your workload.`,
          action: "View Analytics",
          actionUrl: "/dashboard/analytics",
          priority: "low",
          icon: "calendar",
        });
      }
    }

    // Always provide at least one recommendation
    if (recommendations.length === 0) {
      recommendations.push({
        title: "Keep Up the Great Work!",
        description: "Your widget is well-optimized. Continue monitoring your analytics and consider A/B testing different widget configurations to find even better results.",
        action: "View Settings",
        actionUrl: "/dashboard/widget",
        priority: "low",
        icon: "check-circle",
      });
    }

    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return NextResponse.json({
      insights: {
        busiestTime,
        topRegion,
        conversionRate: conversionRate.toFixed(1) + "%",
        conversionTrend,
        avgQuoteValue: "$" + avgValue.toFixed(0),
        avgValueTrend,
        totalQuotes30d: totalLast30,
        volumeTrend,
        busiestDay,
        topService: topService.charAt(0).toUpperCase() + topService.slice(1).toLowerCase(),
        avgDistance: avgDistance.toFixed(1) + " mi",
        weekOverWeekChange: weekOverWeekChange.toFixed(1) + "%",
        weekOverWeekTrend: weekOverWeekChange > 0 ? "up" : weekOverWeekChange < 0 ? "down" : "neutral",
      },
      recommendations,
      meta: {
        dataPoints: totalLast30,
        analysisWindow: "30 days",
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Insights API error:", error);
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 });
  }
}
