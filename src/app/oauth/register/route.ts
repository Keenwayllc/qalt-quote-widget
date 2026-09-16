import { NextResponse } from "next/server";
import { createOAuthClient, validHttpsRedirectUri } from "@/lib/qalt-oauth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const redirectUris = Array.isArray(body?.redirect_uris)
    ? body.redirect_uris.filter((value: unknown): value is string => typeof value === "string" && validHttpsRedirectUri(value))
    : [];

  if (!redirectUris.length) {
    return NextResponse.json(
      { error: "invalid_redirect_uri", error_description: "At least one HTTPS redirect URI is required." },
      { status: 400 }
    );
  }

  const clientId = await createOAuthClient({
    redirectUris,
    clientName: typeof body?.client_name === "string" ? body.client_name.slice(0, 120) : "ChatGPT",
  });

  return NextResponse.json(
    {
      client_id: clientId,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      redirect_uris: redirectUris,
      client_name: typeof body?.client_name === "string" ? body.client_name.slice(0, 120) : "ChatGPT",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    },
    { status: 201, headers: { "Cache-Control": "no-store" } }
  );
}
