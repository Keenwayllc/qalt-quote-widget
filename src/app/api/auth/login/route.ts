import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
import { verifyPassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  // 5 attempts per 15 minutes per IP
  if (!rateLimit(`login:${getClientIp(req)}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 });
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const company = await prisma.company.findUnique({ where: { email } });
    if (!company) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await verifyPassword(password, company.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!company.emailVerified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in. Check your inbox for the confirmation link." },
        { status: 403 }
      );
    }

    // Create session token
    const token = await signToken({ companyId: company.id, email: company.email });

    const response = NextResponse.json({ success: true });
    
    response.cookies.set({
      name: "qalt_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
