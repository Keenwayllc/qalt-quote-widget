import * as jose from "jose";
import bcrypt from "bcryptjs";

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
