import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Invalid or missing reset token." }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    const company = await prisma.company.findFirst({
      where: { passwordResetToken: token, passwordResetExpires: { gt: new Date() } },
    });
    if (!company) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    await prisma.company.update({
      where: { id: company.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null,
        emailVerified: true,
        emailVerificationToken: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[reset-password]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
