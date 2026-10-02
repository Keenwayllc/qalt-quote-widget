import type { CSSProperties } from "react";
import { getCurrentCompany } from "@/lib/session";
import WidgetForm from "@/components/dashboard/WidgetForm";
import BrandColorPresets from "@/components/dashboard/BrandColorPresets";
import WidgetThemeSelector from "@/components/dashboard/WidgetThemeSelector";
import LogoUploadPolicy from "@/components/dashboard/LogoUploadPolicy";
import { getWidgetTheme } from "@/lib/widget-theme";
import FormSettingsSelector from "@/components/dashboard/FormSettingsSelector";
import { redirect } from "next/navigation";
import "./widget-preview-theme.css";

export default async function WidgetSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ formId?: string }>;
}) {
  const company = await getCurrentCompany();
  const { formId } = await searchParams;
  const forms = [...company.widgetSettings].sort((a, b) => a.id.localeCompare(b.id));
  const widgetSettings = formId ? forms.find((form) => form.id === formId) : forms[0];
  if (formId && !widgetSettings) redirect("/dashboard/widget");
  const selectedFormId = widgetSettings?.id;
  const themeMode = widgetSettings ? await getWidgetTheme(widgetSettings.id) : "light";

  const previewStyle = {
    "--qalt-widget-preview-bg-image": widgetSettings?.backgroundImageUrl
      ? `url("${widgetSettings.backgroundImageUrl}")`
      : "none",
  } as CSSProperties;

  return (
    <div
      className="qalt-widget-studio"
      data-widget-preview-theme={themeMode}
      style={previewStyle}
    >
      <FormSettingsSelector
        forms={forms.map((form) => ({
          id: form.id,
          name: form.name,
          formStyle: form.formStyle,
          showWeight: form.showWeight,
          showAwb: form.showAwb,
          showVehicles: form.showVehicles,
          hasVehicleChoices: Array.isArray(form.vehicleOptions) && form.vehicleOptions.length > 0,
        }))}
        selectedFormId={selectedFormId}
        page="widget"
      />
      <LogoUploadPolicy />
      {widgetSettings && (
        <WidgetThemeSelector key={`theme-${widgetSettings.id}`} formId={widgetSettings.id} initialTheme={themeMode} />
      )}
      <BrandColorPresets />
      {widgetSettings && (
        <WidgetForm
          key={`form-${widgetSettings.id}`}
          initialData={widgetSettings}
          companyLogoUrl={company.logoUrl}
          companyLogoBackdrop={company.logoBackdrop}
          subscriptionPlan={company.subscriptionPlan}
          companyId={company.id}
          formId={selectedFormId}
          stripeConnectAccountId={company.stripeConnectAccountId}
        />
      )}
    </div>
  );
}
