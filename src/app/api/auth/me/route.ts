import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return NextResponse.json({ company: null }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ company: null }, { status: 401 });
  return NextResponse.json({ company: { id: payload.companyId, email: payload.email } });
}
