import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getEntitlements } from "@/lib/plans";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const forms = await prisma.widgetSettings.findMany({
      where: { companyId: payload.companyId },
      orderBy: { id: "asc" },
      select: { id: true, name: true },
    });

    return NextResponse.json({ forms });
  } catch (error) {
    console.error("Forms fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({
      where: { id: payload.companyId },
      include: { widgetSettings: { select: { id: true } } },
    });
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const entitlements = getEntitlements(company.subscriptionPlan);
    const currentCount = company.widgetSettings.length;
    const limit = entitlements.maxForms;

    if (limit !== "unlimited" && currentCount >= limit) {
      return NextResponse.json(
        { error: `Your plan allows up to ${limit} form${limit === 1 ? "" : "s"}. Upgrade to create more.` },
        { status: 403 }
      );
    }

    const { name } = await req.json();

    const form = await prisma.widgetSettings.create({
      data: {
        companyId: payload.companyId,
        name: name?.trim() || "New Form",
      },
    });

    return NextResponse.json({ form });
  } catch (error) {
    console.error("Form create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
