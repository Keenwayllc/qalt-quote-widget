import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { NewQuoteEmail } from "@/components/emails/NewQuoteEmail";
import { CustomerQuoteEmail } from "@/components/emails/CustomerQuoteEmail";
import { PLANS, SubscriptionPlan } from "@/lib/plans";
import { fireWebhooks } from "@/lib/webhooks";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const { companyId } = await params;
    const data = await req.json();

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: {
        subscriptionPlan: true,
        email: true,
        name: true,
        logoUrl: true,
        widgetSettings: { take: 1, select: { primaryColor: true } },
      },
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

    // Determine if this widget has payments enabled and check geo-fencing
    let paymentsEnabled = false;
    if (data.widgetSettingsId) {
      const widgetSettings = await prisma.widgetSettings.findUnique({
        where: { id: data.widgetSettingsId },
        select: { paymentsEnabled: true, geoFencingEnabled: true, serviceZips: true },
      });

      if (entitlements.isPaymentsEnabled) {
        paymentsEnabled = widgetSettings?.paymentsEnabled ?? false;
      }

      // Server-side geo-fence enforcement
      if (widgetSettings?.geoFencingEnabled && widgetSettings.serviceZips.length > 0) {
        const allowed = widgetSettings.serviceZips;
        const pickupOk = allowed.includes(data.pickupZip?.trim());
        const dropoffOk = allowed.includes(data.dropoffZip?.trim());
        if (!pickupOk && !dropoffOk) {
          return NextResponse.json(
            { error: "This location is outside our current service area." },
            { status: 422 }
          );
        }
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
        vehicleCount: data.vehicleCount ? parseInt(data.vehicleCount) : null,
        awbNumber: data.awbNumber ? String(data.awbNumber).trim() : null,
        selectedExtras: JSON.stringify({
          hasStairs: data.hasStairs,
          needsInsideDelivery: data.needsInsideDelivery,
          pickupDateTime: data.pickupDateTime || null,
          selectedLargeItems: data.selectedLargeItems || [],
        }),
        // If payments are enabled, track payment status from the start
        paymentStatus: paymentsEnabled ? "PENDING" : null,
      },
    });

    // Fire webhooks (non-blocking)
    fireWebhooks(companyId, "quote.created", { quote });

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
    }

    // Send confirmation email to the customer (non-blocking)
    if (data.customerEmail) {
      try {
        const serviceType = (data.selectedLargeItems?.length > 0) ? "Large Item Delivery" : "Standard Delivery";
        await sendEmail({
          to: data.customerEmail,
          subject: `Your Quote from ${company.name}`,
          react: (
            <CustomerQuoteEmail
              customerName={data.customerName}
              pickupZip={data.pickupZip}
              dropoffZip={data.dropoffZip}
              distanceMiles={data.distanceMiles}
              estimatedPrice={data.estimatedPrice}
              serviceType={serviceType}
              companyName={company.name}
              logoUrl={company.logoUrl ?? undefined}
              primaryColor={company.widgetSettings[0]?.primaryColor ?? "#1E40AF"}
            />
          ),
        });
      } catch (emailError) {
        console.error("Failed to send customer confirmation email:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      quoteId: quote.id,
      paymentRequired: paymentsEnabled,
    });
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
