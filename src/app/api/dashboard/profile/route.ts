import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { normalizeLogoBackdrop } from "@/lib/logo-plate";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    await prisma.company.update({
      where: { id: payload.companyId },
      data: {
        ...("logoUrl" in data ? { logoUrl: data.logoUrl || null } : {}),
        ...("logoBackdrop" in data ? { logoBackdrop: normalizeLogoBackdrop(data.logoBackdrop) } : {}),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
