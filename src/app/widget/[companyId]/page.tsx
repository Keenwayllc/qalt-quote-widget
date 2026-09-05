import prisma from "@/lib/prisma";
import QuoteWidgetForm from "@/components/widget/QuoteWidgetForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PublicWidgetPage({ params }: { params: { companyId: string } }) {
  const { companyId } = await params;

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      pricingProfiles: true,
      widgetSettings: true,
    }
  });

  if (!company || company.widgetSettings.length === 0) {
    notFound();
  }

  const widgetSettings = company.widgetSettings[0];
  const defaultPricing = company.pricingProfiles.find((p) => p.widgetSettingsId === null);

  return (
    <div className="qalt-widget-stage min-h-screen p-4 sm:p-8 flex items-center justify-center">
      <QuoteWidgetForm company={{ ...company, widgetSettings, pricingProfile: defaultPricing } as any} />
    </div>
  );
}
