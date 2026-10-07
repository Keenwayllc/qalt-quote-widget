import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { getEntitlements } from "@/lib/plans";
import { parseAdvancedAppearance, readStoredAppearance } from "@/lib/advanced-appearance";

/**
 * Advanced appearance for one form.
 *   GET    ?formId=  saved tokens + whether they currently render
 *   PUT    { formId, appearance }  validate and save (Enterprise only)
 *   DELETE { formId }  reset to the basic theme (always allowed: removing
 *          styling never needs an upgrade)
 * Basic branding (brand color, logo, Light/Dark form) lives in its own columns
 * and is never touched here.
 */

const FORM_ID = /^[a-zA-Z0-9_-]{1,128}$/;

async function context(formId: unknown) {
  const token = (await cookies()).get("qalt_token")?.value;
  if (!token) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  const payload = await verifyToken(token);
  if (!payload?.companyId) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  if (typeof formId !== "string" || !FORM_ID.test(formId)) {
    return { error: NextResponse.json({ error: "Invalid form ID" }, { status: 400 }) };
  }
  const form = await prisma.widgetSettings.findFirst({
    where: { id: formId, companyId: payload.companyId },
    select: { id: true, advancedAppearance: true, company: { select: { subscriptionPlan: true } } },
  });
  if (!form) return { error: NextResponse.json({ error: "Form not found" }, { status: 404 }) };
  return { form, entitled: getEntitlements(form.company.subscriptionPlan).isAdvancedAppearanceEnabled };
}

export async function GET(req: Request) {
  const ctx = await context(new URL(req.url).searchParams.get("formId"));
  if ("error" in ctx) return ctx.error;
  const appearance = readStoredAppearance(ctx.form.advancedAppearance);
  return NextResponse.json({ appearance, entitled: ctx.entitled, active: ctx.entitled && appearance !== null });
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  const ctx = await context(body?.formId);
  if ("error" in ctx) return ctx.error;
  if (!ctx.entitled) {
    return NextResponse.json({ error: "Advanced appearance is an Enterprise feature.", upgrade: true }, { status: 403 });
  }
  const parsed = parseAdvancedAppearance(body?.appearance);
  if (!parsed.ok) return NextResponse.json({ error: parsed.errors[0], errors: parsed.errors }, { status: 400 });

  await prisma.widgetSettings.update({
    where: { id: ctx.form.id },
    data: { advancedAppearance: parsed.value as unknown as Prisma.InputJsonValue },
  });
  return NextResponse.json({ success: true, appearance: parsed.value, warnings: parsed.issues.map((issue) => issue.message) });
}

export async function DELETE(req: Request) {
  const body = await req.json().catch(() => null);
  const ctx = await context(body?.formId);
  if ("error" in ctx) return ctx.error;
  await prisma.widgetSettings.update({
    where: { id: ctx.form.id },
    data: { advancedAppearance: Prisma.DbNull },
  });
  return NextResponse.json({ success: true, appearance: null });
}
