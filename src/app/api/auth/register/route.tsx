import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { VerifyEmail } from "@/components/emails/VerifyEmail";
import crypto from "crypto";
import React from "react";

export async function POST(req: Request) {
  // 3 registrations per 10 minutes per IP
  if (!rateLimit(`register:${getClientIp(req)}`, 3, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await prisma.company.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");

    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    await prisma.company.create({
      data: {
        email,
        passwordHash,
        name,
        trialEndsAt,
        emailVerified: false,
        emailVerificationToken,
        pricingProfiles: {
          create: {
            baseRatePerMile: 2.5,
            minimumCharge: 35.0,
          },
        },
        widgetSettings: {
          create: {
            primaryColor: "#1E40AF",
            buttonText: "Get Instant Quote",
          },
        },
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
    const verifyUrl = `${appUrl}/api/auth/verify-email?token=${emailVerificationToken}`;

    try {
      await sendEmail({
        to: email,
        subject: "Confirm your Qalt account",
        react: React.createElement(VerifyEmail, { companyName: name, verifyUrl }),
      });
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
    }

    return NextResponse.json({ success: true, requiresVerification: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
