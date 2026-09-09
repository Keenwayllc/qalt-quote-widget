import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { isValidShopDomain, safeTimingEqual } from "@/lib/shopify";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get("shop");
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const hmac = searchParams.get("hmac");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  // Validate state (CSRF)
  const cookies = req.headers.get("cookie") || "";
  const savedState = cookies
    .split(";")
    .find((c) => c.trim().startsWith("shopify_oauth_state="))
    ?.split("=")[1]
    ?.trim();

  if (!state || state !== savedState) {
    return NextResponse.json({ error: "Invalid state" }, { status: 403 });
  }

  if (!shop || !code || !hmac) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  // Validate the shop hostname before it is used in the token-exchange URL.
  if (!isValidShopDomain(shop)) {
    return NextResponse.json({ error: "Invalid shop" }, { status: 400 });
  }

  // Fail closed if the signing secret is not configured — never authenticate.
  const secret = process.env.SHOPIFY_CLIENT_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  // The supplied hmac must be a plausible SHA-256 hex digest (64 hex chars).
  // Anything malformed is rejected before any comparison, token exchange, or
  // DB write — and without letting a length/format mismatch throw.
  if (!/^[0-9a-f]{64}$/i.test(hmac)) {
    return NextResponse.json({ error: "HMAC verification failed" }, { status: 403 });
  }

  // Verify HMAC (constant-time over the raw digest bytes).
  const params = Object.fromEntries(searchParams.entries());
  delete params.hmac;
  const message = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const digest = crypto.createHmac("sha256", secret).update(message).digest("hex");
  if (!safeTimingEqual(Buffer.from(digest, "hex"), Buffer.from(hmac, "hex"))) {
    return NextResponse.json({ error: "HMAC verification failed" }, { status: 403 });
  }

  // Exchange code for access token
  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
      code,
    }),
  });
  const tokenData = await tokenRes.json();
  const accessToken: string = tokenData.access_token;

  if (!accessToken) {
    return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
  }

  // Save or update install record. INVARIANT: `update` refreshes ONLY the
  // accessToken and never writes companyId, so re-running OAuth for an already
  // linked shop can never detach or reassign it to another Qalt tenant. Linking
  // happens exclusively in the authenticated /api/shopify/connect route.
  await prisma.shopifyInstall.upsert({
    where: { shop },
    update: { accessToken },
    create: { shop, accessToken },
  });

  // Redirect to connect page so merchant can link their Qalt account
  const res = NextResponse.redirect(`${appUrl}/shopify/connect?shop=${shop}`);
  res.cookies.delete("shopify_oauth_state");
  return res;
}
