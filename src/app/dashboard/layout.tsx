import { getCurrentCompany } from "@/lib/session";
import DashboardClientLayout from "./DashboardClientLayout";
import prisma from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = await getCurrentCompany();

  const pendingCount = await prisma.quoteRequest.count({
    where: {
      companyId: company.id,
      status: "PENDING",
    }
  });

  return (
    <DashboardClientLayout 
      subscriptionPlan={company.subscriptionPlan} 
      pendingCount={pendingCount}
    >
      {children}
    </DashboardClientLayout>
  );
}
