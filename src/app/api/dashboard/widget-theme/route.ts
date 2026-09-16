import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getWidgetTheme, setWidgetTheme } from "@/lib/widget-theme";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const formId = searchParams.get("formId");
  if (!formId) return NextResponse.json({ error: "formId is required" }, { status: 400 });

  const form = await prisma.widgetSettings.findFirst({
    where: { id: formId, companyId: payload.companyId },
    select: { id: true },
  });

  if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });
  return NextResponse.json({ themeMode: await getWidgetTheme(form.id) });
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const formId = typeof body.formId === "string" ? body.formId : "";
  const themeMode = body.themeMode === "dark" ? "dark" : body.themeMode === "light" ? "light" : null;

  if (!formId || !themeMode) {
    return NextResponse.json({ error: "formId and a valid themeMode are required" }, { status: 400 });
  }

  const form = await prisma.widgetSettings.findFirst({
    where: { id: formId, companyId: payload.companyId },
    select: { id: true },
  });

  if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });

  const saved = await setWidgetTheme(form.id, themeMode);
  return NextResponse.json({ success: true, themeMode: saved });
}
