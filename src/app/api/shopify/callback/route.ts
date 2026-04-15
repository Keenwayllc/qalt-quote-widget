import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

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

  // Verify HMAC
  const params = Object.fromEntries(searchParams.entries());
  delete params.hmac;
  const message = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const digest = crypto
    .createHmac("sha256", process.env.SHOPIFY_CLIENT_SECRET!)
    .update(message)
    .digest("hex");
  if (digest !== hmac) {
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

  // Save or update install record
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
