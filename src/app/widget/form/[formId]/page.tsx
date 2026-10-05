import { cache, type ComponentProps } from "react";
import type { Metadata } from "next";
import { widgetPageMetadata } from "@/lib/widget-favicon";
import { pricingProfileForForm } from "@/lib/widget-pricing";
import { safeWidgetUrl } from "@/lib/widget-urls";
import prisma from "@/lib/prisma";
import QuoteWidgetForm from "@/components/widget/QuoteWidgetForm";
import AbandonedQuoteTracker from "@/components/widget/AbandonedQuoteTracker";
import WidgetInstallTracker from "@/components/widget/WidgetInstallTracker";
import WidgetThemeShell from "@/components/widget/WidgetThemeShell";
import { getWidgetTheme } from "@/lib/widget-theme";
import { notFound } from "next/navigation";
import {
  publicCompanySelect,
  publicWidgetSettingsSelect,
  publicPricingProfileSelect,
} from "@/lib/publicWidget";

export const dynamic = "force-dynamic";

const getPublicForm = cache((formId: string) => prisma.widgetSettings.findUnique({
    where: { id: formId },
    select: {
      ...publicWidgetSettingsSelect,
      company: {
        select: {
          ...publicCompanySelect,
          pricingProfiles: { select: publicPricingProfileSelect },
        },
      },
    },
  }));

export async function generateMetadata({ params }: { params: Promise<{ formId: string }> }): Promise<Metadata> {
  const { formId } = await params;
  const form = await getPublicForm(formId);
  if (!form) notFound();
  return widgetPageMetadata(form.company, form);
}

export default async function PublicWidgetFormPage({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  const form = await getPublicForm(formId);

  if (!form) notFound();

  const { company, ...widgetSettings } = form;
  const pricingProfile = pricingProfileForForm(company.pricingProfiles, formId);
  const themeMode = await getWidgetTheme(formId);

  return (
    <WidgetThemeShell theme={themeMode}>
      <div className="qalt-widget-stage min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <AbandonedQuoteTracker companyId={company.id} formId={formId} />
        <WidgetInstallTracker companyId={company.id} formId={formId} />
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
            formId,
            pricingProfile,
          } as unknown as ComponentProps<typeof QuoteWidgetForm>["company"]}
        />
      </div>
    </WidgetThemeShell>
  );
}
