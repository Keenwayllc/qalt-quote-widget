import { getCurrentCompany } from "@/lib/session";
import WidgetForm from "@/components/dashboard/WidgetForm";

export default async function WidgetSettingsPage() {
  const company = await getCurrentCompany();
  
  return <WidgetForm initialData={company.widgetSettings!} />;
}
