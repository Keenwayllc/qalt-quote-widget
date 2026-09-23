import prisma from "@/lib/prisma";
import { buildFromAddress, sendEmail } from "@/lib/email";
import type { AbandonedQuoteRow } from "@/lib/abandoned-quotes";

const DEFAULT_APP_URL = "https://www.qalt.site";

function appOrigin() {
  const raw =
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.AUTH_URL ||
    process.env.NEXTAUTH_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    DEFAULT_APP_URL;
  const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return new URL(normalized).origin;
}

function formatUsd(value: number | null) {
  if (value == null || !Number.isFinite(value)) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export async function sendAbandonedQuoteRecoveryEmail(input: {
  companyId: string;
  lead: AbandonedQuoteRow;
}) {
  const { companyId, lead } = input;
  if (!lead.customerEmail) throw new Error("This abandoned quote has no customer email address.");

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: {
      name: true,
      email: true,
      customEmailDomain: true,
      customEmailFromName: true,
      emailDomainVerified: true,
    },
  });
  if (!company) throw new Error("Company not found.");

  const settings = await prisma.widgetSettings.findFirst({
    where: lead.formId
      ? { id: lead.formId, companyId }
      : { companyId },
    select: { primaryColor: true },
  });

  const recoveryUrl = lead.formId
    ? `${appOrigin()}/widget/form/${lead.formId}`
    : `${appOrigin()}/widget/${companyId}`;

  const brandColor = settings?.primaryColor || "#df1731";
  const amount = formatUsd(lead.estimatedPrice);
  const greeting = lead.customerName ? `Hi ${lead.customerName},` : "Hello,";
  const routeText =
    lead.pickupAddress || lead.dropoffAddress
      ? `${lead.pickupAddress || lead.pickupZip || "Pickup"} → ${lead.dropoffAddress || lead.dropoffZip || "Dropoff"}`
      : null;

  const result = await sendEmail({
    to: lead.customerEmail,
    from: buildFromAddress({
      customDomain: company.customEmailDomain,
      fromName: company.customEmailFromName,
      domainVerified: company.emailDomainVerified,
      fallbackName: company.name,
    }),
    replyTo: company.email,
    subject: `Finish your delivery quote with ${company.name}`,
    react: (
      <div style={{ margin: 0, padding: "28px 12px", backgroundColor: "#f7f8fa", fontFamily: "Arial, Helvetica, sans-serif", color: "#22252b" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", backgroundColor: "#ffffff", border: "1px solid #e2e4e9", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ height: 6, backgroundColor: brandColor }} />
          <div style={{ padding: "30px" }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>{company.name}</div>
            <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 14px" }}>{greeting}</p>
            <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 20px" }}>
              You started a delivery quote but did not finish the booking. Your quote details are still available to continue.
            </p>
            {amount && (
              <div style={{ margin: "0 0 18px", padding: "14px 16px", backgroundColor: "#f7f8fa", borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: "#646b76", marginBottom: 4 }}>Estimated quote</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{amount}</div>
              </div>
            )}
            {routeText && (
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "#555d68", margin: "0 0 22px" }}>{routeText}</p>
            )}
            <a
              href={recoveryUrl}
              style={{ display: "inline-block", backgroundColor: brandColor, color: "#ffffff", textDecoration: "none", fontSize: 15, fontWeight: 700, padding: "13px 20px", borderRadius: 10 }}
            >
              Finish My Quote
            </a>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: "#8a9099", margin: "22px 0 0" }}>
              If you no longer need this delivery quote, you can ignore this message.
            </p>
          </div>
        </div>
      </div>
    ),
  });

  if (!result.success) throw new Error("Recovery email could not be sent.");
  return result;
}
