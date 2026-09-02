import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { VerifyEmail } from "@/components/emails/VerifyEmail";
import crypto from "crypto";
import React from "react";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });

    const company = await prisma.company.findUnique({ where: { email } });

    // Always return success to prevent email enumeration
    if (!company || company.emailVerified) {
      return NextResponse.json({ success: true });
    }

    const token = crypto.randomBytes(32).toString("hex");
    await prisma.company.update({
      where: { id: company.id },
      data: { emailVerificationToken: token },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
    const verifyUrl = `${appUrl}/api/auth/verify-email?token=${token}`;

    const result = await sendEmail({
      to: email,
      subject: "Confirm your Qalt account",
      react: React.createElement(VerifyEmail, { companyName: company.name, verifyUrl }),
    });

    // TEMP DIAGNOSTIC: surface the exact provider error to a controlled caller.
    // Remove after root-causing the verification email failure.
    if (new URL(req.url).searchParams.get("diag") === "1") {
      return NextResponse.json({
        success: result.success,
        appUrlPresent: Boolean(appUrl),
        sendError: result.success ? null : (result.error ?? "unknown"),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[resend-verification]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
