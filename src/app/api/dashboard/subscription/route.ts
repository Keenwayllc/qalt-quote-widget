import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const company = await getCurrentCompany();
    const { plan } = await req.json();

    if (!["STARTER", "PRO", "ENTERPRISE"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan selected." }, { status: 400 });
    }

    const updatedCompany = await prisma.company.update({
      where: { id: company.id },
      data: { subscriptionPlan: plan },
    });

    return NextResponse.json({ 
      success: true, 
      plan: updatedCompany.subscriptionPlan 
    });
  } catch (error) {
    console.error("Subscription update error:", error);
    return NextResponse.json({ error: "Unauthorized or server error." }, { status: 500 });
  }
}
