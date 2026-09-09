import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { isValidShopDomain, safeTimingEqual } from "@/lib/shopify";

function verifyHmac(body: string, hmacHeader: string): boolean {
  const secret = process.env.SHOPIFY_CLIENT_SECRET;
  if (!secret) return false; // fail closed — never authenticate without a secret

  // Shopify sends the HMAC as standard base64 of a 32-byte SHA-256 digest, which
  // is always exactly 43 base64 chars + one '=' pad. Enforce that canonical form
  // so truncated / oversized / malformed headers (or valid-prefix-plus-junk that
  // base64 would otherwise decode leniently) are rejected cleanly — no throw.
  if (!/^[A-Za-z0-9+/]{43}=$/.test(hmacHeader)) return false;

  const expected = crypto.createHmac("sha256", secret).update(body, "utf8").digest();
  const supplied = Buffer.from(hmacHeader, "base64");
  return safeTimingEqual(expected, supplied);
}

export async function POST(req: Request) {
  const hmacHeader = req.headers.get("x-shopify-hmac-sha256") ?? "";
  const topic = req.headers.get("x-shopify-topic") ?? "";

  const body = await req.text();

  if (!verifyHmac(body, hmacHeader)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(body);
  } catch {
    return new NextResponse("Bad Request", { status: 400 });
  }

  if (topic === "customers/data_request") {
    // Acknowledge — we store quote requests by email, not by Shopify customer ID.
    // No further action required for this topic.
    return new NextResponse(null, { status: 200 });
  }

  if (topic === "customers/redact") {
    const customer = payload.customer as { email?: string } | undefined;
    const email = customer?.email;
    // Validate shop_domain before any DB lookup/delete so a malformed value
    // cannot be used as a query key. Acknowledge either way (compliance ack).
    const shopDomain = payload.shop_domain;
    if (email && isValidShopDomain(shopDomain)) {
      // Delete all quote requests associated with this customer email
      // scoped to the shop's linked Qalt company
      const install = await prisma.shopifyInstall.findUnique({
        where: { shop: shopDomain },
      });
      if (install?.companyId) {
        await prisma.quoteRequest.deleteMany({
          where: { companyId: install.companyId, customerEmail: email },
        });
      }
    }
    return new NextResponse(null, { status: 200 });
  }

  if (topic === "shop/redact") {
    const shopDomain = payload.shop_domain;
    if (isValidShopDomain(shopDomain)) {
      // 48 hours after uninstall — delete the install record entirely
      await prisma.shopifyInstall.deleteMany({ where: { shop: shopDomain } });
    }
    return new NextResponse(null, { status: 200 });
  }

  // Unknown topic — still acknowledge to avoid retries
  return new NextResponse(null, { status: 200 });
}
