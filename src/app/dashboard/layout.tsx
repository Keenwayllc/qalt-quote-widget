import { getCurrentCompany, isTrialExpired, trialDaysRemaining } from "@/lib/session";
import DashboardClientLayout from "./DashboardClientLayout";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = await getCurrentCompany();

  // Redirect expired trials to billing — but let billing itself through
  if (isTrialExpired(company)) {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") ?? "";
    const isBillingPage = pathname.startsWith("/dashboard/billing");
    if (!isBillingPage) {
      redirect("/dashboard/billing?expired=1");
    }
  }

  const [pendingCount, pricingCount, widgetCount, quoteCount] = await Promise.all([
    prisma.quoteRequest.count({ where: { companyId: company.id, status: "PENDING" } }),
    prisma.pricingProfile.count({ where: { companyId: company.id } }),
    prisma.widgetSettings.count({ where: { companyId: company.id } }),
    prisma.quoteRequest.count({ where: { companyId: company.id } }),
  ]);

  // Which nav hrefs still need attention (for sidebar pulsing dots)
  const incompleteHrefs: string[] = [];
  if (pricingCount === 0) incompleteHrefs.push("/dashboard/pricing");
  if (widgetCount === 0) incompleteHrefs.push("/dashboard/widget");
  if (quoteCount === 0) incompleteHrefs.push("/dashboard/embed");

  const daysLeft = trialDaysRemaining(company);

  return (
    <DashboardClientLayout
      subscriptionPlan={company.subscriptionPlan}
      pendingCount={pendingCount}
      companyId={company.id}
      trialDaysLeft={daysLeft}
      incompleteHrefs={incompleteHrefs}
    >
      {children}
    </DashboardClientLayout>
  );
}
