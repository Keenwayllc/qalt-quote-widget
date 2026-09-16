import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ensureIntegrationSchema, writeIntegrationAudit } from "@/lib/integration-auth";

async function getDashboardAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getDashboardAuth();
    if (!auth?.companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    await ensureIntegrationSchema();

    const rows = await prisma.$queryRawUnsafe<Array<{ id: string; provider: string }>>(
      `SELECT "id", "provider" FROM "IntegrationConnection" WHERE "id" = $1 AND "companyId" = $2 LIMIT 1`,
      id,
      auth.companyId
    );
    if (!rows[0]) return NextResponse.json({ error: "Connection not found" }, { status: 404 });

    await prisma.$executeRawUnsafe(
      `UPDATE "IntegrationConnection" SET "revokedAt" = CURRENT_TIMESTAMP WHERE "id" = $1 AND "companyId" = $2`,
      id,
      auth.companyId
    );
    await writeIntegrationAudit({
      companyId: auth.companyId,
      connectionId: id,
      action: "connection.revoked",
      resource: rows[0].provider,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/dashboard/integrations/[id] error:", error);
    return NextResponse.json({ error: "Unable to revoke connection" }, { status: 500 });
  }
}
