import { widgetRequestAllowed } from "@/lib/widget-rate-limit";
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
import { normalizeCustomQuestions, validateCustomAnswers } from "@/lib/form-questions";
import { hasDuplicateConsecutiveLocations, normalizeIntermediateStops, routeLocations } from "@/lib/route-stops";
import { resolveLogoTone } from "@/lib/logo-tone-resolve";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const { companyId } = await params;
    if (!widgetRequestAllowed(req, `quote-submit:${companyId}`, 60)) {
      return NextResponse.json({ error: "Too many requests. Please wait a minute and try again." }, { status: 429, headers: { "Retry-After": "60" } });
    }
    const data = await req.json();
    if (!data || typeof data !== "object" || Array.isArray(data)) return NextResponse.json({ error: "Invalid quote details." }, { status: 400 });
    if (data.formId && data.widgetSettingsId && data.formId !== data.widgetSettingsId) return NextResponse.json({ error: "Form not found" }, { status: 404 });
    if ([data.formId, data.widgetSettingsId].some((id) => id !== undefined && id !== null && (typeof id !== "string" || !id || id.length > 128))) return NextResponse.json({ error: "Form not found" }, { status: 404 });
    const requestedForm = data.formId || data.widgetSettingsId;
    if (requestedForm !== undefined && requestedForm !== null && (typeof requestedForm !== "string" || !requestedForm || requestedForm.length > 128)) return NextResponse.json({ error: "Form not found" }, { status: 404 });
    const selectedForm = await prisma.widgetSettings.findFirst({ where: { companyId, ...(requestedForm ? { id: requestedForm } : {}) }, orderBy: { id: "asc" }, select: { id: true } });
    if (!selectedForm) return NextResponse.json({ error: "Form not found" }, { status: 404 });
    data.formId = selectedForm.id;
    data.widgetSettingsId = selectedForm.id;

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

    const pickupAddress = typeof data.pickupAddress === "string" ? data.pickupAddress.trim() : "";
    const dropoffAddress = typeof data.dropoffAddress === "string" ? data.dropoffAddress.trim() : "";
    const submittedPickupZip = typeof data.pickupZip === "string" ? data.pickupZip.trim() : "";
    const submittedDropoffZip = typeof data.dropoffZip === "string" ? data.dropoffZip.trim() : "";
    const submittedStops = normalizeIntermediateStops(data.intermediateStops);

    if (Array.isArray(data.intermediateStops) && submittedStops.length !== data.intermediateStops.length) {
      return NextResponse.json(
        { error: "Each additional stop must be selected from the address suggestions." },
        { status: 422 }
      );
    }

    const zip5 = (z: string | null | undefined) => (z ?? "").replace(/\D/g, "").slice(0, 5);

    if (!pickupAddress || !dropoffAddress) {
      return NextResponse.json({ error: "Address and ZIP code do not match" }, { status: 422 });
    }

    const [pickupGeo, ...remainingGeocodes] = await Promise.all([
      geocodeAddress(pickupAddress),
      ...submittedStops.map((stop) => geocodeAddress(stop.address)),
      geocodeAddress(dropoffAddress),
    ]);
    const dropoffGeo = remainingGeocodes.at(-1) ?? null;
    const stopGeocodes = remainingGeocodes.slice(0, -1);

    const resolveZip = (
      geo: Awaited<ReturnType<typeof geocodeAddress>>,
      submitted: string
    ): { contradiction: true } | { contradiction: false; zip: string } => {
      const geoZip = zip5(geo?.postalCode);
      const submittedZip = zip5(submitted);
      if (geoZip && submittedZip && geoZip !== submittedZip) {
        return { contradiction: true };
      }
      return { contradiction: false, zip: geoZip || submittedZip };
    };

    const pickupZipResult = resolveZip(pickupGeo, submittedPickupZip);
    const dropoffZipResult = resolveZip(dropoffGeo, submittedDropoffZip);
    const stopZipResults = submittedStops.map((stop, index) => resolveZip(stopGeocodes[index], stop.zip));

    if (pickupZipResult.contradiction || dropoffZipResult.contradiction || stopZipResults.some((result) => result.contradiction)) {
      return NextResponse.json({ error: "Address and ZIP code do not match" }, { status: 422 });
    }

    const verifiedPickupZip = pickupZipResult.zip;
    const verifiedDropoffZip = dropoffZipResult.zip;
    const verifiedStops = submittedStops.map((stop, index) => ({
      address: stopGeocodes[index]?.formattedAddress || stop.address,
      zip: stopZipResults[index].contradiction ? "" : stopZipResults[index].zip,
    }));

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

    const pickupCanonical = pickupGeo?.formattedAddress || pickupAddress;
    const dropoffCanonical = dropoffGeo?.formattedAddress || dropoffAddress;
    if (hasDuplicateConsecutiveLocations(routeLocations(pickupCanonical, verifiedStops, dropoffCanonical))) {
      return NextResponse.json({ error: "Consecutive route locations must be different." }, { status: 422 });
    }
    const vehicleCount = parseInt(data.vehicleCount) || 0;

    const priced = await computeAuthoritativeQuote({
      companyId,
      customAnswers: data.customAnswers,
      formId: data.formId ?? null,
      startLocation: pickupCanonical,
      endLocation: dropoffCanonical,
      intermediateStops: verifiedStops,
      extras,
      vehicleCount,
      vehicleType: typeof data.vehicleType === "string" ? data.vehicleType : null,
      clientDistanceFallback: null,
      serviceType: typeof data.serviceType === "string" ? data.serviceType : null,
    });

    if (!priced.ok) {
      return NextResponse.json({ error: priced.error }, { status: priced.status });
    }

    const authoritativePrice = priced.quote.total;
    const authoritativeDistance = priced.quote.distance;
    const authoritativeServiceType = priced.quote.serviceType;
    const authoritativeVehicleType = priced.quote.vehicleType;

    if (data.formId && data.widgetSettingsId !== data.formId) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    let paymentsEnabled = false;
    let customAnswers: ReturnType<typeof validateCustomAnswers>["answers"] = [];
    if (data.widgetSettingsId) {
      const widgetSettings = await prisma.widgetSettings.findUnique({
        where: { id: data.widgetSettingsId },
        select: { companyId: true, formStyle: true, customQuestions: true, paymentsEnabled: true, geoFencingEnabled: true, serviceZips: true },
      });

      if (!widgetSettings || widgetSettings.companyId !== companyId) {
        return NextResponse.json({ error: "Form not found" }, { status: 404 });
      }

      const questions = widgetSettings.formStyle === "extended"
        ? normalizeCustomQuestions(widgetSettings.customQuestions)
        : [];
      const checked = validateCustomAnswers(questions, data.customAnswers);
      if (checked.error) {
        return NextResponse.json({ error: checked.error }, { status: 422 });
      }
      customAnswers = checked.answers;

      if (entitlements.isPaymentsEnabled) {
        paymentsEnabled = widgetSettings?.paymentsEnabled ?? false;
      }

      if (widgetSettings?.geoFencingEnabled && widgetSettings.serviceZips.length > 0) {
        const allowed = widgetSettings.serviceZips;
        const pickupOk = allowed.includes(verifiedPickupZip);
        const dropoffOk = allowed.includes(verifiedDropoffZip);
        const stopOk = verifiedStops.some((stop) => allowed.includes(stop.zip));
        if (!pickupOk && !dropoffOk && !stopOk) {
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
        pickupAddress: pickupCanonical,
        dropoffAddress: dropoffCanonical,
        intermediateStops: verifiedStops as unknown as Prisma.InputJsonValue,
        distanceMiles: authoritativeDistance,
        estimatedPrice: authoritativePrice,
        pricingBreakdown: priced.quote.breakdown as unknown as Prisma.InputJsonValue,
        serviceType: authoritativeServiceType,
        status: "PENDING",
        packageWeight: extras.packageWeight && extras.packageWeight > 0 ? String(extras.packageWeight) : null,
        itemCount: extras.itemCount && extras.itemCount > 0 ? extras.itemCount : null,
        vehicleCount: vehicleCount > 0 ? vehicleCount : null,
        vehicleType: authoritativeVehicleType,
        awbNumber: data.awbNumber ? String(data.awbNumber).trim() : null,
        selectedExtras: JSON.stringify({
          hasStairs: extras.hasStairs,
          stairsFlights: extras.stairsFlights,
          needsInsideDelivery: extras.needsInsideDelivery,
          needsAddon3: extras.needsAddon3,
          pickupDateTime: extras.pickupDateTime ?? null,
          selectedLargeItems: extras.selectedLargeItems ?? [],
          serviceType: authoritativeServiceType,
          deliveryWindow: priced.quote.deliveryWindow || null,
          vehicleType: authoritativeVehicleType,
          vehicleCount: vehicleCount > 0 ? vehicleCount : null,
          customAnswers,
          formId: data.widgetSettingsId || null,
        }),
        paymentStatus: paymentsEnabled ? "PENDING" : null,
      },
    });

    fireWebhooks(companyId, "quote.created", { quote });

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
            intermediateStops={verifiedStops}
            distanceMiles={authoritativeDistance}
            estimatedPrice={authoritativePrice}
            serviceType={authoritativeServiceType}
            deliveryWindow={priced.quote.deliveryWindow}
            customAnswers={customAnswers}
          />
        ),
      });
    } catch (emailError) {
      console.error("Failed to send quote notification email:", emailError);
    }

    if (data.customerEmail) {
      try {
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
              intermediateStops={verifiedStops}
              distanceMiles={authoritativeDistance}
              estimatedPrice={authoritativePrice}
              serviceType={authoritativeServiceType}
            deliveryWindow={priced.quote.deliveryWindow}
              companyName={company.name}
              logoUrl={company.logoUrl ?? undefined}
              logoTone={await resolveLogoTone(company.logoUrl)}
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
      estimatedPrice: authoritativePrice,
      distanceMiles: authoritativeDistance,
      serviceType: authoritativeServiceType,
      vehicleType: authoritativeVehicleType,
      intermediateStops: verifiedStops,
    });
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
