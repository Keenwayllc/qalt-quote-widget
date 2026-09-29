import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getEntitlements } from "@/lib/plans";
import { normalizeCustomQuestions, validateCustomQuestionDefinitions } from "@/lib/form-questions";
import { normalizeVehicles, validateVehicleDefinitions } from "@/lib/form-vehicles";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({
      where: { id: payload.companyId },
      select: { subscriptionPlan: true },
    });

    const forms = await prisma.widgetSettings.findMany({
      where: { companyId: payload.companyId },
      orderBy: { id: "asc" },
      select: {
        id: true, name: true, formStyle: true, showWeight: true,
        showItemCount: true, showExtras: true, showAwb: true,
        vehicleOptions: true, customQuestions: true,
      },
    });

    const entitlements = getEntitlements(company?.subscriptionPlan);

    return NextResponse.json({
      forms,
      plan: company?.subscriptionPlan || "STARTER",
      maxForms: entitlements.maxForms,
    });
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

    const data = await req.json();
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid form details." }, { status: 400 });
    }
    const { name, formStyle, vehicleOptions, customQuestions, fields } = data;
    const normalizedFormStyle = formStyle === "quick" || formStyle === "extended" ? formStyle : "standard";
    if (normalizedFormStyle === "quick") {
      const vehicleError = validateVehicleDefinitions(vehicleOptions);
      if (vehicleError) return NextResponse.json({ error: vehicleError }, { status: 400 });
    }
    if (normalizedFormStyle === "extended") {
      const questionError = validateCustomQuestionDefinitions(customQuestions ?? []);
      if (questionError) return NextResponse.json({ error: questionError }, { status: 400 });
    }
    const submittedVehicles = normalizeVehicles(vehicleOptions);
    const questions = normalizedFormStyle === "extended" ? normalizeCustomQuestions(customQuestions) : [];
    const selectedFields = fields && typeof fields === "object" && !Array.isArray(fields)
      ? fields as Record<string, unknown>
      : {};

    // Clone pricing from company default
    const defaultPricing = await prisma.pricingProfile.findFirst({
      where: { companyId: payload.companyId, widgetSettingsId: null },
    });

    const form = await prisma.$transaction(async (tx) => {
      const created = await tx.widgetSettings.create({
        data: {
          companyId: payload.companyId,
          name: typeof name === "string" && name.trim() ? name.trim().slice(0, 80) : "New Form",
          formStyle: normalizedFormStyle,
          showWeight: normalizedFormStyle !== "quick" && Boolean(selectedFields.showWeight),
          showItemCount: normalizedFormStyle !== "quick" && selectedFields.showItemCount !== false,
          showExtras: normalizedFormStyle !== "quick" && selectedFields.showExtras !== false,
          showAwb: normalizedFormStyle !== "quick" && entitlements.isVehicleQuotingEnabled && Boolean(selectedFields.showAwb),
          showVehicles: normalizedFormStyle === "quick",
          vehicleOptions: normalizedFormStyle === "quick" ? submittedVehicles : [],
          customQuestions: questions,
          buttonText: "Get Instant Quote",
        },
      });

      if (defaultPricing) {
        const pricingFields = Object.fromEntries(
          Object.entries(defaultPricing).filter(([key]) => !["id", "companyId", "widgetSettingsId"].includes(key))
        );
        await tx.pricingProfile.create({
          data: { companyId: payload.companyId, widgetSettingsId: created.id, ...pricingFields } as Parameters<typeof tx.pricingProfile.create>[0]["data"],
        });
      } else {
        await tx.pricingProfile.create({ data: { companyId: payload.companyId, widgetSettingsId: created.id } });
      }
      return created;
    });

    return NextResponse.json({ form });
  } catch (error) {
    console.error("Form create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
