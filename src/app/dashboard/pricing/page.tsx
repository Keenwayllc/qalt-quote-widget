import { getCurrentCompany } from "@/lib/session";
import PricingForm from "@/components/dashboard/PricingForm";

export default async function PricingRulesPage() {
  const company = await getCurrentCompany();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PricingForm initialData={company.pricingProfile as any} />;
}
