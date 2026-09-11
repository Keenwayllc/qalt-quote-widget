import prisma from "@/lib/prisma";
import { issueQuoteDocument, DocumentError } from "@/lib/customer-documents";
import { rotatePublicDocumentToken } from "@/lib/customer-document-access";
import { parseQuoteSnapshot } from "@/lib/customer-document-snapshots";
import { sendEmail } from "@/lib/email";
import type { CustomerDocument } from "@/generated/prisma/client";

// Server-only: this module rotates bearer links, sends customer email, and updates
// document delivery metadata. It must never be imported into client code.
if (typeof window !== "undefined") {
  throw new Error(
    "customer-document-email.tsx is server-only and must not be imported into client code."
  );
}

const DEFAULT_APP_URL = "https://www.qalt.site";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SendQuoteDocumentEmailInput {
  /** Trusted, server-authenticated company id. Never a browser authorization value. */
  companyId: string;
  quoteRequestId: string;
  /** Optional trusted-server override. Defaults to the immutable snapshot customer email. */
  to?: string;
  /** Overrides the delivery timestamp for tests. Defaults to now. */
  now?: Date;
}

export interface SendQuoteDocumentEmailResult {
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

function QuoteEmail({
  merchantName,
  customerName,
  quoteNumber,
  amount,
  publicUrl,
  brandColor,
}: {
  merchantName: string;
  customerName: string | null;
  quoteNumber: string;
  amount: string;
  publicUrl: string;
  brandColor: string;
}) {
  const greeting = customerName ? `Hi ${customerName},` : "Hello,";

  return (
    <div style={{ margin: 0, padding: "28px 12px", backgroundColor: "#f7f8fa", fontFamily: "Arial, Helvetica, sans-serif", color: "#22252b" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", backgroundColor: "#ffffff", border: "1px solid #e2e4e9", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ height: 6, backgroundColor: brandColor }} />
        <div style={{ padding: "30px 30px 26px" }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{merchantName}</div>
          <div style={{ fontSize: 13, color: "#646b76", marginBottom: 28 }}>Delivery quote {quoteNumber}</div>

          <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 16px" }}>{greeting}</p>
          <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 22px" }}>
            {merchantName} prepared a delivery quote for you through Qalt. Your quoted total is <strong>{amount}</strong>.
          </p>

          <a
            href={publicUrl}
            style={{ display: "inline-block", backgroundColor: brandColor, color: "#ffffff", textDecoration: "none", fontSize: 15, fontWeight: 700, padding: "13px 20px", borderRadius: 10 }}
          >
            View Quote PDF
          </a>

          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#646b76", margin: "24px 0 0" }}>
            This secure link opens the issued quote PDF. If you received a newer quote email later, use the newest link.
          </p>
        </div>
        <div style={{ borderTop: "1px solid #e2e4e9", padding: "18px 30px", fontSize: 12, lineHeight: 1.5, color: "#8a9099" }}>
          Quote prepared by {merchantName} using Qalt.
        </div>
      </div>
    </div>
  );
}

/**
 * Issue/reuse an immutable quote document and email a secure bearer link.
 *
 * Because Phase 16 stores only a one-way token hash, an existing plaintext token
 * cannot be recovered for a resend. Each successful send therefore rotates to a new
 * secure link; older emailed links become invalid. If Resend rejects/throws, the
 * previous hash is restored with a compare-and-swap guard so a previously valid link
 * is not unnecessarily revoked and a concurrent newer rotation is never clobbered.
 *
 * lastEmailedAt is written only after Resend reports success.
 */
export async function sendQuoteDocumentEmail(
  input: SendQuoteDocumentEmailInput
): Promise<SendQuoteDocumentEmailResult> {
  const document = await issueQuoteDocument({
    companyId: input.companyId,
    quoteRequestId: input.quoteRequestId,
    now: input.now,
  });

  if (document.type !== "QUOTE" || (document.status !== "ISSUED" && document.status !== "PAID")) {
    throw new DocumentError("DOCUMENT_NOT_FOUND", "Quote document is not available for email delivery.");
  }

  const snapshot = parseQuoteSnapshot(document.snapshot);
  const recipient = normalizeRecipient(input.to ?? snapshot.customer.email);
  if (!recipient) {
    throw new Error("Quote document has no valid customer email address.");
  }

  const merchantName = snapshot.merchant.name || "Your delivery provider";
  const previousTokenHash = document.publicTokenHash;
  const access = await rotatePublicDocumentToken({
    companyId: input.companyId,
    documentId: document.id,
  });

  const currentTokenHash = access.document.publicTokenHash;
  const publicUrl = `${getAppOrigin()}/documents/${access.token}`;
  const subject = `${merchantName} sent you quote ${snapshot.document.number || document.number}`;

  const result = await sendEmail({
    to: recipient,
    subject,
    react: (
      <QuoteEmail
        merchantName={merchantName}
        customerName={snapshot.customer.name}
        quoteNumber={snapshot.document.number || document.number}
        amount={formatUsd(snapshot.pricing.total)}
        publicUrl={publicUrl}
        brandColor={snapshot.merchant.brandColor}
      />
    ),
  });

  if (!result.success) {
    // Restore the previous link only if our token is still current. A concurrent
    // resend may already have rotated again; never overwrite that newer token.
    await prisma.customerDocument.updateMany({
      where: {
        id: document.id,
        companyId: input.companyId,
        publicTokenHash: currentTokenHash,
      },
      data: { publicTokenHash: previousTokenHash },
    });
    throw new Error("Quote email could not be sent.");
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
    // The email was accepted by Resend, but a concurrent rotation changed the
    // document before bookkeeping completed. Do not claim the stored link is ours.
    throw new Error("Quote email was sent, but document delivery state changed concurrently.");
  }

  const finalDocument = await prisma.customerDocument.findFirst({
    where: { id: document.id, companyId: input.companyId },
  });
  if (!finalDocument) {
    throw new DocumentError("DOCUMENT_NOT_FOUND", "Document not found after email delivery.");
  }

  const emailData = result.data as { id?: string } | null | undefined;
  return {
    document: finalDocument,
    recipient,
    publicUrl,
    emailId: typeof emailData?.id === "string" ? emailData.id : null,
  };
}
