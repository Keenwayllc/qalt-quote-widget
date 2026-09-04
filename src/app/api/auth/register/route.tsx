import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, normalizeEmail } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { VerifyEmail } from "@/components/emails/VerifyEmail";
import crypto from "crypto";
import React from "react";

// Verify a Cloudflare Turnstile token server-side. Returns true when the
// challenge passes. When no secret is configured (e.g. local dev) we skip
// the check rather than lock everyone out.
async function verifyTurnstile(token: unknown, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[register] Turnstile verification error:", err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { email, password, name, turnstileToken } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Store and match emails case-insensitively: normalize to lowercase.
    const normalizedEmail = normalizeEmail(email);

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return NextResponse.json(
        { error: "Human verification failed. Please complete the check and try again." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.company.findFirst({
      where: { email: { equals: normalizedEmail, mode: "insensitive" } },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");

    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    await prisma.company.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        name,
        subscriptionPlan: "PRO",
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

    const emailResult = await sendEmail({
      to: normalizedEmail,
      subject: "Confirm your Qalt account",
      react: React.createElement(VerifyEmail, { companyName: name, verifyUrl }),
    });
    if (!emailResult.success) {
      console.error("[register] verification email failed to send for", email);
    }

    return NextResponse.json({
      success: true,
      requiresVerification: true,
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
