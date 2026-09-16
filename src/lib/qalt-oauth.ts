import crypto from "crypto";
import * as jose from "jose";

const OAUTH_ISSUER = "qalt-oauth";

function getSecret() {
  const secret = process.env.JWT_SECRET || "dev-fallback-secret-key-only-for-local-use";
  return new TextEncoder().encode(secret);
}

async function signPurposeToken(
  purpose: string,
  payload: Record<string, unknown>,
  expiresIn: string
) {
  return new jose.SignJWT({ ...payload, purpose })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(OAUTH_ISSUER)
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

async function verifyPurposeToken(token: string, purpose: string) {
  try {
    const { payload } = await jose.jwtVerify(token, getSecret(), {
      issuer: OAUTH_ISSUER,
    });
    if (payload.purpose !== purpose) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createOAuthClient(params: {
  redirectUris: string[];
  clientName?: string;
}) {
  return signPurposeToken(
    "oauth-client",
    {
      redirectUris: params.redirectUris,
      clientName: params.clientName || "ChatGPT",
    },
    "365d"
  );
}

export async function verifyOAuthClient(clientId: string) {
  const payload = await verifyPurposeToken(clientId, "oauth-client");
  if (!payload) return null;
  const redirectUris = Array.isArray(payload.redirectUris)
    ? payload.redirectUris.filter((value): value is string => typeof value === "string")
    : [];
  if (!redirectUris.length) return null;
  return {
    redirectUris,
    clientName: typeof payload.clientName === "string" ? payload.clientName : "ChatGPT",
  };
}

export async function createAuthorizationCode(params: {
  clientId: string;
  redirectUri: string;
  companyId: string;
  connectionId: string;
  accessToken: string;
  scopes: string[];
  codeChallenge: string;
  resource?: string;
}) {
  return signPurposeToken(
    "oauth-code",
    {
      clientId: params.clientId,
      redirectUri: params.redirectUri,
      companyId: params.companyId,
      connectionId: params.connectionId,
      accessToken: params.accessToken,
      scopes: params.scopes,
      codeChallenge: params.codeChallenge,
      resource: params.resource || null,
    },
    "5m"
  );
}

export async function verifyAuthorizationCode(code: string) {
  return verifyPurposeToken(code, "oauth-code");
}

export async function createRefreshToken(params: {
  clientId: string;
  companyId: string;
  connectionId: string;
  accessToken: string;
  scopes: string[];
  resource?: string;
}) {
  return signPurposeToken(
    "oauth-refresh",
    {
      clientId: params.clientId,
      companyId: params.companyId,
      connectionId: params.connectionId,
      accessToken: params.accessToken,
      scopes: params.scopes,
      resource: params.resource || null,
    },
    "90d"
  );
}

export async function verifyRefreshToken(token: string) {
  return verifyPurposeToken(token, "oauth-refresh");
}

export function verifyPkceS256(verifier: string, challenge: string) {
  const digest = crypto.createHash("sha256").update(verifier).digest("base64url");
  const a = Buffer.from(digest);
  const b = Buffer.from(challenge);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function validHttpsRedirectUri(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}
