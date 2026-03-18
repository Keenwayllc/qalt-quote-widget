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

    const company = await prisma.company.findUnique({
      where: { id: payload.companyId },
      include: { widgetSettings: true },
    });

    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const entitlements = getEntitlements(company.subscriptionPlan);
    
    // Filter settings if not on advanced plan
    const widgetSettings = company.widgetSettings ? {
      ...company.widgetSettings,
      backgroundImageUrl: entitlements.isAdvancedCustomizationEnabled ? company.widgetSettings.backgroundImageUrl : null,
      companyNameText: company.widgetSettings.companyNameText,
      companyNameFont: company.widgetSettings.companyNameFont || "Inter",
      websiteUrl: company.widgetSettings.websiteUrl ?? null,
    } : null;

    return NextResponse.json({ 
      id: company.id, 
      name: company.name, 
      subscriptionPlan: company.subscriptionPlan,
      widgetSettings: widgetSettings 
    });
  } catch (error) {
    console.error("Widget settings fetch error:", error);
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
      where: { id: payload.companyId }
    });

    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const entitlements = getEntitlements(company.subscriptionPlan);
    const data = await req.json();

    const settingsData = {
      showWeight:        Boolean(data.showWeight),
      showExtras:        Boolean(data.showExtras),
      primaryColor:      data.primaryColor      || "#3B82F6",
      buttonText:        data.buttonText        || "Get Instant Quote",
      headerText:        data.headerText        || "Delivery Quote Calculator",
      disclaimerText:    (entitlements.isAdvancedCustomizationEnabled && data.disclaimerText)
                          ? data.disclaimerText 
                          : "Estimate only. Final price confirmed after booking.",
      backgroundImageUrl: entitlements.isAdvancedCustomizationEnabled ? (data.backgroundImageUrl ?? null) : null,
      companyNameText:   data.companyNameText ?? null,
      companyNameFont:   data.companyNameFont || "Inter",
      mapLayout:         ["inline", "side"].includes(data.mapLayout) ? data.mapLayout : "inline",
      websiteUrl:        data.websiteUrl ? String(data.websiteUrl).trim() : null,
    };

    await prisma.widgetSettings.upsert({
      where:  { companyId: payload.companyId },
      update: settingsData,
      create: { companyId: payload.companyId, ...settingsData },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Widget settings update error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
