import * as jose from "jose";
import bcrypt from "bcryptjs";

/**
 * Canonical email form used everywhere an email is stored or compared:
 * trim surrounding whitespace and lowercase. Never mutate passwords or other
 * user-entered values with this. Use for every account email flow so login,
 * registration, password reset, verification, and email changes agree.
 */
export function normalizeEmail(email: unknown): string {
  return String(email ?? "").trim().toLowerCase();
}

function getSecret() {
  const secret = process.env.JWT_SECRET || "dev-fallback-secret-key-only-for-local-use";
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signToken(payload: { companyId: string; email: string }) {
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
  return token;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, getSecret());
    return payload as { companyId: string; email: string };
  } catch {
    return null;
  }
}

// Customer-facing capability token for the public payment-success page. It is a
// signed, expiring JWT carrying ONLY the quote + company ids plus an explicit
// purpose, so it cannot be used as (or confused with) a merchant session token
// and cannot be forged or tampered with. Stateless — no DB storage needed.
const CUSTOMER_QUOTE_PURPOSE = "payment-success";

export async function signCustomerQuoteToken(payload: { quoteId: string; companyId: string }) {
  return new jose.SignJWT({
    quoteId: payload.quoteId,
    companyId: payload.companyId,
    purpose: CUSTOMER_QUOTE_PURPOSE,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());
}

export async function verifyCustomerQuoteToken(
  token: string
): Promise<{ quoteId: string; companyId: string } | null> {
  try {
    const { payload } = await jose.jwtVerify(token, getSecret());
    // Reject anything that is not explicitly a payment-success capability
    // (e.g. a merchant session token signed with the same secret).
    if (payload.purpose !== CUSTOMER_QUOTE_PURPOSE) return null;
    const quoteId = typeof payload.quoteId === "string" ? payload.quoteId : null;
    const companyId = typeof payload.companyId === "string" ? payload.companyId : null;
    if (!quoteId || !companyId) return null;
    return { quoteId, companyId };
  } catch {
    return null;
  }
}
