import "server-only";
import prisma from "@/lib/prisma";
import { pricingProfileForForm } from "@/lib/widget-pricing";
import { publicCompanySelect, publicWidgetSettingsSelect, publicPricingProfileSelect } from "@/lib/publicWidget";

// Points ONLY at a dedicated demo merchant configured via env, and only if that
// company actually exists with a widget. It must NEVER fall back to a real
// customer's widget — a missing OR invalid id just shows the neutral placeholder.
// Returns public form configurations only, with the same pricing resolution
// as the customer embed. Each selection carries its actual saved form ID.
export async function resolveDemoCompanies() {
  const id = (process.env.DEMO_COMPANY_ID || process.env.NEXT_PUBLIC_DEMO_COMPANY_ID)?.trim();
  if (!id) return [];
  // Strict public select — never the full Company row (see lib/publicWidget).
  const company = await prisma.company.findUnique({
    where: { id },
    select: {
      ...publicCompanySelect,
      widgetSettings: { orderBy: { id: "asc" }, select: publicWidgetSettingsSelect },
      pricingProfiles: { select: publicPricingProfileSelect },
    },
  });
  if (!company || company.widgetSettings.length === 0) return [];

  return company.widgetSettings.map((settings) => ({
    id: company.id,
    formId: settings.id,
    name: company.name,
    logoUrl: company.logoUrl,
    logoBackdrop: company.logoBackdrop,
    subscriptionPlan: company.subscriptionPlan,
    widgetSettings: { ...settings, advancedAppearance: undefined },
    pricingProfile: pricingProfileForForm(company.pricingProfiles, settings.id),
  }));
}

