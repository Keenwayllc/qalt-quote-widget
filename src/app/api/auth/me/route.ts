import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";

export async function GET() {
  try {
    const company = await getCurrentCompany();
    return NextResponse.json({ company: { id: company.id, name: company.name } });
  } catch {
    return NextResponse.json({ company: null }, { status: 401 });
  }
}
