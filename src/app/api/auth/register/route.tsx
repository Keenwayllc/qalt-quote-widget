import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { WelcomeEmail } from "@/components/emails/WelcomeEmail";

export async function POST(req: Request) {
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

    // Create Company and initialize their default profiles and widget settings
    const company = await prisma.company.create({
      data: {
        email,
        passwordHash,
        name,
        pricingProfile: {
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

    // Create session token
    const token = await signToken({ companyId: company.id, email: company.email });

    // Send welcome email
    try {
      await sendEmail({
        to: company.email,
        subject: "Welcome to Qalt!",
        react: <WelcomeEmail companyName={company.name} />,
      });
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // We don't block registration if welcome email fails
    }

    const response = NextResponse.json({ success: true, companyId: company.id });
    
    response.cookies.set({
      name: "qalt_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
