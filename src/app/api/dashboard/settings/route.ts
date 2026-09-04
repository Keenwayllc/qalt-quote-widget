import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, normalizeEmail } from "@/lib/auth";
import prisma from "@/lib/prisma";

const PROFILE_FIELDS = {
  name: true, email: true, subscriptionPlan: true,
  logoUrl: true, profilePicUrl: true,
  phone: true, website: true, address: true,
  city: true, state: true, zip: true, contactName: true,
  isSuperAdmin: true,
} as const;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({
      where: { id: payload.companyId },
      select: PROFILE_FIELDS,
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

    const body = await req.json();
    const { name, email, subscriptionPlan, logoUrl, profilePicUrl, phone, website, address, city, state, zip, contactName } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Store and match emails case-insensitively: normalize to lowercase.
    const normalizedEmail = normalizeEmail(email);

    const existing = await prisma.company.findFirst({
      where: { email: { equals: normalizedEmail, mode: "insensitive" }, NOT: { id: payload.companyId } },
    });
    if (existing) return NextResponse.json({ error: "Email already in use" }, { status: 400 });

    const currentCompany = await prisma.company.findUnique({ where: { id: payload.companyId } });
    if (!currentCompany) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updateData: Record<string, unknown> = {
      name, email: normalizedEmail,
      phone: phone || null,
      website: website || null,
      address: address || null,
      city: city || null,
      state: state || null,
      zip: zip || null,
      contactName: contactName || null,
      logoUrl: logoUrl || null,
      profilePicUrl: profilePicUrl || null,
    };

    // God Mode / Qalt Data Operations: only super-admins may override their own
    // plan. Authorization is the isSuperAdmin flag on the account, never an email.
    if (subscriptionPlan && currentCompany.isSuperAdmin) {
      updateData.subscriptionPlan = subscriptionPlan;
    }

    const updated = await prisma.company.update({
      where: { id: payload.companyId },
      data: updateData,
      select: PROFILE_FIELDS,
    });

    return NextResponse.json({ success: true, company: updated });
  } catch (error: unknown) {
    console.error("Settings PATCH error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
