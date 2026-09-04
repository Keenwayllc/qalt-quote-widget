import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { normalizeEmail } from "@/lib/auth";
import { VerifyEmail } from "@/components/emails/VerifyEmail";
import crypto from "crypto";
import React from "react";

export async function POST(req: Request) {
  try {
    const { email: rawEmail } = await req.json();
    if (!rawEmail) return NextResponse.json({ error: "Missing email" }, { status: 400 });

    // Normalize + case-insensitive match so any casing reaches the right account.
    const email = normalizeEmail(rawEmail);
    const company = await prisma.company.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
    });

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

    await sendEmail({
      to: email,
      subject: "Confirm your Qalt account",
      react: React.createElement(VerifyEmail, { companyName: company.name, verifyUrl }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[resend-verification]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
