import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getEntitlements } from "@/lib/plans";
import {
  createIntegrationSecret,
  ensureIntegrationSchema,
  normalizeScopes,
  writeIntegrationAudit,
} from "@/lib/integration-auth";
import { createAuthorizationCode, verifyOAuthClient } from "@/lib/qalt-oauth";

export const dynamic = "force-dynamic";

function oauthError(redirectUri: string | null, state: string | null, error: string, description: string) {
  if (!redirectUri) {
    return NextResponse.json({ error, error_description: description }, { status: 400 });
  }
  const url = new URL(redirectUri);
  url.searchParams.set("error", error);
  url.searchParams.set("error_description", description);
  if (state) url.searchParams.set("state", state);
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const responseType = url.searchParams.get("response_type");
  const clientId = url.searchParams.get("client_id") || "";
  const redirectUri = url.searchParams.get("redirect_uri");
  const state = url.searchParams.get("state");
  const scope = url.searchParams.get("scope") || "";
  const codeChallenge = url.searchParams.get("code_challenge") || "";
  const codeChallengeMethod = url.searchParams.get("code_challenge_method") || "";
  const resource = url.searchParams.get("resource") || `${origin}/api/mcp`;

  if (responseType !== "code") {
    return oauthError(redirectUri, state, "unsupported_response_type", "Qalt supports the authorization code flow.");
  }

  const client = await verifyOAuthClient(clientId);
  if (!client || !redirectUri || !client.redirectUris.includes(redirectUri)) {
    return NextResponse.json(
      { error: "invalid_client", error_description: "The OAuth client or redirect URI is not registered." },
      { status: 400 }
    );
  }

  if (!codeChallenge || codeChallengeMethod !== "S256") {
    return oauthError(redirectUri, state, "invalid_request", "PKCE with S256 is required.");
  }

  if (resource !== `${origin}/api/mcp`) {
    return oauthError(redirectUri, state, "invalid_target", "The requested OAuth resource is not supported.");
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("qalt_token")?.value;
  const auth = sessionToken ? await verifyToken(sessionToken) : null;

  if (!auth?.companyId) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("redirect", url.toString());
    return NextResponse.redirect(loginUrl);
  }

  const company = await prisma.company.findUnique({
    where: { id: auth.companyId },
    select: {
      id: true,
      email: true,
      subscriptionPlan: true,
      isAdmin: true,
      isSuperAdmin: true,
    },
  });

  if (!company) {
    return oauthError(redirectUri, state, "access_denied", "The signed-in Qalt account was not found.");
  }

  const entitled = getEntitlements(company.subscriptionPlan).isWebhookEnabled;
  if (!entitled && !company.isAdmin && !company.isSuperAdmin) {
    return oauthError(redirectUri, state, "access_denied", "Qalt AI integrations require an eligible plan.");
  }

  await ensureIntegrationSchema();
  const requestedScopes = scope.split(/\s+/).filter(Boolean).filter((item) => item !== "offline_access");
  const scopes = normalizeScopes(requestedScopes);
  const secret = createIntegrationSecret();
  const connectionId = crypto.randomUUID();

  await prisma.$executeRawUnsafe(
    `INSERT INTO "IntegrationConnection" ("id", "companyId", "name", "provider", "tokenHash", "tokenPrefix", "scopes")
     VALUES ($1,$2,$3,$4,$5,$6,$7::text[])`,
    connectionId,
    company.id,
    client.clientName ? `${client.clientName} OAuth` : "ChatGPT OAuth",
    "CHATGPT",
    secret.tokenHash,
    secret.tokenPrefix,
    scopes
  );

  await writeIntegrationAudit({
    companyId: company.id,
    connectionId,
    action: "oauth.authorized",
    resource: "CHATGPT",
    metadata: { scopes, resource },
  });

  const code = await createAuthorizationCode({
    clientId,
    redirectUri,
    companyId: company.id,
    connectionId,
    accessToken: secret.token,
    scopes,
    codeChallenge,
    resource,
  });

  const callback = new URL(redirectUri);
  callback.searchParams.set("code", code);
  if (state) callback.searchParams.set("state", state);
  return NextResponse.redirect(callback);
}
