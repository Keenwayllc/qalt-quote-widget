import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

const pricingFields = (data: Record<string, unknown>) => ({
  baseRatePerMile:    Number(data.baseRatePerMile)    || 2.5,
  minimumCharge:      Number(data.minimumCharge)      || 35,
  useMinimumCharge:   Boolean(data.useMinimumCharge),
  minMilesThreshold:  Number(data.minMilesThreshold)  || 0,
  weightFee:          Number(data.weightFee)           || 0,
  itemCountFee:       Number(data.itemCountFee)        || 0,
  stairsFee:          Number(data.stairsFee)           || 0,
  insideDeliveryFee:  Number(data.insideDeliveryFee)   || 0,
  afterHoursFee:      Number(data.afterHoursFee)       || 0,
  largeItemFee:       Number(data.largeItemFee)        || 0,
  businessHoursStart: String(data.businessHoursStart  || "08:00"),
  businessHoursEnd:   String(data.businessHoursEnd    || "18:00"),
  businessDays:       String(data.businessDays        || "1,2,3,4,5"),
  largeItemsEnabled:  Boolean(data.largeItemsEnabled),
  largeItemCategories: (data.largeItemCategories as unknown[]) ?? [],
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

    let profile = null;

    if (formId) {
      // Form-specific pricing
      profile = await prisma.pricingProfile.findUnique({ where: { widgetSettingsId: formId } });
    }

    if (!profile) {
      // Company default pricing (widgetSettingsId is null)
      profile = await prisma.pricingProfile.findFirst({
        where: { companyId: payload.companyId, widgetSettingsId: null },
      });
    }

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
      // Verify the form belongs to this company
      const form = await prisma.widgetSettings.findUnique({ where: { id: formId } });
      if (!form || form.companyId !== payload.companyId) {
        return NextResponse.json({ error: "Form not found" }, { status: 404 });
      }

      await prisma.pricingProfile.upsert({
        where: { widgetSettingsId: formId },
        update: fields,
        create: { companyId: payload.companyId, widgetSettingsId: formId, ...fields },
      });
    } else {
      // Update company default pricing
      const existing = await prisma.pricingProfile.findFirst({
        where: { companyId: payload.companyId, widgetSettingsId: null },
      });

      if (existing) {
        await prisma.pricingProfile.update({ where: { id: existing.id }, data: fields });
      } else {
        await prisma.pricingProfile.create({
          data: { companyId: payload.companyId, ...fields },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pricing update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
