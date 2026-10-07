import { safeWidgetUrl } from "@/lib/widget-urls";
import prisma from "@/lib/prisma";
import QuoteWidgetForm from "@/components/widget/QuoteWidgetForm";
import AbandonedQuoteTracker from "@/components/widget/AbandonedQuoteTracker";
import WidgetInstallTracker from "@/components/widget/WidgetInstallTracker";
import WidgetAppearanceShell from "@/components/widget/WidgetAppearanceShell";
import { getWidgetTheme } from "@/lib/widget-theme";
import { effectiveAppearance } from "@/lib/advanced-appearance";
import { notFound } from "next/navigation";
import { cache, type ComponentProps } from "react";
import type { Metadata } from "next";
import { widgetPageMetadata } from "@/lib/widget-favicon";
import { pricingProfileForForm } from "@/lib/widget-pricing";
import {
  publicCompanySelect,
  publicWidgetSettingsSelect,
  publicPricingProfileSelect,
} from "@/lib/publicWidget";

export const dynamic = "force-dynamic";

const getPublicCompany = cache((companyId: string) => prisma.company.findUnique({
    where: { id: companyId },
    select: {
      ...publicCompanySelect,
      widgetSettings: { orderBy: { id: "asc" }, select: publicWidgetSettingsSelect },
      pricingProfiles: { select: publicPricingProfileSelect },
    },
  }));

export async function generateMetadata({ params }: { params: Promise<{ companyId: string }> }): Promise<Metadata> {
  const { companyId } = await params;
  const company = await getPublicCompany(companyId);
  if (!company || company.widgetSettings.length === 0) notFound();
  return widgetPageMetadata(company, company.widgetSettings[0]);
}

export default async function PublicWidgetPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  const company = await getPublicCompany(companyId);

  if (!company || company.widgetSettings.length === 0) notFound();

  const { advancedAppearance, ...widgetSettings } = company.widgetSettings[0];
  const pricingProfile = pricingProfileForForm(company.pricingProfiles, widgetSettings.id);
  const themeMode = await getWidgetTheme(widgetSettings.id);

  return (
    <WidgetAppearanceShell theme={themeMode} appearance={effectiveAppearance(advancedAppearance, company.subscriptionPlan)}>
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
          } as unknown as ComponentProps<typeof QuoteWidgetForm>["company"]}
        />
      </div>
    </WidgetAppearanceShell>
  );
}
