import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { NewQuoteEmail } from "@/components/emails/NewQuoteEmail";
import { PLANS, SubscriptionPlan } from "@/lib/plans";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const { companyId } = await params;
    const data = await req.json();

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { subscriptionPlan: true, email: true }
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found." }, { status: 404 });
    }

    const plan = company.subscriptionPlan as SubscriptionPlan;
    const entitlements = PLANS[plan] || PLANS.STARTER;

    if (entitlements.maxQuotesPerMonth !== "unlimited") {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const quoteCount = await prisma.quoteRequest.count({
        where: {
          companyId,
          createdAt: { gte: startOfMonth }
        }
      });

      if (quoteCount >= entitlements.maxQuotesPerMonth) {
        return NextResponse.json(
          { 
            error: "Monthly quote limit reached for this plan.",
            limit: entitlements.maxQuotesPerMonth,
            current: quoteCount
          },
          { status: 403 }
        );
      }
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        companyId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone || null,
        pickupZip: data.pickupZip,
        dropoffZip: data.dropoffZip,
        distanceMiles: data.distanceMiles,
        estimatedPrice: data.estimatedPrice,
        serviceType: (data.selectedLargeItems?.length > 0) ? "Large Item Delivery" : "Standard Delivery",
        status: "PENDING",
        packageWeight: data.packageWeight ? String(data.packageWeight) : null,
        selectedExtras: JSON.stringify({
          hasStairs: data.hasStairs,
          needsInsideDelivery: data.needsInsideDelivery,
          pickupDateTime: data.pickupDateTime || null,
          selectedLargeItems: data.selectedLargeItems || [],
        })
      },
    });

    // Send email notification to the company owner (non-blocking)
    try {
      await sendEmail({
        to: company.email,
        subject: `New Quote Request from ${data.customerName}`,
        react: (
          <NewQuoteEmail
            customerName={data.customerName}
            customerEmail={data.customerEmail}
            customerPhone={data.customerPhone}
            pickupZip={data.pickupZip}
            dropoffZip={data.dropoffZip}
            distanceMiles={data.distanceMiles}
            estimatedPrice={data.estimatedPrice}
            serviceType={(data.selectedLargeItems?.length > 0) ? "Large Item Delivery" : "Standard Delivery"}
          />
        ),
      });
    } catch (emailError) {
      console.error("Failed to send quote notification email:", emailError);
      // Don't block the response — quote is already saved
    }

    return NextResponse.json({ success: true, quoteId: quote.id });
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
