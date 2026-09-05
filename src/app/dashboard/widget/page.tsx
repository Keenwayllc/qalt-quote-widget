import { getCurrentCompany } from "@/lib/session";
import WidgetForm from "@/components/dashboard/WidgetForm";
import BrandColorPresets from "@/components/dashboard/BrandColorPresets";

export default async function WidgetSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ formId?: string }>;
}) {
  const company = await getCurrentCompany();
  const { formId } = await searchParams;

  let widgetSettings = formId
    ? company.widgetSettings.find((f) => f.id === formId) ?? company.widgetSettings[0]
    : company.widgetSettings[0];

  widgetSettings = widgetSettings ?? null;

  return (
    <div className="qalt-widget-studio">
      <BrandColorPresets />
      <WidgetForm
        initialData={widgetSettings!}
        companyLogoUrl={company.logoUrl}
        subscriptionPlan={company.subscriptionPlan}
        companyId={company.id}
        formId={formId}
        stripeConnectAccountId={company.stripeConnectAccountId}
      />
    </div>
  );
}
