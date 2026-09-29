import { getCurrentCompany, getDefaultPricing } from "@/lib/session";
import PricingForm from "@/components/dashboard/PricingForm";
import ServiceCatalogEditor from "@/components/dashboard/ServiceCatalogEditor";
import { getEntitlements } from "@/lib/plans";
import FormSettingsSelector from "@/components/dashboard/FormSettingsSelector";
import { redirect } from "next/navigation";
import type { ComponentProps } from "react";
import styles from "./pricing.module.css";

export default async function PricingRulesPage({
  searchParams,
}: {
  searchParams: Promise<{ formId?: string }>;
}) {
  const company = await getCurrentCompany();
  const { formId } = await searchParams;
  const forms = [...company.widgetSettings].sort((a, b) => a.id.localeCompare(b.id));
  const selectedForm = formId ? forms.find((form) => form.id === formId) : forms[0];
  if (formId && !selectedForm) redirect("/dashboard/pricing");
  const selectedFormId = selectedForm?.id;

  const pricingData = (selectedFormId
    ? company.pricingProfiles.find((p) => p.widgetSettingsId === selectedFormId)
    : null) ?? getDefaultPricing(company);

  const entitlements = getEntitlements(company.subscriptionPlan);
  const serviceOptions = pricingData && "serviceOptions" in pricingData
    ? pricingData.serviceOptions
    : [];

  return (
    <>
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
        page="pricing"
      />
      <div className={styles.stage}>
        <PricingForm
          key={selectedFormId ?? "company-default"}
          initialData={pricingData as unknown as ComponentProps<typeof PricingForm>["initialData"]}
          formId={selectedFormId}
          widgetSettings={selectedForm}
          entitlements={entitlements}
        />
        <ServiceCatalogEditor key={selectedFormId ?? "company-default"} initialOptions={serviceOptions} formId={selectedFormId} formName={selectedForm?.name} />
      </div>
    </>
  );
}
