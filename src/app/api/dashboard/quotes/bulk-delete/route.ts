import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";

// Soft-delete (archive) many quotes at once. The companyId filter is the
// ownership guard: only the caller's own quotes are ever touched.
export async function POST(request: Request) {
  try {
    const company = await getCurrentCompany();
    const body = await request.json();
    const ids = body?.ids;

    if (!Array.isArray(ids) || ids.length === 0 || !ids.every((id) => typeof id === "string")) {
      return NextResponse.json({ error: "No quote ids provided" }, { status: 400 });
    }

    const result = await prisma.quoteRequest.updateMany({
      where: { id: { in: ids }, companyId: company.id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ success: true, count: result.count });
  } catch (error: unknown) {
    console.error("Error bulk-deleting quotes:", error);
    return NextResponse.json({ error: "Failed to delete quotes" }, { status: 500 });
  }
}
