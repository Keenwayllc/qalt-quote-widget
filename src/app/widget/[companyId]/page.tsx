import prisma from "@/lib/prisma";
import QuoteWidgetForm from "@/components/widget/QuoteWidgetForm";
import AbandonedQuoteTracker from "@/components/widget/AbandonedQuoteTracker";
import WidgetThemeShell from "@/components/widget/WidgetThemeShell";
import { getWidgetTheme } from "@/lib/widget-theme";
import { notFound } from "next/navigation";
import {
  publicCompanySelect,
  publicWidgetSettingsSelect,
  publicPricingProfileSelect,
} from "@/lib/publicWidget";

export const dynamic = "force-dynamic";

export default async function PublicWidgetPage({ params }: { params: { companyId: string } }) {
  const { companyId } = await params;

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: {
      ...publicCompanySelect,
      widgetSettings: { select: publicWidgetSettingsSelect },
      pricingProfiles: { select: publicPricingProfileSelect },
    },
  });

  if (!company || company.widgetSettings.length === 0) notFound();

  const widgetSettings = company.widgetSettings[0];
  const pricingProfile = company.pricingProfiles.find((p) => p.widgetSettingsId === null);
  const themeMode = await getWidgetTheme(widgetSettings.id);

  return (
    <WidgetThemeShell theme={themeMode}>
      <div className="qalt-widget-stage min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <AbandonedQuoteTracker companyId={company.id} formId={widgetSettings.id} />
        <QuoteWidgetForm
          company={{
            id: company.id,
            name: company.name,
            logoUrl: company.logoUrl,
            subscriptionPlan: company.subscriptionPlan,
            widgetSettings,
            pricingProfile,
          } as any}
        />
      </div>
    </WidgetThemeShell>
  );
}
