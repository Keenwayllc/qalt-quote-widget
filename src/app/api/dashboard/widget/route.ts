import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    await prisma.widgetSettings.update({
      where: { companyId: payload.companyId },
      data: {
        showWeight: data.showWeight,
        showExtras: data.showExtras,
        primaryColor: data.primaryColor,
        buttonText: data.buttonText,
        headerText: data.headerText,
        disclaimerText: data.disclaimerText,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Widget settings update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
