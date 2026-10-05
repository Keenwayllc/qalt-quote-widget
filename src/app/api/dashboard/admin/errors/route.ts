import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { APP_ERROR_STATUSES } from "@/lib/error-tracking";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
  const token = (await cookies()).get("qalt_token")?.value;
  const payload = token ? await verifyToken(token) : null;
  if (!payload?.companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const me = await prisma.company.findUnique({ where: { id: payload.companyId }, select: { isAdmin: true } });
  if (!me?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, status } = (await req.json().catch(() => ({}))) as { id?: unknown; status?: unknown };
  if (typeof id !== "string" || !APP_ERROR_STATUSES.includes(status as never)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const updated = await prisma.appError.update({ where: { id }, data: { status: status as string }, select: { id: true, status: true } })
    .catch(() => null);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}
