import { NextResponse } from "next/server";
import crypto from "crypto";
import { isValidShopDomain } from "@/lib/shopify";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get("shop");

  if (!isValidShopDomain(shop)) {
    return NextResponse.json({ error: "Invalid shop" }, { status: 400 });
  }

  const clientId = process.env.SHOPIFY_CLIENT_ID!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/shopify/callback`;
  const scopes = "write_script_tags,read_script_tags";
  const state = crypto.randomBytes(16).toString("hex");

  const installUrl =
    `https://${shop}/admin/oauth/authorize` +
    `?client_id=${clientId}` +
    `&scope=${scopes}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=${state}`;

  const response = NextResponse.redirect(installUrl);
  response.cookies.set("shopify_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
  });
  return response;
}
