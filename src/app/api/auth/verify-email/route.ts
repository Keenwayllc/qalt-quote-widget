import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid-token", req.url));
  }

  const company = await prisma.company.findUnique({
    where: { emailVerificationToken: token },
  });

  if (!company) {
    return NextResponse.redirect(new URL("/login?error=invalid-token", req.url));
  }

  await prisma.company.update({
    where: { id: company.id },
    data: { emailVerified: true, emailVerificationToken: null },
  });

  const authToken = await signToken({ companyId: company.id, email: company.email });

  const res = NextResponse.redirect(new URL("/dashboard?welcome=1", req.url));
  res.cookies.set({
    name: "qalt_token",
    value: authToken,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
