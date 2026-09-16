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

export default async function PublicWidgetFormPage({ params }: { params: { formId: string } }) {
  const { formId } = await params;

  const form = await prisma.widgetSettings.findUnique({
    where: { id: formId },
    select: {
      ...publicWidgetSettingsSelect,
      pricingProfile: { select: publicPricingProfileSelect },
      company: {
        select: {
          ...publicCompanySelect,
          pricingProfiles: { select: publicPricingProfileSelect },
        },
      },
    },
  });

  if (!form) notFound();

  const { company, pricingProfile: formPricing, ...widgetSettings } = form;
  const pricingProfile =
    formPricing ??
    company.pricingProfiles.find((p) => p.widgetSettingsId === null) ??
    undefined;
  const themeMode = await getWidgetTheme(formId);

  return (
    <WidgetThemeShell theme={themeMode}>
      <div className="qalt-widget-stage min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <AbandonedQuoteTracker companyId={company.id} formId={formId} />
        <QuoteWidgetForm
          company={{
            id: company.id,
            name: company.name,
            logoUrl: company.logoUrl,
            subscriptionPlan: company.subscriptionPlan,
            widgetSettings,
            formId,
            pricingProfile,
          } as any}
        />
      </div>
    </WidgetThemeShell>
  );
}
