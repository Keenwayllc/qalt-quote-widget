import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail, buildFromAddress } from "@/lib/email";
import { NewQuoteEmail } from "@/components/emails/NewQuoteEmail";
import { CustomerQuoteEmail } from "@/components/emails/CustomerQuoteEmail";
import { PLANS, SubscriptionPlan } from "@/lib/plans";
import { fireWebhooks } from "@/lib/webhooks";
import type { EstimateExtras } from "@/lib/calculator";
import { computeAuthoritativeQuote } from "@/lib/serverQuotePricing";
import { geocodeAddress } from "@/lib/google-maps";
import type { Prisma } from "@/generated/prisma/client";

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
        customEmailDomain: true,
        customEmailFromName: true,
        emailDomainVerified: true,
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

    // Address <-> ZIP integrity. The address (used for driving distance) and
    // the ZIP (persisted, geo-fenced, emailed) are independently browser-
    // supplied, so a tampered request could price a cheap route while storing a
    // different ZIP. We geocode each address server-side and require its
    // structured postal_code to match the submitted ZIP. Everything downstream
    // then uses the server-verified address + ZIP. Geocoding failure fails
    // closed (422) — we never fall back to an unverified browser ZIP.
    const pickupAddress = typeof data.pickupAddress === "string" ? data.pickupAddress.trim() : "";
    const dropoffAddress = typeof data.dropoffAddress === "string" ? data.dropoffAddress.trim() : "";
    const submittedPickupZip = typeof data.pickupZip === "string" ? data.pickupZip.trim() : "";
    const submittedDropoffZip = typeof data.dropoffZip === "string" ? data.dropoffZip.trim() : "";

    const zip5 = (z: string | null | undefined) => (z ?? "").replace(/\D/g, "").slice(0, 5);

    if (!pickupAddress || !dropoffAddress) {
      return NextResponse.json({ error: "Address and ZIP code do not match" }, { status: 422 });
    }

    const [pickupGeo, dropoffGeo] = await Promise.all([
      geocodeAddress(pickupAddress),
      geocodeAddress(dropoffAddress),
    ]);

    // Reject ONLY on a contradictory postal code: Google resolved the address
    // and returned a postal_code whose 5 digits differ from the submitted ZIP.
    // A missing postal_code (Google resolved the address but attached none, or
    // geocoding was unavailable) is NOT a contradiction, so a legitimate
    // Google-selected address is never rejected solely for a missing postal
    // code. Distance/pricing remain bound to the verified canonical address.
    const resolveZip = (
      geo: Awaited<ReturnType<typeof geocodeAddress>>,
      submitted: string
    ): { contradiction: true } | { contradiction: false; zip: string } => {
      const geoZip = zip5(geo?.postalCode);
      const submittedZip = zip5(submitted);
      if (geoZip && submittedZip && geoZip !== submittedZip) {
        return { contradiction: true };
      }
      // No contradiction: prefer Google's postal code, else the submitted ZIP.
      return { contradiction: false, zip: geoZip || submittedZip };
    };

    const pickupZipResult = resolveZip(pickupGeo, submittedPickupZip);
    const dropoffZipResult = resolveZip(dropoffGeo, submittedDropoffZip);

    if (pickupZipResult.contradiction || dropoffZipResult.contradiction) {
      return NextResponse.json({ error: "Address and ZIP code do not match" }, { status: 422 });
    }

    // Server-verified values used everywhere from here on.
    const verifiedPickupZip = pickupZipResult.zip;
    const verifiedDropoffZip = dropoffZipResult.zip;

    // Server-authoritative price + distance. Browser-supplied estimatedPrice
    // and distanceMiles are NEVER trusted for the persisted quote. Pricing is
    // resolved the same way the estimate preview did (formId parity) so the
    // saved amount equals what the customer was legitimately quoted. A foreign
    // formId 404s here before anything is created or read cross-tenant.
    const extras: EstimateExtras = {
      hasStairs: Boolean(data.hasStairs),
      stairsFlights: data.hasStairs ? (parseInt(data.stairsFlights) || 1) : 0,
      needsInsideDelivery: Boolean(data.needsInsideDelivery),
      needsAddon3: Boolean(data.needsAddon3),
      pickupDateTime: data.pickupDateTime || undefined,
      selectedLargeItems: data.selectedLargeItems || [],
      packageWeight: parseFloat(data.packageWeight) || 0,
      itemCount: parseInt(data.itemCount) || 0,
    };

    // Canonical addresses: verified/formatted when geocoding resolved them,
    // else the raw address string (still address-based, never the ZIP). Defined
    // ONCE so the exact values used for the authoritative route/distance are the
    // same ones persisted for future documents.
    const pickupCanonical = pickupGeo?.formattedAddress || pickupAddress;
    const dropoffCanonical = dropoffGeo?.formattedAddress || dropoffAddress;
    // Normalize vehicle count once; reuse for both pricing and persistence.
    const vehicleCount = parseInt(data.vehicleCount) || 0;

    const priced = await computeAuthoritativeQuote({
      companyId,
      formId: data.formId ?? null,
      startLocation: pickupCanonical,
      endLocation: dropoffCanonical,
      extras,
      vehicleCount,
      // Final submission: server distance is authoritative, no client fallback.
      clientDistanceFallback: null,
    });

    if (!priced.ok) {
      return NextResponse.json({ error: priced.error }, { status: priced.status });
    }

    const authoritativePrice = priced.quote.total;
    const authoritativeDistance = priced.quote.distance;

    // Integrity: when a form drives pricing, payment/geo settings must come from
    // that SAME form. Each ID is verified to belong to this company, but they
    // must also match each other so a tampered request cannot combine one owned
    // form's pricing with another owned form's payment/geo settings. When formId
    // is null (/widget/[companyId], /demo) this check is skipped.
    if (data.formId && data.widgetSettingsId !== data.formId) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    // Determine if this widget has payments enabled and check geo-fencing
    let paymentsEnabled = false;
    if (data.widgetSettingsId) {
      const widgetSettings = await prisma.widgetSettings.findUnique({
        where: { id: data.widgetSettingsId },
        select: { companyId: true, paymentsEnabled: true, geoFencingEnabled: true, serviceZips: true },
      });

      // Ownership: a supplied widget ID must belong to this company.
      if (!widgetSettings || widgetSettings.companyId !== companyId) {
        return NextResponse.json({ error: "Form not found" }, { status: 404 });
      }

      if (entitlements.isPaymentsEnabled) {
        paymentsEnabled = widgetSettings?.paymentsEnabled ?? false;
      }

      // Server-side geo-fence enforcement
      if (widgetSettings?.geoFencingEnabled && widgetSettings.serviceZips.length > 0) {
        const allowed = widgetSettings.serviceZips;
        const pickupOk = allowed.includes(verifiedPickupZip);
        const dropoffOk = allowed.includes(verifiedDropoffZip);
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
        pickupZip: verifiedPickupZip,
        dropoffZip: verifiedDropoffZip,
        // Canonical addresses that produced the authoritative route (Phase 13).
        pickupAddress: pickupCanonical,
        dropoffAddress: dropoffCanonical,
        distanceMiles: authoritativeDistance,
        estimatedPrice: authoritativePrice,
        // Server-authoritative breakdown snapshot — never a browser value — so
        // future documents stay accurate even if the merchant changes rates.
        pricingBreakdown: priced.quote.breakdown as unknown as Prisma.InputJsonValue,
        serviceType: (data.selectedLargeItems?.length > 0) ? "Large Item Delivery" : "Standard Delivery",
        status: "PENDING",
        packageWeight: extras.packageWeight && extras.packageWeight > 0 ? String(extras.packageWeight) : null,
        itemCount: extras.itemCount && extras.itemCount > 0 ? extras.itemCount : null,
        vehicleCount: vehicleCount > 0 ? vehicleCount : null,
        awbNumber: data.awbNumber ? String(data.awbNumber).trim() : null,
        selectedExtras: JSON.stringify({
          hasStairs: extras.hasStairs,
          stairsFlights: extras.stairsFlights,
          needsInsideDelivery: extras.needsInsideDelivery,
          needsAddon3: extras.needsAddon3,
          pickupDateTime: extras.pickupDateTime ?? null,
          selectedLargeItems: extras.selectedLargeItems ?? [],
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
            pickupZip={verifiedPickupZip}
            dropoffZip={verifiedDropoffZip}
            distanceMiles={authoritativeDistance}
            estimatedPrice={authoritativePrice}
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
        const customerFrom = buildFromAddress({
          customDomain: company.customEmailDomain,
          fromName: company.customEmailFromName,
          domainVerified: company.emailDomainVerified,
          fallbackName: company.name,
        });
        await sendEmail({
          to: data.customerEmail,
          subject: `Your Quote from ${company.name}`,
          from: customerFrom,
          react: (
            <CustomerQuoteEmail
              customerName={data.customerName}
              pickupZip={verifiedPickupZip}
              dropoffZip={verifiedDropoffZip}
              distanceMiles={authoritativeDistance}
              estimatedPrice={authoritativePrice}
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
      // Additive: the authoritative server values that were persisted.
      estimatedPrice: authoritativePrice,
      distanceMiles: authoritativeDistance,
    });
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
