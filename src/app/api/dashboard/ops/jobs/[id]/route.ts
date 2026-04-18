import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const company = await getCurrentCompany();
    const { id } = await params;

    const job = await prisma.job.findUnique({
      where: { 
        id,
        companyId: company.id 
      },
      include: {
        stops: {
          include: {
            stopNote: true,
          },
          orderBy: { order: "asc" }
        },
        readinessChecks: {
          orderBy: { createdAt: "desc" },
          take: 10
        },
        exceptionLogs: {
          orderBy: { timestamp: "desc" },
          take: 10
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("GET Job Detail Error:", error);
    return NextResponse.json({ error: "Failed to fetch job detail" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const company = await getCurrentCompany();
    const { id } = await params;
    const body = await req.json();

    const job = await prisma.job.update({
      where: { 
        id,
        companyId: company.id 
      },
      data: {
        status: body.status,
        scheduledDate: body.scheduledDate ? new Date(body.scheduledDate) : undefined,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("PATCH Job Error:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}
