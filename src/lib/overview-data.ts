import { getCurrentCompany, getDefaultPricing } from "@/lib/session";
import { getEntitlements, quotaMonthStart } from "@/lib/plans";
import prisma from "@/lib/prisma";
import { getCustomerFacingContact } from "@/lib/customer-contact";
import { analyticsWindow, buildAnalytics } from "@/lib/analytics-report";
import { widgetInstallationStatus } from "@/lib/widget-installations";

const ACTIVE = ["PENDING", "READY", "IN_PROGRESS", "ISSUE"];
function result<T>(value: PromiseSettledResult<T>): T | null {
  return value.status === "fulfilled" ? value.value : null;
}
export async function loadOverview(now = new Date()) {
  const company = await getCurrentCompany();
  const pricing = getDefaultPricing(company);
  const monthStart = quotaMonthStart(now);
  const { previousStart } = analyticsWindow(7, now);
  const tenant = { companyId: company.id, deletedAt: null };
  const sources = await Promise.allSettled([
    prisma.quoteRequest.findMany({
      where: tenant,
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        customerName: true,
        createdAt: true,
        estimatedPrice: true,
        pickupZip: true,
        dropoffZip: true,
        status: true,
        paymentStatus: true,
        distanceMiles: true,
      },
    }),
    prisma.quoteRequest.count({ where: tenant }),
    // Quota includes deleted requests: deleting a quote does not return allowance.
    prisma.quoteRequest.count({
      where: {
        companyId: company.id,
        createdAt: { gte: monthStart, lte: now },
      },
    }),
    prisma.quoteRequest.aggregate({
      where: {
        ...tenant,
        status: "PENDING",
        OR: [{ paymentStatus: null }, { paymentStatus: { not: "PAID" } }],
      },
      _count: { _all: true },
      _sum: { estimatedPrice: true },
    }),
    prisma.quoteRequest.findMany({
      where: { ...tenant, createdAt: { gte: previousStart, lte: now } },
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
    }),
    prisma.job.findMany({
      where: { companyId: company.id, status: { in: ACTIVE } },
      orderBy: { scheduledDate: "asc" },
      take: 4,
      select: {
        id: true,
        status: true,
        scheduledDate: true,
        stops: {
          orderBy: { order: "asc" },
          select: { stopNote: { select: { companyName: true } } },
        },
      },
    }),
    prisma.job.groupBy({
      by: ["status"],
      where: { companyId: company.id, status: { in: ACTIVE } },
      _count: { _all: true },
    }),
    prisma.widgetInstallation.findFirst({
      where: { companyId: company.id },
      orderBy: { lastSeenAt: "desc" },
      select: { lastSeenAt: true },
    }),
    getCustomerFacingContact(company.id),
  ] as const);
  const [
    recentSource,
    totalSource,
    monthlySource,
    pendingSource,
    chartSource,
    jobsSource,
    countsSource,
    embedSource,
    contactSource,
  ] = sources;
  const recent = result(recentSource),
    total = result(totalSource),
    monthly = result(monthlySource),
    pending = result(pendingSource),
    chart = result(chartSource);
  const jobs = result(jobsSource),
    jobCounts = result(countsSource),
    contact = result(contactSource);
  const embedKnown = embedSource.status === "fulfilled";
  const embed = embedKnown ? embedSource.value : null;
  const embedded = embedKnown ? !!embed : null;
  const branded = company.widgetSettings.some(
    (w) =>
      !!w.logoUrl ||
      !!w.backgroundImageUrl ||
      w.primaryColor !== "#1E40AF" ||
      w.buttonText !== "Get Instant Quote",
  );
  const setup = [
    {
      id: "pricing",
      label: "Pricing profile",
      description: "A saved profile supplies your customer estimates.",
      href: "/dashboard/pricing",
      done: !!pricing,
    },
    {
      id: "branding",
      label: "Customer experience",
      description: "Review your logo, colors and quote form.",
      href: "/dashboard/widget",
      done: branded,
    },
    {
      id: "embed",
      label: "Website installation",
      description:
        "External embed loads confirm a detected installation, not uptime.",
      href: "/dashboard/embed",
      done: embedded,
    },
    {
      id: "contact",
      label: "Customer contact",
      description: "Add an email or phone for customer questions.",
      href: "/dashboard/settings/customer-contact",
      done: contact ? !!(contact.email || contact.phone) : null,
    },
  ];
  const quotaLimit = getEntitlements(
    company.subscriptionPlan,
  ).maxQuotesPerMonth;
  const quotaReached =
    monthly !== null && quotaLimit !== "unlimited" && monthly >= quotaLimit;
  return {
    companyName: company.name,
    plan: company.subscriptionPlan,
    updatedAt: now.toISOString(),
    quotaLimit,
    monthly,
    total,
    baseRate: pricing?.baseRatePerMile ?? null,

    pendingCount: pending ? pending._count._all : null,
    openValue: pending ? (pending._sum.estimatedPrice ?? 0) : null,
    report: chart ? buildAnalytics(chart, 7, now) : null,
    activeCount: jobCounts
      ? jobCounts.reduce((sum, item) => sum + item._count._all, 0)
      : null,
    jobStatuses: jobCounts
      ? ACTIVE.map((status) => ({
          status,
          count:
            jobCounts.find((item) => item.status === status)?._count._all ?? 0,
        }))
      : null,
    jobs:
      jobs?.map((job) => ({
        id: job.id,
        status: job.status,
        date: job.scheduledDate.toISOString(),
        route:
          job.stops
            .map((stop) => stop.stopNote.companyName)
            .filter(Boolean)
            .join(" → ") || "No stops added",
      })) ?? null,
    recent:
      recent?.map((q) => ({ ...q, createdAt: q.createdAt.toISOString() })) ??
      null,
    embedStatus: quotaReached
      ? "Monthly limit reached"
      : embedKnown
        ? widgetInstallationStatus(embed?.lastSeenAt ?? null, now)
        : "Detection unavailable",
    lastEmbedAt: embed?.lastSeenAt.toISOString() ?? null,
    quotaReached,
    setup,
    unavailable: sources.some((source) => source.status === "rejected"),
  };
}
export type OverviewData = Awaited<ReturnType<typeof loadOverview>>;
