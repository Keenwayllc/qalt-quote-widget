import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  ensureIntegrationSchema,
  type IntegrationConnectionRow,
} from "@/lib/integration-auth";
import {
  createRefreshToken,
  verifyAuthorizationCode,
  verifyOAuthClient,
  verifyPkceS256,
  verifyRefreshToken,
} from "@/lib/qalt-oauth";

export const dynamic = "force-dynamic";

function tokenError(error: string, description: string, status = 400) {
  return NextResponse.json(
    { error, error_description: description },
    { status, headers: { "Cache-Control": "no-store", Pragma: "no-cache" } }
  );
}

async function activeConnection(connectionId: string, companyId: string) {
  await ensureIntegrationSchema();
  const rows = await prisma.$queryRawUnsafe<IntegrationConnectionRow[]>(
    `SELECT * FROM "IntegrationConnection" WHERE "id" = $1 AND "companyId" = $2 AND "revokedAt" IS NULL LIMIT 1`,
    connectionId,
    companyId
  );
  return rows[0] || null;
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) return tokenError("invalid_request", "Expected form-encoded OAuth parameters.");

  const grantType = String(form.get("grant_type") || "");
  const clientId = String(form.get("client_id") || "");
  if (!clientId || !(await verifyOAuthClient(clientId))) {
    return tokenError("invalid_client", "Unknown or expired OAuth client.", 401);
  }

  if (grantType === "authorization_code") {
    const code = String(form.get("code") || "");
    const redirectUri = String(form.get("redirect_uri") || "");
    const codeVerifier = String(form.get("code_verifier") || "");
    if (!code || !redirectUri || !codeVerifier) {
      return tokenError("invalid_request", "code, redirect_uri, and code_verifier are required.");
    }

    const payload = await verifyAuthorizationCode(code);
    if (!payload) return tokenError("invalid_grant", "The authorization code is invalid or expired.");

    const payloadClientId = typeof payload.clientId === "string" ? payload.clientId : "";
    const payloadRedirectUri = typeof payload.redirectUri === "string" ? payload.redirectUri : "";
    const companyId = typeof payload.companyId === "string" ? payload.companyId : "";
    const connectionId = typeof payload.connectionId === "string" ? payload.connectionId : "";
    const accessToken = typeof payload.accessToken === "string" ? payload.accessToken : "";
    const codeChallenge = typeof payload.codeChallenge === "string" ? payload.codeChallenge : "";
    const resource = typeof payload.resource === "string" ? payload.resource : undefined;
    const scopes = Array.isArray(payload.scopes)
      ? payload.scopes.filter((value): value is string => typeof value === "string")
      : [];

    if (payloadClientId !== clientId || payloadRedirectUri !== redirectUri) {
      return tokenError("invalid_grant", "The authorization code does not match this client or redirect URI.");
    }
    if (!codeChallenge || !verifyPkceS256(codeVerifier, codeChallenge)) {
      return tokenError("invalid_grant", "PKCE verification failed.");
    }
    if (!companyId || !connectionId || !accessToken || !(await activeConnection(connectionId, companyId))) {
      return tokenError("invalid_grant", "The authorized Qalt connection is no longer active.");
    }

    const refreshToken = await createRefreshToken({
      clientId,
      companyId,
      connectionId,
      accessToken,
      scopes,
      resource,
    });

    return NextResponse.json(
      {
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: refreshToken,
        scope: scopes.join(" "),
      },
      { headers: { "Cache-Control": "no-store", Pragma: "no-cache" } }
    );
  }

  if (grantType === "refresh_token") {
    const refreshToken = String(form.get("refresh_token") || "");
    const payload = refreshToken ? await verifyRefreshToken(refreshToken) : null;
    if (!payload) return tokenError("invalid_grant", "The refresh token is invalid or expired.");

    const payloadClientId = typeof payload.clientId === "string" ? payload.clientId : "";
    const companyId = typeof payload.companyId === "string" ? payload.companyId : "";
    const connectionId = typeof payload.connectionId === "string" ? payload.connectionId : "";
    const accessToken = typeof payload.accessToken === "string" ? payload.accessToken : "";
    const resource = typeof payload.resource === "string" ? payload.resource : undefined;
    const scopes = Array.isArray(payload.scopes)
      ? payload.scopes.filter((value): value is string => typeof value === "string")
      : [];

    if (payloadClientId !== clientId) {
      return tokenError("invalid_grant", "The refresh token does not belong to this client.");
    }
    if (!companyId || !connectionId || !accessToken || !(await activeConnection(connectionId, companyId))) {
      return tokenError("invalid_grant", "The Qalt connection has been revoked or removed.");
    }

    const nextRefreshToken = await createRefreshToken({
      clientId,
      companyId,
      connectionId,
      accessToken,
      scopes,
      resource,
    });

    return NextResponse.json(
      {
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: nextRefreshToken,
        scope: scopes.join(" "),
      },
      { headers: { "Cache-Control": "no-store", Pragma: "no-cache" } }
    );
  }

  return tokenError("unsupported_grant_type", "Qalt supports authorization_code and refresh_token grants.");
}
