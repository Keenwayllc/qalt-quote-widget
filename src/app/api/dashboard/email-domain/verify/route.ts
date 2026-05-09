import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY env var is not set");
  return new Resend(key);
}

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const company = await prisma.company.findUnique({
    where: { id: payload.companyId },
    select: { resendDomainId: true },
  });
  if (!company?.resendDomainId) {
    return NextResponse.json(
      { error: "No domain on file. Add a domain first." },
      { status: 400 }
    );
  }

  let verifiedStatus = "pending";
  let dnsRecords: unknown = undefined;

  try {
    const resend = getResend();
    await resend.domains.verify(company.resendDomainId);
    const fresh = await resend.domains.get(company.resendDomainId);
    if (fresh.error || !fresh.data) {
      return NextResponse.json(
        { error: fresh.error?.message || "Could not read domain status." },
        { status: 500 }
      );
    }
    verifiedStatus = fresh.data.status;
    dnsRecords = fresh.data.records ?? undefined;
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Verification request failed." },
      { status: 500 }
    );
  }

  const isVerified = verifiedStatus === "verified";

  await prisma.company.update({
    where: { id: payload.companyId },
    data: {
      emailDomainVerified: isVerified,
      ...(dnsRecords !== undefined
        ? {
            emailDomainDnsRecords: dnsRecords as Parameters<
              typeof prisma.company.update
            >[0]["data"]["emailDomainDnsRecords"],
          }
        : {}),
    },
  });

  return NextResponse.json({
    success: true,
    verified: isVerified,
    status: verifiedStatus,
    dnsRecords,
  });
}
