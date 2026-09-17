import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getEntitlements } from "@/lib/plans";

const PROJECT_ID = process.env.VERCEL_PROJECT_ID || "prj_nwf5Amew7l9ktOOriOrCPQGVlyVi";
const VERCEL_API = "https://api.vercel.com";

type DomainRow = {
  customWidgetDomain: string | null;
  customWidgetDomainVerified: boolean;
};

type VercelDomain = {
  name?: string;
  verified?: boolean;
  verification?: Array<{ type?: string; domain?: string; value?: string; reason?: string }>;
  error?: { message?: string; code?: string };
};

function normalizeDomain(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const value = input.trim().toLowerCase().replace(/\.$/, "");
  if (!value || value.includes("://") || value.includes("/") || value.includes(":")) return null;
  if (value.length > 253) return null;
  if (!/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(value)) return null;
  if (value === "qalt.site" || value.endsWith(".qalt.site") || value.endsWith(".vercel.app")) return null;
  return value;
}

async function authCompany() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload?.companyId) return null;
  const company = await prisma.company.findUnique({
    where: { id: payload.companyId },
    select: { id: true, subscriptionPlan: true },
  });
  return company;
}

async function getStoredDomain(companyId: string): Promise<DomainRow> {
  const rows = await prisma.$queryRaw<DomainRow[]>`
    SELECT "customWidgetDomain", "customWidgetDomainVerified"
    FROM "Company"
    WHERE "id" = ${companyId}
    LIMIT 1
  `;
  return rows[0] ?? { customWidgetDomain: null, customWidgetDomainVerified: false };
}

async function saveStoredDomain(companyId: string, domain: string | null, verified: boolean) {
  await prisma.$executeRaw`
    UPDATE "Company"
    SET "customWidgetDomain" = ${domain},
        "customWidgetDomainVerified" = ${verified}
    WHERE "id" = ${companyId}
  `;
}

function vercelHeaders() {
  const token = process.env.VERCEL_TOKEN;
  if (!token) return null;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function addVercelDomain(domain: string): Promise<VercelDomain> {
  const headers = vercelHeaders();
  if (!headers) throw new Error("Qalt custom-domain hosting is not configured yet.");
  const res = await fetch(`${VERCEL_API}/v10/projects/${PROJECT_ID}/domains`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name: domain }),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as VercelDomain;
  if (!res.ok) {
    const message = data.error?.message || `Vercel rejected the domain (${res.status}).`;
    throw new Error(message);
  }
  return data;
}

async function verifyVercelDomain(domain: string): Promise<VercelDomain> {
  const headers = vercelHeaders();
  if (!headers) throw new Error("Qalt custom-domain hosting is not configured yet.");
  const res = await fetch(
    `${VERCEL_API}/v9/projects/${PROJECT_ID}/domains/${encodeURIComponent(domain)}/verify`,
    { method: "POST", headers, cache: "no-store" }
  );
  const data = (await res.json().catch(() => ({}))) as VercelDomain;
  if (!res.ok) {
    const message = data.error?.message || `Domain verification failed (${res.status}).`;
    throw new Error(message);
  }
  return data;
}

async function removeVercelDomain(domain: string) {
  const headers = vercelHeaders();
  if (!headers) return;
  await fetch(
    `${VERCEL_API}/v9/projects/${PROJECT_ID}/domains/${encodeURIComponent(domain)}`,
    { method: "DELETE", headers, cache: "no-store" }
  ).catch(() => undefined);
}

export async function GET() {
  const company = await authCompany();
  if (!company) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const eligible = getEntitlements(company.subscriptionPlan).isWhiteLabelEnabled;
  const stored = await getStoredDomain(company.id);
  return NextResponse.json({
    eligible,
    domain: stored.customWidgetDomain,
    verified: stored.customWidgetDomainVerified,
    hostingConfigured: Boolean(process.env.VERCEL_TOKEN),
    dns: stored.customWidgetDomain
      ? {
          type: "CNAME",
          name: stored.customWidgetDomain.split(".")[0],
          value: "cname.vercel-dns.com",
        }
      : null,
  });
}

export async function POST(req: Request) {
  const company = await authCompany();
  if (!company) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!getEntitlements(company.subscriptionPlan).isWhiteLabelEnabled) {
    return NextResponse.json({ error: "Custom widget domains are available on Pro and Enterprise." }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const action = body?.action === "verify" ? "verify" : "connect";
  const stored = await getStoredDomain(company.id);

  try {
    if (action === "verify") {
      if (!stored.customWidgetDomain) {
        return NextResponse.json({ error: "Add a custom domain first." }, { status: 400 });
      }
      const result = await verifyVercelDomain(stored.customWidgetDomain);
      const verified = result.verified === true;
      await saveStoredDomain(company.id, stored.customWidgetDomain, verified);
      return NextResponse.json({
        success: true,
        domain: stored.customWidgetDomain,
        verified,
        verification: result.verification ?? [],
      });
    }

    const domain = normalizeDomain(body?.domain);
    if (!domain) {
      return NextResponse.json(
        { error: "Enter a valid hostname such as quote.yourcompany.com. Do not include https:// or a path." },
        { status: 400 }
      );
    }

    if (stored.customWidgetDomain && stored.customWidgetDomain !== domain) {
      await removeVercelDomain(stored.customWidgetDomain);
    }

    const result = await addVercelDomain(domain);
    const verified = result.verified === true;
    await saveStoredDomain(company.id, domain, verified);

    return NextResponse.json({
      success: true,
      domain,
      verified,
      verification: result.verification ?? [],
      dns: { type: "CNAME", name: domain.split(".")[0], value: "cname.vercel-dns.com" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not configure custom domain.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE() {
  const company = await authCompany();
  if (!company) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const stored = await getStoredDomain(company.id);
  if (stored.customWidgetDomain) await removeVercelDomain(stored.customWidgetDomain);
  await saveStoredDomain(company.id, null, false);
  return NextResponse.json({ success: true });
}
