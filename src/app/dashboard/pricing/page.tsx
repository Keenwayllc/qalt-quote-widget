import { getCurrentCompany, getDefaultPricing } from "@/lib/session";
import PricingForm from "@/components/dashboard/PricingForm";
import { getEntitlements } from "@/lib/plans";

export default async function PricingRulesPage({
  searchParams,
}: {
  searchParams: Promise<{ formId?: string }>;
}) {
  const company = await getCurrentCompany();
  const { formId } = await searchParams;

  let pricingData = null;

  if (formId) {
    pricingData = company.pricingProfiles.find((p) => p.widgetSettingsId === formId) ?? null;
  }

  if (!pricingData) {
    pricingData = getDefaultPricing(company);
  }

  // Get widget settings for this form (or first widget settings as default)
  const widgetSettings = formId
    ? company.widgetSettings.find((w) => w.id === formId) ?? company.widgetSettings[0]
    : company.widgetSettings[0];

  const entitlements = getEntitlements(company.subscriptionPlan);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PricingForm
    initialData={pricingData as any}
    formId={formId}
    widgetSettings={widgetSettings}
    entitlements={entitlements}
  />;
}
