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

    // TEMP DIAGNOSTIC: secret-gated (timing-safe) so only a controlled caller
    // can read the extracted provider error message. Removed after root-causing.
    const diagToken = "qalt_diag_7f3a9c2e5b81aa";
    const provided = Buffer.from(req.headers.get("x-diag-secret") || "");
    const expected = Buffer.from(diagToken);
    if (provided.length === expected.length && crypto.timingSafeEqual(provided, expected)) {
      const e = result.error as { name?: string; message?: string; statusCode?: number } | undefined;
      return NextResponse.json({
        success: result.success,
        appUrlPresent: Boolean(appUrl),
        errorName: e?.name ?? null,
        errorStatus: e?.statusCode ?? null,
        errorMessage: e?.message ?? null,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[resend-verification]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
