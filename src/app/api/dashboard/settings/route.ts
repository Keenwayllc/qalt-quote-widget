import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({
      where: { id: payload.companyId },
      select: { name: true, email: true },
    });

    if (!company) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(company);
  } catch (error: unknown) {
    console.error("Settings GET error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // If email is changing, make sure it's not taken
    const existing = await prisma.company.findFirst({
      where: { email, NOT: { id: payload.companyId } },
    });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const updated = await prisma.company.update({
      where: { id: payload.companyId },
      data: { name, email },
      select: { name: true, email: true },
    });

    return NextResponse.json({ success: true, company: updated });
  } catch (error: unknown) {
    console.error("Settings PATCH error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
