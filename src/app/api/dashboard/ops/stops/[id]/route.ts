import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const company = await getCurrentCompany();
    const { id } = await params;
    const body = await req.json();

    const existing = await prisma.stopNote.findFirst({
      where: { id, companyId: company.id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const stop = await prisma.stopNote.update({
      where: { id },
      data: {
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
    console.error("PATCH Stop Error:", error);
    return NextResponse.json({ error: "Failed to update stop" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const company = await getCurrentCompany();
    const { id } = await params;

    const result = await prisma.stopNote.deleteMany({
      where: { id, companyId: company.id },
    });
    if (result.count === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Stop Error:", error);
    return NextResponse.json({ error: "Failed to delete stop" }, { status: 500 });
  }
}
