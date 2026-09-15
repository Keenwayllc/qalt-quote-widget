import prisma from "@/lib/prisma";
import { rotatePublicDocumentToken } from "@/lib/customer-document-access";
import { sendEmail } from "@/lib/email";
import type { CustomerDocument } from "@/generated/prisma/client";
import type { InvoiceSnapshotV1 } from "@/lib/customer-invoice-documents";

if (typeof window !== "undefined") {
  throw new Error(
    "customer-invoice-email.tsx is server-only and must not be imported into client code."
  );
}

const DEFAULT_APP_URL = "https://www.qalt.site";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SendPaidInvoiceEmailInput {
  companyId: string;
  quoteRequestId: string;
  to?: string;
  now?: Date;
}

export interface SendPaidInvoiceEmailResult {
  document: CustomerDocument;
  recipient: string;
  publicUrl: string;
  emailId: string | null;
}

function getAppOrigin(): string {
  const raw =
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.AUTH_URL ||
    process.env.NEXTAUTH_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    DEFAULT_APP_URL;

  const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const url = new URL(normalized);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("Invalid application URL protocol.");
  }
  return url.origin;
}

function normalizeRecipient(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim();
  if (!email || email.length > 320 || !EMAIL_PATTERN.test(email)) return null;
  return email;
}

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.isFinite(amount) ? amount : 0);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function parseInvoiceSnapshot(raw: unknown): InvoiceSnapshotV1 {
  if (!isRecord(raw) || raw.version !== 1 || raw.documentType !== "INVOICE") {
    throw new Error("Unsupported invoice snapshot.");
  }
  if (!isRecord(raw.document) || !isRecord(raw.customer) || !isRecord(raw.merchant) || !isRecord(raw.pricing)) {
    throw new Error("Invalid invoice snapshot.");
  }
  if (
    typeof raw.document.number !== "string" ||
    typeof raw.document.paidAt !== "string" ||
    typeof raw.pricing.total !== "number"
  ) {
    throw new Error("Invalid invoice document metadata.");
  }
  return raw as unknown as InvoiceSnapshotV1;
}

function PaidInvoiceEmail({
  merchantName,
  customerName,
  invoiceNumber,
  amount,
  paidAt,
  publicUrl,
  brandColor,
}: {
  merchantName: string;
  customerName: string | null;
  invoiceNumber: string;
  amount: string;
  paidAt: string;
  publicUrl: string;
  brandColor: string;
}) {
  const greeting = customerName ? `Hi ${customerName},` : "Hello,";
  const paidDate = new Date(paidAt);
  const paidLabel = Number.isNaN(paidDate.getTime())
    ? "your payment"
    : paidDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });

  return (
    <div style={{ margin: 0, padding: "28px 12px", backgroundColor: "#f7f8fa", fontFamily: "Arial, Helvetica, sans-serif", color: "#22252b" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", backgroundColor: "#ffffff", border: "1px solid #e2e4e9", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ height: 6, backgroundColor: brandColor }} />
        <div style={{ padding: "30px 30px 26px" }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{merchantName}</div>
          <div style={{ fontSize: 13, color: "#646b76", marginBottom: 28 }}>Paid invoice {invoiceNumber}</div>

          <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 16px" }}>{greeting}</p>
          <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 22px" }}>
            Thank you for your payment to {merchantName}. Your payment of <strong>{amount}</strong> was recorded on {paidLabel}. Your paid invoice is ready below.
          </p>

          <a
            href={publicUrl}
            style={{ display: "inline-block", backgroundColor: brandColor, color: "#ffffff", textDecoration: "none", fontSize: 15, fontWeight: 700, padding: "13px 20px", borderRadius: 10 }}
          >
            View Paid Invoice PDF
          </a>

          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#646b76", margin: "24px 0 0" }}>
            This secure link opens your paid invoice PDF. If you receive a newer invoice email later, use the newest link.
          </p>
        </div>
        <div style={{ borderTop: "1px solid #e2e4e9", padding: "18px 30px", fontSize: 12, lineHeight: 1.5, color: "#8a9099" }}>
          Paid invoice provided by {merchantName} using Qalt.
        </div>
      </div>
    </div>
  );
}

export async function sendPaidInvoiceEmail(
  input: SendPaidInvoiceEmailInput
): Promise<SendPaidInvoiceEmailResult> {
  const document = await prisma.customerDocument.findFirst({
    where: {
      companyId: input.companyId,
      quoteRequestId: input.quoteRequestId,
      type: "INVOICE",
      status: "PAID",
    },
  });

  if (!document) {
    throw new Error("Paid invoice not found.");
  }

  const snapshot = parseInvoiceSnapshot(document.snapshot);
  const recipient = normalizeRecipient(input.to ?? snapshot.customer.email);
  if (!recipient) {
    throw new Error("Paid invoice has no valid customer email address.");
  }

  const merchantName = snapshot.merchant.name || "Your delivery provider";
  const previousTokenHash = document.publicTokenHash;
  const access = await rotatePublicDocumentToken({
    companyId: input.companyId,
    documentId: document.id,
  });

  const currentTokenHash = access.document.publicTokenHash;
  const publicUrl = `${getAppOrigin()}/documents/${access.token}`;
  const invoiceNumber = snapshot.document.number || document.number;
  const subject = `${merchantName} sent you paid invoice ${invoiceNumber}`;

  const result = await sendEmail({
    to: recipient,
    subject,
    react: (
      <PaidInvoiceEmail
        merchantName={merchantName}
        customerName={snapshot.customer.name}
        invoiceNumber={invoiceNumber}
        amount={formatUsd(snapshot.pricing.total)}
        paidAt={snapshot.document.paidAt}
        publicUrl={publicUrl}
        brandColor={snapshot.merchant.brandColor}
      />
    ),
  });

  if (!result.success) {
    await prisma.customerDocument.updateMany({
      where: {
        id: document.id,
        companyId: input.companyId,
        publicTokenHash: currentTokenHash,
      },
      data: { publicTokenHash: previousTokenHash },
    });
    throw new Error("Paid invoice email could not be sent.");
  }

  const emailedAt = input.now ?? new Date();
  const updated = await prisma.customerDocument.updateMany({
    where: {
      id: document.id,
      companyId: input.companyId,
      publicTokenHash: currentTokenHash,
    },
    data: { lastEmailedAt: emailedAt },
  });

  if (updated.count === 0) {
    throw new Error("Paid invoice email was sent, but document delivery state changed concurrently.");
  }

  const finalDocument = await prisma.customerDocument.findFirst({
    where: { id: document.id, companyId: input.companyId },
  });
  if (!finalDocument) {
    throw new Error("Paid invoice not found after email delivery.");
  }

  const emailData = result.data as { id?: string } | null | undefined;
  return {
    document: finalDocument,
    recipient,
    publicUrl,
    emailId: typeof emailData?.id === "string" ? emailData.id : null,
  };
}
