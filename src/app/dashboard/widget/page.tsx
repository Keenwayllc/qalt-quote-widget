import { getCurrentCompany } from "@/lib/session";
import WidgetForm from "@/components/dashboard/WidgetForm";

export default async function WidgetSettingsPage() {
  const company = await getCurrentCompany();
  
  const widgetSettings = company.widgetSettings[0] ?? null;
  return <WidgetForm initialData={widgetSettings!} companyLogoUrl={company.logoUrl} subscriptionPlan={company.subscriptionPlan} companyId={company.id} />;
}
