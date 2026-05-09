import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { getEntitlements } from "@/lib/plans";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY env var is not set");
  return new Resend(key);
}

const DOMAIN_REGEX = /^(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const company = await prisma.company.findUnique({
    where: { id: payload.companyId },
    select: {
      subscriptionPlan: true,
      name: true,
      customEmailDomain: true,
      customEmailFromName: true,
      resendDomainId: true,
      emailDomainVerified: true,
      emailDomainDnsRecords: true,
    },
  });
  if (!company) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const entitlements = getEntitlements(company.subscriptionPlan);
  return NextResponse.json({
    enabled: entitlements.isWhiteLabelEnabled,
    domain: company.customEmailDomain,
    fromName: company.customEmailFromName,
    verified: company.emailDomainVerified,
    dnsRecords: company.emailDomainDnsRecords,
    hasResendDomain: Boolean(company.resendDomainId),
  });
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const company = await prisma.company.findUnique({
    where: { id: payload.companyId },
    select: { subscriptionPlan: true, name: true, resendDomainId: true },
  });
  if (!company) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const entitlements = getEntitlements(company.subscriptionPlan);
  if (!entitlements.isWhiteLabelEnabled) {
    return NextResponse.json(
      { error: "Custom email domain is available on Pro and Enterprise plans." },
      { status: 403 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const rawDomain = typeof body.domain === "string" ? body.domain.trim().toLowerCase() : "";
  const fromName = typeof body.fromName === "string" ? body.fromName.trim().slice(0, 60) : "";

  if (!rawDomain || !DOMAIN_REGEX.test(rawDomain)) {
    return NextResponse.json({ error: "Invalid domain format." }, { status: 400 });
  }

  if (company.resendDomainId) {
    try {
      await getResend().domains.remove(company.resendDomainId);
    } catch {
      // ignore — domain may already be gone on Resend's side
    }
  }

  let resendDomainId: string;
  let dnsRecords: unknown;
  try {
    const resend = getResend();
    const created = await resend.domains.create({ name: rawDomain });
    if (created.error || !created.data) {
      return NextResponse.json(
        { error: created.error?.message || "Resend rejected this domain." },
        { status: 400 }
      );
    }
    resendDomainId = created.data.id;
    dnsRecords = created.data.records ?? [];
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to register domain." },
      { status: 500 }
    );
  }

  await prisma.company.update({
    where: { id: payload.companyId },
    data: {
      customEmailDomain: rawDomain,
      customEmailFromName: fromName || company.name,
      resendDomainId,
      emailDomainVerified: false,
      emailDomainDnsRecords: dnsRecords as Parameters<
        typeof prisma.company.update
      >[0]["data"]["emailDomainDnsRecords"],
    },
  });

  return NextResponse.json({
    success: true,
    domain: rawDomain,
    dnsRecords,
    verified: false,
  });
}

export async function DELETE() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const company = await prisma.company.findUnique({
    where: { id: payload.companyId },
    select: { resendDomainId: true },
  });
  if (!company) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (company.resendDomainId) {
    try {
      await getResend().domains.remove(company.resendDomainId);
    } catch {
      // ignore
    }
  }

  await prisma.company.update({
    where: { id: payload.companyId },
    data: {
      customEmailDomain: null,
      customEmailFromName: null,
      resendDomainId: null,
      emailDomainVerified: false,
      emailDomainDnsRecords: undefined,
    },
  });

  return NextResponse.json({ success: true });
}
