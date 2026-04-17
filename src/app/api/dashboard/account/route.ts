import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-02-25.clover" });

async function getCompany() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return null;
  try {
    const payload = await verifyToken(token);
    return prisma.company.findUnique({ where: { id: payload.companyId } });
  } catch {
    return null;
  }
}

// DELETE — close account: cancel Stripe subscription + delete all data
export async function DELETE() {
  try {
    const company = await getCompany();
    if (!company) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Cancel Stripe subscription if active
    if (company.stripeSubscriptionId) {
      try {
        await stripe.subscriptions.cancel(company.stripeSubscriptionId);
      } catch (e) {
        console.error("[account/delete] Stripe cancel error:", e);
      }
    }

    // Delete all company data (cascade via Prisma relations)
    await prisma.quoteRequest.deleteMany({ where: { companyId: company.id } });
    await prisma.widgetSettings.deleteMany({ where: { companyId: company.id } });
    await prisma.pricingProfile.deleteMany({ where: { companyId: company.id } });
    await prisma.webhook.deleteMany({ where: { companyId: company.id } });
    await prisma.shopifyInstall.updateMany({
      where: { companyId: company.id },
      data: { companyId: null, scriptTagId: null },
    });
    await prisma.company.delete({ where: { id: company.id } });

    const res = NextResponse.json({ ok: true });
    res.cookies.set("qalt_token", "", { maxAge: 0, path: "/" });
    return res;
  } catch (err) {
    console.error("[account/delete]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
