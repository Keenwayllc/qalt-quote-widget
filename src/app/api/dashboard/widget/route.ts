import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getEntitlements } from "@/lib/plans";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const formId = searchParams.get("formId");

    const company = await prisma.company.findUnique({
      where: { id: payload.companyId },
      include: { widgetSettings: true },
    });

    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const entitlements = getEntitlements(company.subscriptionPlan);

    // Pick specific form or first form
    const rawSettings = formId
      ? company.widgetSettings.find((f) => f.id === formId)
      : company.widgetSettings[0];

    if (!rawSettings) return NextResponse.json({ error: "Form not found" }, { status: 404 });

    const widgetSettings = {
      ...rawSettings,
      backgroundImageUrl: entitlements.isAdvancedCustomizationEnabled ? rawSettings.backgroundImageUrl : null,
      companyNameFont: rawSettings.companyNameFont || "Inter",
      websiteUrl: rawSettings.websiteUrl ?? null,
    };

    return NextResponse.json({
      id: company.id,
      name: company.name,
      subscriptionPlan: company.subscriptionPlan,
      widgetSettings,
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
      where: { id: payload.companyId },
      include: { widgetSettings: true },
    });

    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const entitlements = getEntitlements(company.subscriptionPlan);
    const data = await req.json();
    const formId: string | undefined = data.formId;

    const settingsData = {
      name:          data.name || "Default Form",
      showWeight:    Boolean(data.showWeight),
      showExtras:    Boolean(data.showExtras),
      primaryColor:  data.primaryColor   || "#3B82F6",
      buttonText:    data.buttonText     || "Get Instant Quote",
      headerText:    data.headerText     || "Delivery Quote Calculator",
      disclaimerText: (entitlements.isAdvancedCustomizationEnabled && data.disclaimerText)
                        ? data.disclaimerText
                        : "Estimate only. Final price confirmed after booking.",
      backgroundImageUrl: entitlements.isAdvancedCustomizationEnabled ? (data.backgroundImageUrl ?? null) : null,
      companyNameText: data.companyNameText ?? null,
      companyNameFont: data.companyNameFont || "Inter",
      mapLayout:     ["inline", "side"].includes(data.mapLayout) ? data.mapLayout : "inline",
      websiteUrl:    data.websiteUrl ? String(data.websiteUrl).trim() : null,
    };

    if (formId) {
      // Update existing form (verify it belongs to this company)
      const existing = company.widgetSettings.find((f) => f.id === formId);
      if (!existing) return NextResponse.json({ error: "Form not found" }, { status: 404 });

      await prisma.widgetSettings.update({
        where: { id: formId },
        data: settingsData,
      });
    } else {
      // Fallback: update first form or create if none exist
      if (company.widgetSettings.length > 0) {
        await prisma.widgetSettings.update({
          where: { id: company.widgetSettings[0].id },
          data: settingsData,
        });
      } else {
        await prisma.widgetSettings.create({
          data: { companyId: payload.companyId, ...settingsData },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Widget settings update error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
