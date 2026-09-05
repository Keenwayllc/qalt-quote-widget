import prisma from "@/lib/prisma";
import QuoteWidgetForm from "@/components/widget/QuoteWidgetForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PublicWidgetFormPage({ params }: { params: { formId: string } }) {
  const { formId } = await params;

  const form = await prisma.widgetSettings.findUnique({
    where: { id: formId },
    include: {
      pricingProfile: true,
      company: {
        include: { pricingProfiles: true },
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
    null;

  return (
    <div className="qalt-widget-stage min-h-screen p-4 sm:p-8 flex items-center justify-center">
      <QuoteWidgetForm
        company={{ ...company, widgetSettings, formId, pricingProfile } as any}
      />
    </div>
  );
}
