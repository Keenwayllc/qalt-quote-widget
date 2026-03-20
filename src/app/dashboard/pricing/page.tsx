import { getCurrentCompany, getDefaultPricing } from "@/lib/session";
import PricingForm from "@/components/dashboard/PricingForm";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PricingForm initialData={pricingData as any} formId={formId} />;
}
