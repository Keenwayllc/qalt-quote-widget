import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { PartnerInquiryEmail } from "@/components/emails/PartnerInquiryEmail";
import * as React from "react";

// Public /demo "Request a Demo" form. Reuses the existing PartnerInquiry model
// and email infrastructure — no new lead system. Demo-page leads are tagged
// with partnershipType "Demo Request" so they're distinguishable from partner
// inquiries, and the notification goes to business@qalt.site.
export async function POST(req: NextRequest) {
  try {
    const { companyName, contactName, email, website, message } = await req.json();

    if (!companyName || !contactName || !email) {
      return NextResponse.json({ error: "Company, contact name, and email are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const cleanMessage = typeof message === "string" && message.trim() ? message.trim() : "(no message provided)";
    const submittedAt = new Date();

    // 1. Save via the existing inquiry model.
    await prisma.partnerInquiry.create({
      data: {
        companyName,
        website: website || null,
        contactName,
        email,
        partnershipType: "Demo Request",
        message: cleanMessage,
      },
    });

    // 2. Notify the team. Reuses PartnerInquiryEmail; the message carries the
    // source + timestamp so the origin is unambiguous.
    const notifyMessage = `Source: Public Demo Page\nSubmitted: ${submittedAt.toISOString()}\n\n${cleanMessage}`;
    const emailResult = await sendEmail({
      to: "business@qalt.site",
      subject: `New Qalt Demo Request — ${companyName}`,
      react: React.createElement(PartnerInquiryEmail, {
        companyName,
        website: website || undefined,
        contactName,
        email,
        partnershipType: "Demo Request (Public Demo Page)",
        message: notifyMessage,
      }),
    });

    if (!emailResult.success) {
      // The record is saved and can be handled manually; don't fail the prospect.
      console.warn("[demo-request] saved but notification email failed:", emailResult.error);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[demo-request] error:", error);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
