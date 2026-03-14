import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await prisma.pricingProfile.update({
      where: { companyId: payload.companyId },
      data: ({
        baseRatePerMile: data.baseRatePerMile,
        minimumCharge: data.minimumCharge,
        useMinimumCharge: data.useMinimumCharge,
        minMilesThreshold: data.minMilesThreshold,
        weightFee: data.weightFee || 0,
        itemCountFee: data.itemCountFee || 0,
        stairsFee: data.stairsFee || 0,
        insideDeliveryFee: data.insideDeliveryFee || 0,
        afterHoursFee: data.afterHoursFee || 0,
        largeItemFee: data.largeItemFee || 0,
        businessHoursStart: data.businessHoursStart || "08:00",
        businessHoursEnd: data.businessHoursEnd || "18:00",
        businessDays: data.businessDays || "1,2,3,4,5",
        largeItemsEnabled: data.largeItemsEnabled ?? false,
        largeItemCategories: data.largeItemCategories ?? [],
      } as unknown) as any,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pricing update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
