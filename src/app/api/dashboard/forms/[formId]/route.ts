import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getEntitlements } from "@/lib/plans";
import { normalizeCustomQuestions, validateCustomQuestionDefinitions } from "@/lib/form-questions";
import { normalizeVehicles, validateVehicleDefinitions } from "@/lib/form-vehicles";
import type { Prisma } from "@/generated/prisma/client";

export async function PATCH(req: Request, { params }: { params: Promise<{ formId: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { formId } = await params;
    const data = await req.json();
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid form details." }, { status: 400 });
    }

    const form = await prisma.widgetSettings.findUnique({ where: { id: formId } });
    if (!form || form.companyId !== payload.companyId) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    const patch: Prisma.WidgetSettingsUpdateInput = {};
    if ("name" in data) {
      if (typeof data.name !== "string" || !data.name.trim()) {
        return NextResponse.json({ error: "Enter a form name." }, { status: 400 });
      }
      patch.name = data.name.trim().slice(0, 80);
    }

    if ("fields" in data) {
      if (form.formStyle === "quick" || !data.fields || typeof data.fields !== "object" || Array.isArray(data.fields)) {
        return NextResponse.json({ error: "Invalid form fields." }, { status: 400 });
      }
      const fields = data.fields as Record<string, unknown>;
      const company = await prisma.company.findUnique({ where: { id: payload.companyId }, select: { subscriptionPlan: true } });
      const canUseAwb = getEntitlements(company?.subscriptionPlan).isVehicleQuotingEnabled;
      patch.showWeight = Boolean(fields.showWeight);
      patch.showItemCount = Boolean(fields.showItemCount);
      patch.showExtras = Boolean(fields.showExtras);
      patch.showAwb = canUseAwb && Boolean(fields.showAwb);
    }

    if ("customQuestions" in data) {
      if (form.formStyle !== "extended") {
        return NextResponse.json({ error: "Custom questions require an Extended form." }, { status: 400 });
      }
      const questionError = validateCustomQuestionDefinitions(data.customQuestions);
      if (questionError) return NextResponse.json({ error: questionError }, { status: 400 });
      patch.customQuestions = normalizeCustomQuestions(data.customQuestions);
    }

    if ("vehicleOptions" in data) {
      if (form.formStyle !== "quick") {
        return NextResponse.json({ error: "Vehicle choices require a Vehicle Options form." }, { status: 400 });
      }
      const vehicleError = validateVehicleDefinitions(data.vehicleOptions);
      if (vehicleError) return NextResponse.json({ error: vehicleError }, { status: 400 });
      const vehicles = normalizeVehicles(data.vehicleOptions);
      patch.vehicleOptions = vehicles;
    }

    const updated = await prisma.widgetSettings.update({
      where: { id: formId },
      data: patch,
    });

    return NextResponse.json({ success: true, form: updated });
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
