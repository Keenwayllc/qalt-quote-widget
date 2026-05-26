import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

const PLANS = ["STARTER", "PRO", "ENTERPRISE"];

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload?.companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Only platform admins may change plans
    const me = await prisma.company.findUnique({
      where: { id: payload.companyId },
      select: { isAdmin: true },
    });
    if (!me?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { companyId, plan } = await req.json();
    if (!companyId || !PLANS.includes(plan)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Setting a plan from the admin panel is a permanent comp: clear any trial
    // window so the dashboard's trial-expiry logic never downgrades it.
    await prisma.company.update({
      where: { id: companyId },
      data: { subscriptionPlan: plan, trialEndsAt: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin set-plan error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
