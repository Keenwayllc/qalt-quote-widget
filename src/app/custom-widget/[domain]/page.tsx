import prisma from "@/lib/prisma";
import QuoteWidgetForm from "@/components/widget/QuoteWidgetForm";
import AbandonedQuoteTracker from "@/components/widget/AbandonedQuoteTracker";
import WidgetThemeShell from "@/components/widget/WidgetThemeShell";
import { getWidgetTheme } from "@/lib/widget-theme";
import { getEntitlements } from "@/lib/plans";
import { notFound } from "next/navigation";
import {
  publicCompanySelect,
  publicWidgetSettingsSelect,
  publicPricingProfileSelect,
} from "@/lib/publicWidget";

export const dynamic = "force-dynamic";

type DomainCompanyRow = {
  id: string;
  subscriptionPlan: string;
};

export default async function CustomDomainWidgetPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain: rawDomain } = await params;
  const domain = decodeURIComponent(rawDomain).trim().toLowerCase();

  const matches = await prisma.$queryRaw<DomainCompanyRow[]>`
    SELECT "id", "subscriptionPlan"
    FROM "Company"
    WHERE lower("customWidgetDomain") = ${domain}
      AND "customWidgetDomainVerified" = true
    LIMIT 1
  `;

  const match = matches[0];
  if (!match || !getEntitlements(match.subscriptionPlan).isWhiteLabelEnabled) notFound();

  const company = await prisma.company.findUnique({
    where: { id: match.id },
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
