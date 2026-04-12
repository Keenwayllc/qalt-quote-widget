import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { webhookId } = await req.json();

    const hook = await prisma.webhook.findUnique({ where: { id: webhookId } });
    if (!hook || hook.companyId !== payload.companyId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const testPayload = JSON.stringify({
      event: "quote.created",
      timestamp: new Date().toISOString(),
      data: {
        quote: {
          id: "test_" + crypto.randomBytes(4).toString("hex"),
          customerName: "Test Customer",
          customerEmail: "test@example.com",
          customerPhone: null,
          pickupZip: "10001",
          dropoffZip: "10002",
          distanceMiles: 5.2,
          estimatedPrice: 45.0,
          status: "PENDING",
          serviceType: "Standard Delivery",
          awbNumber: null,
          vehicleCount: null,
          createdAt: new Date().toISOString(),
        },
      },
      _test: true,
    });

    const sig = crypto
      .createHmac("sha256", hook.secret)
      .update(testPayload)
      .digest("hex");

    let status = 0;
    let ok = false;
    try {
      const res = await fetch(hook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Qalt-Event": "quote.created",
          "X-Qalt-Signature": `sha256=${sig}`,
        },
        body: testPayload,
        signal: AbortSignal.timeout(8000),
      });
      status = res.status;
      ok = res.ok;
    } catch (fetchErr) {
      return NextResponse.json({
        success: false,
        error: `Delivery failed: ${(fetchErr as Error).message}`,
      });
    }

    return NextResponse.json({ success: ok, httpStatus: status });
  } catch (err) {
    console.error("POST /webhooks/test error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
