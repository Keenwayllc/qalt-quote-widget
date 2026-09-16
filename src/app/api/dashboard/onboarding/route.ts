import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function getCompanyId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return null;
  try {
    const payload = await verifyToken(token);
    return payload?.companyId ?? null;
  } catch {
    return null;
  }
}

function cleanText(value: unknown, max = 160) {
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim().slice(0, max);
  return cleaned || null;
}

function cleanNumber(value: unknown, min: number, max: number) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return undefined;
  return Math.min(max, Math.max(min, parsed));
}

function cleanZipList(value: unknown) {
  if (!Array.isArray(value)) return undefined;
  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter((item) => /^\d{5}(-\d{4})?$/.test(item))
    )
  ).slice(0, 250);
}

export async function GET() {
  const companyId = await getCompanyId();
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      pricingProfiles: { orderBy: { id: "asc" } },
      widgetSettings: { orderBy: { id: "asc" } },
    },
  });

  if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

  const pricing = company.pricingProfiles.find((profile) => profile.widgetSettingsId === null) ?? company.pricingProfiles[0] ?? null;
  const widget = company.widgetSettings[0] ?? null;

  return NextResponse.json({
    company: {
      name: company.name,
      email: company.email,
      phone: company.phone,
      website: company.website,
      city: company.city,
      state: company.state,
      zip: company.zip,
      timezone: company.timezone,
      businessType: company.businessType,
      onboardingStep: company.onboardingStep,
      onboardingCompletedAt: company.onboardingCompletedAt,
      stripeConnectAccountId: company.stripeConnectAccountId,
      subscriptionPlan: company.subscriptionPlan,
    },
    pricing: pricing
      ? {
          baseRatePerMile: pricing.baseRatePerMile,
          minimumCharge: pricing.minimumCharge,
          useMinimumCharge: pricing.useMinimumCharge,
        }
      : null,
    widget: widget
      ? {
          id: widget.id,
          primaryColor: widget.primaryColor,
          buttonText: widget.buttonText,
          headerText: widget.headerText,
          companyNameText: widget.companyNameText,
          geoFencingEnabled: widget.geoFencingEnabled,
          serviceZips: widget.serviceZips,
          paymentsEnabled: widget.paymentsEnabled,
        }
      : null,
  });
}

export async function PATCH(req: Request) {
  const companyId = await getCompanyId();
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const requestedStep = cleanNumber(body.step, 1, 6);
  const complete = body.complete === true;

  const companyData: Record<string, unknown> = {};
  const name = cleanText(body.company?.name, 120);
  const phone = cleanText(body.company?.phone, 40);
  const website = cleanText(body.company?.website, 240);
  const city = cleanText(body.company?.city, 100);
  const state = cleanText(body.company?.state, 80);
  const zip = cleanText(body.company?.zip, 20);
  const timezone = cleanText(body.company?.timezone, 80);
  const businessType = cleanText(body.company?.businessType, 80);

  if (name !== undefined && name !== null) companyData.name = name;
  if (phone !== undefined) companyData.phone = phone;
  if (website !== undefined) companyData.website = website;
  if (city !== undefined) companyData.city = city;
  if (state !== undefined) companyData.state = state;
  if (zip !== undefined) companyData.zip = zip;
  if (timezone !== undefined && timezone !== null) companyData.timezone = timezone;
  if (businessType !== undefined) companyData.businessType = businessType;
  if (requestedStep !== undefined) companyData.onboardingStep = Math.round(requestedStep);
  if (complete) {
    companyData.onboardingStep = 6;
    companyData.onboardingCompletedAt = new Date();
  }

  const pricingData: Record<string, unknown> = {};
  const baseRatePerMile = cleanNumber(body.pricing?.baseRatePerMile, 0, 1000);
  const minimumCharge = cleanNumber(body.pricing?.minimumCharge, 0, 100000);
  if (baseRatePerMile !== undefined) pricingData.baseRatePerMile = baseRatePerMile;
  if (minimumCharge !== undefined) pricingData.minimumCharge = minimumCharge;
  if (typeof body.pricing?.useMinimumCharge === "boolean") pricingData.useMinimumCharge = body.pricing.useMinimumCharge;

  const widgetData: Record<string, unknown> = {};
  const primaryColor = cleanText(body.widget?.primaryColor, 7);
  const buttonText = cleanText(body.widget?.buttonText, 80);
  const headerText = cleanText(body.widget?.headerText, 120);
  const companyNameText = cleanText(body.widget?.companyNameText, 120);
  const serviceZips = cleanZipList(body.widget?.serviceZips);

  if (primaryColor && /^#[0-9A-Fa-f]{6}$/.test(primaryColor)) widgetData.primaryColor = primaryColor;
  if (buttonText !== undefined && buttonText !== null) widgetData.buttonText = buttonText;
  if (headerText !== undefined && headerText !== null) widgetData.headerText = headerText;
  if (companyNameText !== undefined) widgetData.companyNameText = companyNameText;
  if (serviceZips !== undefined) {
    widgetData.serviceZips = serviceZips;
    widgetData.geoFencingEnabled = serviceZips.length > 0;
  }

  const result = await prisma.$transaction(async (tx) => {
    const company = await tx.company.update({ where: { id: companyId }, data: companyData });

    let pricing = await tx.pricingProfile.findFirst({
      where: { companyId, widgetSettingsId: null },
      orderBy: { id: "asc" },
    });
    if (!pricing) pricing = await tx.pricingProfile.findFirst({ where: { companyId }, orderBy: { id: "asc" } });
    if (pricing && Object.keys(pricingData).length > 0) {
      pricing = await tx.pricingProfile.update({ where: { id: pricing.id }, data: pricingData });
    }

    let widget = await tx.widgetSettings.findFirst({ where: { companyId }, orderBy: { id: "asc" } });
    if (widget && Object.keys(widgetData).length > 0) {
      widget = await tx.widgetSettings.update({ where: { id: widget.id }, data: widgetData });
    }

    return { company, pricing, widget };
  });

  return NextResponse.json({
    success: true,
    onboardingStep: result.company.onboardingStep,
    onboardingCompletedAt: result.company.onboardingCompletedAt,
  });
}
