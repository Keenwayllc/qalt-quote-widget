import { getCurrentCompany, getDefaultPricing } from "@/lib/session";
import PricingForm from "@/components/dashboard/PricingForm";
import ServiceCatalogEditor from "@/components/dashboard/ServiceCatalogEditor";
import { getEntitlements } from "@/lib/plans";
import styles from "./pricing.module.css";

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

  const widgetSettings = formId
    ? company.widgetSettings.find((w) => w.id === formId) ?? company.widgetSettings[0]
    : company.widgetSettings[0];

  const entitlements = getEntitlements(company.subscriptionPlan);
  const serviceOptions = pricingData && "serviceOptions" in pricingData
    ? pricingData.serviceOptions
    : [];

  return (
    <div className={styles.stage}>
      <PricingForm
        initialData={pricingData as any}
        formId={formId}
        widgetSettings={widgetSettings}
        entitlements={entitlements}
      />
      <ServiceCatalogEditor initialOptions={serviceOptions} formId={formId} />
    </div>
  );
}
