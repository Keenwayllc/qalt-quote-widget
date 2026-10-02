import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { parseVehicleRequest, VEHICLE_REQUEST_DAILY_LIMIT, vehicleRequestWindowStart } from "@/lib/vehicle-requests";

export const dynamic = "force-dynamic";

const NOTIFY = "support@qalt.site";

async function companyId() {
  const token = (await cookies()).get("qalt_token")?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  return payload?.companyId ?? null;
}

export async function GET() {
  const id = await companyId();
  if (!id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const requests = await prisma.vehicleRequest.findMany({
    where: { companyId: id },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: { id: true, vehicleName: true, status: true, createdAt: true },
  });
  return NextResponse.json({ requests });
}

export async function POST(req: Request) {
  const id = await companyId();
  if (!id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = parseVehicleRequest(await req.json().catch(() => null));
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const since = vehicleRequestWindowStart();
  const recent = await prisma.vehicleRequest.count({ where: { companyId: id, createdAt: { gte: since } } });
  if (recent >= VEHICLE_REQUEST_DAILY_LIMIT) {
    return NextResponse.json({ error: "You've sent a lot of requests today. Please try again tomorrow." }, { status: 429 });
  }

  const company = await prisma.company.findUnique({ where: { id }, select: { name: true, email: true } });
  const request = await prisma.vehicleRequest.create({
    data: { companyId: id, ...parsed },
    select: { id: true, vehicleName: true, status: true, createdAt: true },
  });

  // The request is saved either way; the email is only the heads-up.
  await sendEmail({
    to: NOTIFY,
    replyTo: company?.email,
    subject: `Vehicle request: ${parsed.vehicleName}`,
    react: (
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: 1.5, color: "#0f172a" }}>
        <p><strong>{company?.name ?? "A merchant"}</strong> ({company?.email}) asked for a new vehicle.</p>
        <p><strong>Vehicle:</strong> {parsed.vehicleName}</p>
        <p style={{ whiteSpace: "pre-wrap" }}><strong>Description:</strong><br />{parsed.description}</p>
        {parsed.referenceUrl && <p><strong>Reference:</strong> {parsed.referenceUrl}</p>}
        <p>Review it in the Qalt dashboard under Admin, Vehicle requests. Reply to this email to reach the merchant.</p>
      </div>
    ),
  }).catch((error: unknown) => console.error("[vehicle-requests] notify failed", error));

  return NextResponse.json({ request }, { status: 201 });
}
