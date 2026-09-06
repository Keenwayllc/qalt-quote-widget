import { getCurrentCompany, isTrialExpired, trialDaysRemaining, wasTrialDowngraded } from "@/lib/session";
import DashboardClientLayout from "./DashboardClientLayout";
import DashboardRouteStyler from "./DashboardRouteStyler";
import "./dashboard-polish.css";
import "./console-shell.css";
import prisma from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let company = await getCurrentCompany();

  // Trial ended without paying → silently drop them to STARTER.
  // They keep the account; premium features just disappear and we surface
  // an upgrade banner via trialDaysLeft=0.
  if (isTrialExpired(company)) {
    await prisma.company.update({
      where: { id: company.id },
      data: { subscriptionPlan: "STARTER" },
    });
    company = { ...company, subscriptionPlan: "STARTER" };
  }

  const [pendingCount, pricingCount, widgetCount, quoteCount] = await Promise.all([
    prisma.quoteRequest.count({ where: { companyId: company.id, status: "PENDING", deletedAt: null } }),
    prisma.pricingProfile.count({ where: { companyId: company.id } }),
    prisma.widgetSettings.count({ where: { companyId: company.id } }),
    prisma.quoteRequest.count({ where: { companyId: company.id, deletedAt: null } }),
  ]);

  // Which nav hrefs still need attention (for sidebar pulsing dots)
  const incompleteHrefs: string[] = [];
  if (pricingCount === 0) incompleteHrefs.push("/dashboard/pricing");
  if (widgetCount === 0) incompleteHrefs.push("/dashboard/widget");
  if (quoteCount === 0) incompleteHrefs.push("/dashboard/embed");

  const daysLeft = trialDaysRemaining(company);
  const trialEnded = wasTrialDowngraded(company);

  return (
    <>
      <DashboardRouteStyler />
      <DashboardClientLayout
        subscriptionPlan={company.subscriptionPlan}
        pendingCount={pendingCount}
        quoteCount={quoteCount}
        companyId={company.id}
        trialDaysLeft={daysLeft}
        trialEnded={trialEnded}
        incompleteHrefs={incompleteHrefs}
        companyName={company.name}
        logoUrl={company.logoUrl ?? undefined}
        profilePicUrl={company.profilePicUrl ?? undefined}
        isAdmin={company.isAdmin}
      >
        {children}
      </DashboardClientLayout>
    </>
  );
}
