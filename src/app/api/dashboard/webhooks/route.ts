import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getEntitlements } from "@/lib/plans";
import crypto from "crypto";

async function getAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET() {
  try {
    const payload = await getAuth();
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({
      where: { id: payload.companyId },
      select: { subscriptionPlan: true },
    });
    if (!getEntitlements(company?.subscriptionPlan).isWebhookEnabled) {
      return NextResponse.json({ error: "Upgrade required" }, { status: 403 });
    }

    const webhooks = await prisma.webhook.findMany({
      where: { companyId: payload.companyId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ webhooks });
  } catch (err) {
    console.error("GET /webhooks error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const payload = await getAuth();
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({
      where: { id: payload.companyId },
      select: { subscriptionPlan: true },
    });
    if (!getEntitlements(company?.subscriptionPlan).isWebhookEnabled) {
      return NextResponse.json({ error: "Upgrade required" }, { status: 403 });
    }

    const { url, events } = await req.json();

    if (!url || typeof url !== "string" || !url.startsWith("http")) {
      return NextResponse.json({ error: "Valid URL required" }, { status: 400 });
    }
    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ error: "At least one event required" }, { status: 400 });
    }

    const secret = crypto.randomBytes(32).toString("hex");

    const webhook = await prisma.webhook.create({
      data: {
        companyId: payload.companyId,
        url,
        events,
        secret,
        enabled: true,
      },
    });

    return NextResponse.json({ webhook });
  } catch (err) {
    console.error("POST /webhooks error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
