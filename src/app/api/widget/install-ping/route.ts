import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

function cleanDomain(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const domain = value.trim().toLowerCase().replace(/^www\./, "");
  if (!domain || domain.length > 253 || !/^[a-z0-9.-]+$/.test(domain)) return null;
  return domain;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const companyId = typeof body.companyId === "string" ? body.companyId : "";
    const formId = typeof body.formId === "string" ? body.formId : "";
    const domain = cleanDomain(body.domain);
    if (!companyId || !formId || !domain) return new NextResponse(null, { status: 204 });

    const form = await prisma.widgetSettings.findFirst({
      where: { id: formId, companyId },
      select: { id: true },
    });
    if (!form) return new NextResponse(null, { status: 204 });

    await prisma.$executeRaw`
      INSERT INTO "WidgetInstallation" ("id", "companyId", "formId", "domain", "firstSeenAt", "lastSeenAt", "loadCount")
      VALUES (gen_random_uuid()::text, ${companyId}, ${formId}, ${domain}, NOW(), NOW(), 1)
      ON CONFLICT ("companyId", "formId", "domain")
      DO UPDATE SET "lastSeenAt" = NOW(), "loadCount" = "WidgetInstallation"."loadCount" + 1
    `;

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
