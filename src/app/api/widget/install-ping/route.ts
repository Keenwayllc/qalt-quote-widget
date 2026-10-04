import { widgetRequestAllowed } from "@/lib/widget-rate-limit";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { externalWidgetHost } from "@/lib/widget-installations";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    if (request.headers.get("origin") !== origin) return new NextResponse(null, { status: 403 });
    if (!widgetRequestAllowed(request, "install-ping", 600)) return new NextResponse(null, { status: 429, headers: { "Retry-After": "60" } });
    const text = await request.text();
    if (text.length > 4096) return new NextResponse(null, { status: 413 });
    const body = JSON.parse(text);
    const companyId = typeof body?.companyId === "string" && body.companyId.length <= 128 ? body.companyId : "";
    const formId = typeof body?.formId === "string" && body.formId.length <= 128 ? body.formId : "";
    const domain = typeof body?.domain === "string" && /^[a-z0-9.-]{1,253}$/i.test(body.domain)
      ? externalWidgetHost(`https://${body.domain}`, origin) : null;
    if (!companyId || !formId || !domain) return new NextResponse(null, { status: 400 });

    const form = await prisma.widgetSettings.findFirst({
      where: { id: formId, companyId },
      select: { id: true },
    });
    if (!form) return new NextResponse(null, { status: 204 });

    await prisma.$executeRaw`
      INSERT INTO "WidgetInstallation" ("id", "companyId", "formId", "domain", "firstSeenAt", "lastSeenAt", "loadCount")
      VALUES (${crypto.randomUUID()}, ${companyId}, ${formId}, ${domain}, NOW(), NOW(), 1)
      ON CONFLICT ("companyId", "formId", "domain")
      DO UPDATE SET "lastSeenAt" = NOW(), "loadCount" = "WidgetInstallation"."loadCount" + 1
    `;

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof SyntaxError) return new NextResponse(null, { status: 400 });
    console.error("Widget installation tracking failed", error);
    return new NextResponse(null, { status: 503 });
  }
}
