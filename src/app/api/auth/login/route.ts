import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { verifyPassword, signToken } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import React from "react";

// Email all admins the first time a company ever logs in. Never throws.
async function notifyAdminsOfFirstLogin(company: { name: string; email: string }) {
  const admins = await prisma.company.findMany({
    where: { isAdmin: true },
    select: { email: true },
  });
  const to = admins.map((a) => a.email);
  if (to.length === 0) return;
  await sendEmail({
    to,
    subject: `🎉 ${company.name} just logged in to Qalt for the first time`,
    react: React.createElement(
      "div",
      { style: { fontFamily: "system-ui, sans-serif", fontSize: "15px", color: "#0f172a", lineHeight: "1.6" } },
      React.createElement("h2", { style: { margin: "0 0 8px" } }, "New activity on Qalt"),
      React.createElement("p", { style: { margin: "0 0 8px" } }, `${company.name} (${company.email}) just logged in for the first time.`),
      React.createElement("p", { style: { margin: 0 } }, "Open the admin panel to see their activity.")
    ),
  });
}

export async function POST(req: Request) {
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

    // Track login time; alert admins on a company's first-ever login.
    // Wrapped so a failure here never blocks a valid login.
    const isFirstLogin = !company.lastLoginAt;
    try {
      await prisma.company.update({
        where: { id: company.id },
        data: { lastLoginAt: new Date() },
      });
      if (isFirstLogin && !company.isAdmin) {
        await notifyAdminsOfFirstLogin(company);
      }
    } catch (trackErr) {
      console.error("[login] post-login tracking failed:", trackErr);
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
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
