import { safeWidgetUrl } from "@/lib/widget-urls";
import prisma from "@/lib/prisma";
import QuoteWidgetForm from "@/components/widget/QuoteWidgetForm";
import AbandonedQuoteTracker from "@/components/widget/AbandonedQuoteTracker";
import WidgetInstallTracker from "@/components/widget/WidgetInstallTracker";
import WidgetThemeShell from "@/components/widget/WidgetThemeShell";
import { getWidgetTheme } from "@/lib/widget-theme";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";
import { pricingProfileForForm } from "@/lib/widget-pricing";
import {
  publicCompanySelect,
  publicWidgetSettingsSelect,
  publicPricingProfileSelect,
} from "@/lib/publicWidget";

export const dynamic = "force-dynamic";

export default async function PublicWidgetPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: {
      ...publicCompanySelect,
      widgetSettings: { orderBy: { id: "asc" }, select: publicWidgetSettingsSelect },
      pricingProfiles: { select: publicPricingProfileSelect },
    },
  });

  if (!company || company.widgetSettings.length === 0) notFound();

  const widgetSettings = company.widgetSettings[0];
  const pricingProfile = pricingProfileForForm(company.pricingProfiles, widgetSettings.id);
  const themeMode = await getWidgetTheme(widgetSettings.id);

  return (
    <WidgetThemeShell theme={themeMode}>
      <div className="qalt-widget-stage min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <AbandonedQuoteTracker companyId={company.id} formId={widgetSettings.id} />
        <WidgetInstallTracker companyId={company.id} formId={widgetSettings.id} />
        <QuoteWidgetForm
          company={{
            id: company.id,
            name: company.name,
            logoUrl: safeWidgetUrl(company.logoUrl, true),
            logoBackdrop: company.logoBackdrop,
            subscriptionPlan: company.subscriptionPlan,
            widgetSettings: {
              ...widgetSettings,
              logoUrl: safeWidgetUrl(widgetSettings.logoUrl, true),
              backgroundImageUrl: safeWidgetUrl(widgetSettings.backgroundImageUrl, true),
              websiteUrl: safeWidgetUrl(widgetSettings.websiteUrl),
            },
            formId: widgetSettings.id,
            pricingProfile,
          } as ComponentProps<typeof QuoteWidgetForm>["company"]}
        />
      </div>
    </WidgetThemeShell>
  );
}
