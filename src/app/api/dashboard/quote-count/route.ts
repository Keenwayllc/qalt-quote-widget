import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const company = await getCurrentCompany();
    const count = await prisma.quoteRequest.count({
      where: { companyId: company.id, deletedAt: null },
    });
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
