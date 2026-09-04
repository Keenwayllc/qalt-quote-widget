import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { normalizeEmail } from "@/lib/auth";
import { ResetPassword } from "@/components/emails/ResetPassword";
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

    // Enumeration protection: always report success.
    if (!company) return NextResponse.json({ success: true });

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await prisma.company.update({
      where: { id: company.id },
      data: { passwordResetToken: token, passwordResetExpires: expires },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
    const resetUrl = `${appUrl}/reset-password?token=${token}`;

    const emailResult = await sendEmail({
      to: email,
      subject: "Reset your Qalt password",
      react: React.createElement(ResetPassword, { companyName: company.name, resetUrl }),
    });
    if (!emailResult.success) {
      console.error("[forgot-password] reset email failed to send for", email);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[forgot-password]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
