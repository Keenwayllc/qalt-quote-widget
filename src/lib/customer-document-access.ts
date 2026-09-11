import { randomBytes, createHash } from "crypto";
import prisma from "@/lib/prisma";
import type { CustomerDocument } from "@/generated/prisma/client";
import { DocumentError } from "@/lib/customer-documents";

// Server-only: generates bearer secrets, hashes them, and mutates document access.
// Must never run in the browser. Replace with `import "server-only"` if that
// package is ever added.
if (typeof window !== "undefined") {
  throw new Error(
    "customer-document-access.ts is server-only and must not be imported into client code."
  );
}

// 32 random bytes -> base64url is exactly 43 chars (no padding). This is the ONLY
// accepted public-token shape; anything else is rejected before any hashing/DB work.
const TOKEN_BYTES = 32;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;

// Documents that may be rendered over a public bearer link. DRAFT is never public.
const PUBLICLY_VIEWABLE_STATUSES: readonly string[] = ["ISSUED", "PAID"];

/** Cryptographically secure public document token: 256 bits, base64url, no padding. */
export function generatePublicDocumentToken(): string {
  return randomBytes(TOKEN_BYTES).toString("base64url");
}

/**
 * Canonical token hash. Generation and route lookup MUST both call this so a token
 * always maps to the same stored value. SHA-256, lowercase hex. Only the hash is
 * ever persisted — the plaintext token is never stored.
 */
export function hashPublicDocumentToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

/** Cheap shape gate: rejects anything that is not exactly our token shape (no `/`, no whitespace, no percent tricks). */
export function isValidPublicTokenShape(token: unknown): token is string {
  return typeof token === "string" && TOKEN_PATTERN.test(token);
}

export interface PublicDocumentAccessResult {
  /** Plaintext token, returned to the trusted server caller ONCE. Never stored or logged. */
  token: string;
  document: CustomerDocument;
}

async function assignPublicToken(
  companyId: string,
  documentId: string
): Promise<PublicDocumentAccessResult> {
  const token = generatePublicDocumentToken();
  const tokenHash = hashPublicDocumentToken(token);
  // Tenant-scoped: updateMany with { id, companyId } writes ONLY when the document
  // belongs to this company. Storing a fresh hash invalidates any previous link.
  const updated = await prisma.customerDocument.updateMany({
    where: { id: documentId, companyId },
    data: { publicTokenHash: tokenHash },
  });
  if (updated.count === 0) {
    throw new DocumentError("DOCUMENT_NOT_FOUND", "Document not found for this company.");
  }
  const document = await prisma.customerDocument.findUnique({ where: { id: documentId } });
  if (!document) {
    throw new DocumentError("DOCUMENT_NOT_FOUND", "Document not found.");
  }
  return { token, document };
}

/**
 * Create (or refresh) public access for a document the company owns. Generates a
 * secure token, stores ONLY its SHA-256 hash, and returns the plaintext token once
 * so a trusted caller can build `${APP_URL}/documents/${token}`. Generating a fresh
 * token invalidates any previous link.
 */
export function createPublicDocumentAccess(input: {
  companyId: string;
  documentId: string;
}): Promise<PublicDocumentAccessResult> {
  return assignPublicToken(input.companyId, input.documentId);
}

/**
 * Rotate the public token: issues a new token/hash and immediately invalidates the
 * previous link. Same tenant-scoped guarantee as creation.
 */
export function rotatePublicDocumentToken(input: {
  companyId: string;
  documentId: string;
}): Promise<PublicDocumentAccessResult> {
  return assignPublicToken(input.companyId, input.documentId);
}

/**
 * Revoke public access: clears publicTokenHash so any existing link fails closed
 * immediately. Tenant-scoped.
 */
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
 * Resolve a public bearer token to its document, or null. Fails closed on every
 * bad path (malformed / unknown / revoked / non-public status / unsupported type)
 * with an indistinguishable null so the caller can return a single generic 404 that
 * leaks nothing about existence. Performs NO Company or QuoteRequest access — the
 * immutable CustomerDocument snapshot is authoritative.
 */
export async function getPublicQuoteDocument(token: unknown): Promise<CustomerDocument | null> {
  if (!isValidPublicTokenShape(token)) return null;
  const tokenHash = hashPublicDocumentToken(token);
  const document = await prisma.customerDocument.findUnique({
    where: { publicTokenHash: tokenHash },
  });
  if (!document) return null; // unknown or revoked (revoked rows have a null hash)
  if (document.type !== "QUOTE") return null;
  if (!PUBLICLY_VIEWABLE_STATUSES.includes(document.status)) return null;
  return document;
}
