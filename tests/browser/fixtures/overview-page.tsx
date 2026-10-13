import DashboardClientLayout from "@/app/dashboard/DashboardClientLayout";
import DashboardRouteStyler from "@/app/dashboard/DashboardRouteStyler";
import "@/app/dashboard/dashboard-polish.css";
import "@/app/dashboard/console-shell.css";
import "@/app/dashboard/overview-premium.css";
import OverviewWorkspace from "@/app/dashboard/OverviewWorkspace";
import { buildAnalytics } from "@/lib/analytics-report";
import type { OverviewData } from "@/lib/overview-data";
export default async function Verification({
  searchParams,
}: {
  searchParams: Promise<{
    empty?: string;
    partial?: string;
    plan?: string;
    quota?: string;
  }>;
}) {
  const p = await searchParams;
  const now = new Date("2026-10-13T16:30:00Z");
  const rows = p.empty
    ? []
    : Array.from({ length: 42 }, (_, i) => ({
        id: `example-quote-${i}`,
        createdAt: new Date(now.getTime() - i * 6 * 3600000),
        customerName: [
          "Northstar Supply",
          "Canyon Studio",
          "Pacific Design",
          "Harbor Partners",
          "Westside Goods",
        ][i % 5],
        status: i % 3 ? "PENDING" : "CONFIRMED",
        paymentStatus: null,
        estimatedPrice: 175 + i * 12,
        distanceMiles: 18 + i,
        pickupZip: "90012",
        dropoffZip: "91601",
        serviceType: "Same-day delivery",
      }));
  const plan = p.plan ?? "STARTER";
  const data: OverviewData = {
    companyName: "Example Delivery",
    plan,
    updatedAt: now.toISOString(),
    quotaLimit: plan === "STARTER" ? 50 : "unlimited",
    monthly: p.quota ? 50 : rows.length,
    total: rows.length,
    baseRate: 3,
    pendingCount: p.empty ? 0 : 12,
    openValue: p.empty ? 0 : 3680,
    report: buildAnalytics(rows, 7, now),
    activeCount: p.empty ? 0 : 6,
    jobStatuses: [
      { status: "PENDING", count: 2 },
      { status: "READY", count: p.empty ? 0 : 2 },
      { status: "IN_PROGRESS", count: p.empty ? 0 : 1 },
      { status: "ISSUE", count: p.empty ? 0 : 1 },
    ],
    jobs: p.empty
      ? []
      : [
          {
            id: "example-job-1",
            status: "ISSUE",
            date: now.toISOString(),
            route: "Northstar Warehouse → Pacific Design",
          },
          {
            id: "example-job-2",
            status: "READY",
            date: now.toISOString(),
            route: "Canyon Studio → Harbor Partners",
          },
        ],
    recent: rows
      .slice(0, 5)
      .map((q) => ({
        id: q.id,
        customerName: q.customerName,
        createdAt: q.createdAt.toISOString(),
        estimatedPrice: q.estimatedPrice,
        pickupZip: q.pickupZip,
        dropoffZip: q.dropoffZip,
        status: q.status,
        paymentStatus: q.paymentStatus,
        distanceMiles: q.distanceMiles,
      })),
    embedStatus:
      p.quota && plan === "STARTER"
        ? "Monthly limit reached"
        : p.empty
          ? "Not detected"
          : "Active embed",
    lastEmbedAt: p.empty ? null : now.toISOString(),
    quotaReached: !!p.quota && plan === "STARTER",
    setup: [
      {
        id: "pricing",
        label: "Pricing profile",
        description: "A saved profile supplies your customer estimates.",
        href: "/dashboard/pricing",
        done: true,
      },
      {
        id: "branding",
        label: "Customer experience",
        description: "Review your logo, colors and quote form.",
        href: "/dashboard/widget",
        done: true,
      },
      {
        id: "embed",
        label: "Website installation",
        description:
          "External embed loads confirm a detected installation, not uptime.",
        href: "/dashboard/embed",
        done: !p.empty,
      },
      {
        id: "contact",
        label: "Customer contact",
        description: "Add an email or phone for customer questions.",
        href: "/dashboard/settings/customer-contact",
        done: false,
      },
    ],
    unavailable: false,
  };
  if (p.partial) {
    data.report = null;
    data.recent = null;
    data.jobs = null;
    data.activeCount = null;
    data.jobStatuses = null;
    data.monthly = null;
    data.total = null;
    data.embedStatus = "Detection unavailable";
    data.lastEmbedAt = null;
    data.unavailable = true;
    data.setup[2].done = null;
    data.setup[3].done = null;
  }
  return (
    <>
      <DashboardRouteStyler />
      <DashboardClientLayout
        subscriptionPlan={plan}
        companyId="example-tenant"
        companyName={data.companyName}
        onboardingCompleted
      >
        <OverviewWorkspace data={data} />
      </DashboardClientLayout>
    </>
  );
}
