import prisma from "@/lib/prisma";
import { getEntitlements } from "@/lib/plans";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type DomainCompanyRow = {
  id: string;
  name: string;
  subscriptionPlan: string;
};

export default async function CustomDomainWidgetPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain: rawDomain } = await params;
  const domain = decodeURIComponent(rawDomain).trim().toLowerCase();

  const matches = await prisma.$queryRaw<DomainCompanyRow[]>`
    SELECT "id", "name", "subscriptionPlan"
    FROM "Company"
    WHERE lower("customWidgetDomain") = ${domain}
      AND "customWidgetDomainVerified" = true
    LIMIT 1
  `;

  const company = matches[0];
  if (!company || !getEntitlements(company.subscriptionPlan).isWhiteLabelEnabled) {
    notFound();
  }

  const widgetCount = await prisma.widgetSettings.count({
    where: { companyId: company.id },
  });
  if (widgetCount === 0) notFound();

  // Keep the browser on the merchant's branded hostname while running the
  // actual quote experience from Qalt's canonical origin. This is intentional:
  // Google Maps JavaScript / Places can stay restricted to qalt.site instead of
  // requiring every merchant custom domain to be manually added to Google Cloud.
  // It also means Preview Widget, normal embeds, and branded domains all execute
  // the exact same live widget code path.
  const widgetUrl = `https://www.qalt.site/widget/${encodeURIComponent(company.id)}?surface=custom-domain&host=${encodeURIComponent(domain)}`;

  return (
    <main className="fixed inset-0 h-dvh w-screen overflow-hidden bg-transparent">
      <iframe
        src={widgetUrl}
        title={`${company.name} delivery quote`}
        className="h-full w-full border-0 bg-transparent"
        allow="payment"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </main>
  );
}
