import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

function verifyHmac(body: string, hmacHeader: string): boolean {
  const secret = process.env.SHOPIFY_CLIENT_SECRET!;
  const digest = crypto
    .createHmac("sha256", secret)
    .update(body, "utf8")
    .digest("base64");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader));
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
    if (email) {
      // Delete all quote requests associated with this customer email
      // scoped to the shop's linked Qalt company
      const shopDomain = payload.shop_domain as string | undefined;
      if (shopDomain) {
        const install = await prisma.shopifyInstall.findUnique({
          where: { shop: shopDomain },
        });
        if (install?.companyId) {
          await prisma.quoteRequest.deleteMany({
            where: { companyId: install.companyId, customerEmail: email },
          });
        }
      }
    }
    return new NextResponse(null, { status: 200 });
  }

  if (topic === "shop/redact") {
    const shopDomain = payload.shop_domain as string | undefined;
    if (shopDomain) {
      // 48 hours after uninstall — delete the install record entirely
      await prisma.shopifyInstall.deleteMany({ where: { shop: shopDomain } });
    }
    return new NextResponse(null, { status: 200 });
  }

  // Unknown topic — still acknowledge to avoid retries
  return new NextResponse(null, { status: 200 });
}
