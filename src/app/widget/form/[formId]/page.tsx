import prisma from "@/lib/prisma";
import QuoteWidgetForm from "@/components/widget/QuoteWidgetForm";
import { notFound } from "next/navigation";
import {
  publicCompanySelect,
  publicWidgetSettingsSelect,
  publicPricingProfileSelect,
} from "@/lib/publicWidget";

export const dynamic = "force-dynamic";

export default async function PublicWidgetFormPage({ params }: { params: { formId: string } }) {
  const { formId } = await params;

  // Strict public select — never the full Company row (see lib/publicWidget).
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

  if (!form) {
    notFound();
  }

  const { company, pricingProfile: formPricing, ...widgetSettings } = form;

  // Use the form-specific pricing profile if it exists,
  // otherwise fall back to the company-level default (widgetSettingsId === null).
  const pricingProfile =
    formPricing ??
    company.pricingProfiles.find((p) => p.widgetSettingsId === null) ??
    undefined;

  return (
    <div className="qalt-widget-stage min-h-screen p-4 sm:p-8 flex items-center justify-center">
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
  );
}
