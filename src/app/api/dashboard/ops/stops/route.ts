import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const company = await getCurrentCompany();
    const stops = await prisma.stopNote.findMany({
      where: { companyId: company.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(stops);
  } catch (error) {
    console.error("GET Stops Error:", error);
    return NextResponse.json({ error: "Failed to fetch stops" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const company = await getCurrentCompany();
    const body = await req.json();

    const stop = await prisma.stopNote.create({
      data: {
        companyId: company.id,
        companyName: body.companyName,
        address: body.address,
        contactName: body.contactName,
        contactPhone: body.contactPhone,
        gateCode: body.gateCode,
        dockInfo: body.dockInfo,
        hours: body.hours,
        parkingNotes: body.parkingNotes,
        accessNotes: body.accessNotes,
        deliveryNotes: body.deliveryNotes,
      },
    });

    return NextResponse.json(stop);
  } catch (error) {
    console.error("POST Stop Error:", error);
    return NextResponse.json({ error: "Failed to create stop" }, { status: 500 });
  }
}
