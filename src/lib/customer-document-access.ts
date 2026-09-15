import { randomBytes, createHash } from "crypto";
import prisma from "@/lib/prisma";
import type { CustomerDocument } from "@/generated/prisma/client";
import { DocumentError } from "@/lib/customer-documents";

// Server-only: generates bearer secrets, hashes them, and mutates document access.
if (typeof window !== "undefined") {
  throw new Error(
    "customer-document-access.ts is server-only and must not be imported into client code."
  );
}

const TOKEN_BYTES = 32;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const PUBLICLY_VIEWABLE_STATUSES: readonly string[] = ["ISSUED", "PAID"];
const PUBLICLY_VIEWABLE_TYPES: readonly string[] = ["QUOTE", "INVOICE"];

/** Cryptographically secure public document token: 256 bits, base64url, no padding. */
export function generatePublicDocumentToken(): string {
  return randomBytes(TOKEN_BYTES).toString("base64url");
}

/** SHA-256, lowercase hex. Only the hash is persisted. */
export function hashPublicDocumentToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export function isValidPublicTokenShape(token: unknown): token is string {
  return typeof token === "string" && TOKEN_PATTERN.test(token);
}

export interface PublicDocumentAccessResult {
  /** Plaintext token, returned to the trusted server caller once. Never stored or logged. */
  token: string;
  document: CustomerDocument;
}

async function assignPublicToken(
  companyId: string,
  documentId: string
): Promise<PublicDocumentAccessResult> {
  const token = generatePublicDocumentToken();
  const tokenHash = hashPublicDocumentToken(token);
  const updated = await prisma.customerDocument.updateMany({
    where: { id: documentId, companyId },
    data: { publicTokenHash: tokenHash },
  });
  if (updated.count === 0) {
    throw new DocumentError("DOCUMENT_NOT_FOUND", "Document not found for this company.");
  }
  const document = await prisma.customerDocument.findFirst({
    where: { id: documentId, companyId },
  });
  if (!document) {
    throw new DocumentError("DOCUMENT_NOT_FOUND", "Document not found.");
  }
  return { token, document };
}

export function createPublicDocumentAccess(input: {
  companyId: string;
  documentId: string;
}): Promise<PublicDocumentAccessResult> {
  return assignPublicToken(input.companyId, input.documentId);
}

export function rotatePublicDocumentToken(input: {
  companyId: string;
  documentId: string;
}): Promise<PublicDocumentAccessResult> {
  return assignPublicToken(input.companyId, input.documentId);
}

export async function revokePublicDocumentAccess(input: {
  companyId: string;
  documentId: string;
}): Promise<void> {
  const updated = await prisma.customerDocument.updateMany({
    where: { id: input.documentId, companyId: input.companyId },
    data: { publicTokenHash: null },
  });
  if (updated.count === 0) {
    throw new DocumentError("DOCUMENT_NOT_FOUND", "Document not found for this company.");
  }
}

/**
 * Resolve a public bearer token to a supported customer document, or null.
 * QUOTE and paid INVOICE records may be public. DRAFT and unsupported types fail
 * closed with the same null result so callers can return one generic 404.
 */
export async function getPublicCustomerDocument(token: unknown): Promise<CustomerDocument | null> {
  if (!isValidPublicTokenShape(token)) return null;
  const tokenHash = hashPublicDocumentToken(token);
  const document = await prisma.customerDocument.findUnique({
    where: { publicTokenHash: tokenHash },
  });
  if (!document) return null;
  if (!PUBLICLY_VIEWABLE_TYPES.includes(document.type)) return null;
  if (!PUBLICLY_VIEWABLE_STATUSES.includes(document.status)) return null;
  if (document.type === "INVOICE" && document.status !== "PAID") return null;
  return document;
}

/** Backwards-compatible quote-only resolver for existing callers. */
export async function getPublicQuoteDocument(token: unknown): Promise<CustomerDocument | null> {
  const document = await getPublicCustomerDocument(token);
  return document?.type === "QUOTE" ? document : null;
}
