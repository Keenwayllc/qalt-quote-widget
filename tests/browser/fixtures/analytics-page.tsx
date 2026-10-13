import DashboardClientLayout from "@/app/dashboard/DashboardClientLayout";
import DashboardRouteStyler from "@/app/dashboard/DashboardRouteStyler";
import "@/app/dashboard/dashboard-polish.css";
import "@/app/dashboard/console-shell.css";
import "@/app/dashboard/overview-premium.css";
import AnalyticsDashboard from "@/app/dashboard/analytics/AnalyticsClientComponents";
import { analyticsDays, buildAnalytics } from "@/lib/analytics-report";
export default async function Verification({
  searchParams,
}: {
  searchParams: Promise<{
    days?: string;
    empty?: string;
    shell?: string;
    plan?: string;
  }>;
}) {
  const params = await searchParams;
  const now = new Date("2026-10-13T16:30:00Z");
  const statuses = ["PENDING", "WON", "CONFIRMED", "PAID", "LOST", "CANCELLED"];
  const rows = params.empty
    ? []
    : Array.from({ length: 76 }, (_, i) => ({
        id: `verification-quote-${i}`,
        createdAt: new Date(now.getTime() - i * 10 * 3600 * 1000),
        status: statuses[i % 6],
        paymentStatus: null,
        estimatedPrice: 175 + i * 7,
        distanceMiles: 12 + i,
        serviceType: i % 3 ? "Same day delivery" : "Scheduled delivery",
        pickupZip: i % 2 ? "91601" : "90001",
        dropoffZip: "90012",
      }));
  const dashboard = (
    <AnalyticsDashboard
      report={buildAnalytics(rows, analyticsDays(params.days), now)}
    />
  );
  return params.shell ? (
    <>
      <DashboardRouteStyler />
      <DashboardClientLayout
        subscriptionPlan={params.plan ?? "STARTER"}
        companyId="verification-tenant"
        companyName="Example Delivery"
        onboardingCompleted
      >
        {dashboard}
      </DashboardClientLayout>
    </>
  ) : (
    dashboard
  );
}
