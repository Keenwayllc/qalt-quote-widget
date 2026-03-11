import { getCurrentCompany } from "@/lib/session";
import PricingForm from "@/components/dashboard/PricingForm";

export default async function PricingRulesPage() {
  const company = await getCurrentCompany();
  
  return <PricingForm initialData={company.pricingProfile!} />;
}
