import { getCurrentCompany } from "@/lib/session";
import DashboardClientLayout from "./DashboardClientLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = await getCurrentCompany();

  return (
    <DashboardClientLayout subscriptionPlan={company.subscriptionPlan}>
      {children}
    </DashboardClientLayout>
  );
}
