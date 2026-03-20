import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ formId: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { formId } = await params;
    const { name } = await req.json();

    const form = await prisma.widgetSettings.findUnique({ where: { id: formId } });
    if (!form || form.companyId !== payload.companyId) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    await prisma.widgetSettings.update({
      where: { id: formId },
      data: { name: name?.trim() || form.name },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Form rename error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ formId: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { formId } = await params;

    const form = await prisma.widgetSettings.findUnique({ where: { id: formId } });
    if (!form || form.companyId !== payload.companyId) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    // Prevent deleting the last form
    const count = await prisma.widgetSettings.count({ where: { companyId: payload.companyId } });
    if (count <= 1) {
      return NextResponse.json({ error: "You must keep at least one form." }, { status: 400 });
    }

    await prisma.widgetSettings.delete({ where: { id: formId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Form delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
