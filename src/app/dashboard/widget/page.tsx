import type { CSSProperties } from "react";
import { getCurrentCompany } from "@/lib/session";
import WidgetForm from "@/components/dashboard/WidgetForm";
import BrandColorPresets from "@/components/dashboard/BrandColorPresets";
import "./widget-preview-theme.css";

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

  const previewStyle = {
    "--qalt-widget-preview-bg-image": widgetSettings?.backgroundImageUrl
      ? `url("${widgetSettings.backgroundImageUrl}")`
      : "none",
  } as CSSProperties;

  return (
    <div className="qalt-widget-studio" style={previewStyle}>
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
