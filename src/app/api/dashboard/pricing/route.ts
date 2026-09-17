import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

const safeNum = (val: unknown, fallback: number) => {
  const n = Number(val);
  return isNaN(n) ? fallback : n;
};

type ServiceOption = {
  name: string;
  description: string;
  fee: number;
};

const normalizeServiceOptions = (value: unknown): ServiceOption[] => {
  if (!Array.isArray(value)) return [];

  const seen = new Set<string>();
  const result: ServiceOption[] = [];

  for (const raw of value.slice(0, 30)) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Record<string, unknown>;
    const name = String(item.name ?? "").trim().slice(0, 80);
    if (!name) continue;

    const key = name.toLocaleLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    const description = String(item.description ?? "").trim().slice(0, 180);
    const feeValue = Number(item.fee);
    const fee = Number.isFinite(feeValue)
      ? Math.min(Math.max(feeValue, 0), 100000)
      : 0;

    result.push({ name, description, fee });
  }

  return result;
};

const pricingFields = (data: Record<string, unknown>) => ({
  baseRatePerMile:    safeNum(data.baseRatePerMile,   2.5),
  minimumCharge:      safeNum(data.minimumCharge,     35),
  useMinimumCharge:   Boolean(data.useMinimumCharge),
  minMilesThreshold:  safeNum(data.minMilesThreshold, 0),
  weightFee:          safeNum(data.weightFee,          0),
  itemCountFee:       safeNum(data.itemCountFee,       0),
  stairsFee:          safeNum(data.stairsFee,          0),
  insideDeliveryFee:  safeNum(data.insideDeliveryFee,  0),
  addon3Fee:          safeNum(data.addon3Fee,          0),
  afterHoursFee:      safeNum(data.afterHoursFee,      0),
  largeItemFee:       safeNum(data.largeItemFee,       0),
  businessHoursStart: String(data.businessHoursStart  || "08:00"),
  businessHoursEnd:   String(data.businessHoursEnd    || "18:00"),
  businessDays:       String(data.businessDays        || "1,2,3,4,5"),
  largeItemsEnabled:  Boolean(data.largeItemsEnabled),
  largeItemCategories: (data.largeItemCategories as unknown[]) ?? [],
  serviceOptions: normalizeServiceOptions(data.serviceOptions),
});

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const formId = searchParams.get("formId");

    if (formId) {
      const form = await prisma.widgetSettings.findUnique({ where: { id: formId } });
      if (!form || form.companyId !== payload.companyId) {
        return NextResponse.json({ error: "Form not found" }, { status: 404 });
      }
      const formProfile = await prisma.pricingProfile.findUnique({ where: { widgetSettingsId: formId } });
      return NextResponse.json({ profile: formProfile });
    }

    const profile = await prisma.pricingProfile.findFirst({
      where: { companyId: payload.companyId, widgetSettingsId: null },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Pricing fetch error:", error);
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

    const data = await req.json();
    const formId: string | undefined = data.formId;
    const fields = pricingFields(data);

    if (formId) {
      const form = await prisma.widgetSettings.findUnique({ where: { id: formId } });
      if (!form || form.companyId !== payload.companyId) {
        return NextResponse.json({ error: "Form not found" }, { status: 404 });
      }

      await prisma.pricingProfile.upsert({
        where: { widgetSettingsId: formId },
        update: fields as any,
        create: { companyId: payload.companyId, widgetSettingsId: formId, ...fields } as any,
      });
    } else {
      const existing = await prisma.pricingProfile.findFirst({
        where: { companyId: payload.companyId, widgetSettingsId: null },
      });

      if (existing) {
        await prisma.pricingProfile.update({ where: { id: existing.id }, data: fields as any });
      } else {
        await prisma.pricingProfile.create({
          data: { companyId: payload.companyId, ...fields } as any,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pricing update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH — partial update, only touches the fields sent (used by per-section Update buttons)
export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const formId: string | null = data.formId ?? null;
    const patch: Record<string, unknown> = {};

    const NUMERIC_DEFAULTS: Record<string, number> = {
      baseRatePerMile: 2.5,
      minimumCharge: 35,
      minMilesThreshold: 0,
      weightFee: 0,
      itemCountFee: 0,
      stairsFee: 0,
      insideDeliveryFee: 0,
      addon3Fee: 0,
      afterHoursFee: 0,
      largeItemFee: 0,
    };
    for (const [field, fallback] of Object.entries(NUMERIC_DEFAULTS)) {
      if (field in data) patch[field] = safeNum(data[field], fallback);
    }

    if ("useMinimumCharge" in data) patch.useMinimumCharge = Boolean(data.useMinimumCharge);
    if ("businessHoursStart" in data) patch.businessHoursStart = String(data.businessHoursStart || "08:00");
    if ("businessHoursEnd" in data) patch.businessHoursEnd = String(data.businessHoursEnd || "18:00");
    if ("businessDays" in data) patch.businessDays = String(data.businessDays || "1,2,3,4,5");
    if ("largeItemsEnabled" in data) patch.largeItemsEnabled = Boolean(data.largeItemsEnabled);
    if ("largeItemCategories" in data) patch.largeItemCategories = data.largeItemCategories ?? [];
    if ("serviceOptions" in data) patch.serviceOptions = normalizeServiceOptions(data.serviceOptions);

    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    if (formId) {
      const form = await prisma.widgetSettings.findUnique({ where: { id: formId } });
      if (!form || form.companyId !== payload.companyId) {
        return NextResponse.json({ error: "Form not found" }, { status: 404 });
      }

      const dedicated = await prisma.pricingProfile.findUnique({ where: { widgetSettingsId: formId } });
      if (dedicated) {
        await prisma.pricingProfile.update({ where: { id: dedicated.id }, data: patch as any });
      } else {
        await prisma.pricingProfile.create({
          data: {
            companyId: payload.companyId,
            widgetSettingsId: formId,
            baseRatePerMile: 2.5,
            minimumCharge: 35,
            ...patch,
          } as any,
        });
      }

      return NextResponse.json({ success: true });
    }

    const profile = await prisma.pricingProfile.findFirst({
      where: { companyId: payload.companyId, widgetSettingsId: null },
    });

    if (profile) {
      await prisma.pricingProfile.update({ where: { id: profile.id }, data: patch as any });
    } else {
      await prisma.pricingProfile.create({
        data: {
          companyId: payload.companyId,
          baseRatePerMile: 2.5,
          minimumCharge: 35,
          ...patch,
        } as any,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pricing PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
