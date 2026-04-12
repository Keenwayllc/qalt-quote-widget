import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function getAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

async function getOwnedWebhook(id: string, companyId: string) {
  const hook = await prisma.webhook.findUnique({ where: { id } });
  if (!hook || hook.companyId !== companyId) return null;
  return hook;
}

// PATCH — toggle enabled or update url/events
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getAuth();
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const hook = await getOwnedWebhook(id, payload.companyId);
    if (!hook) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    const update: Record<string, unknown> = {};

    if ("enabled" in body) update.enabled = Boolean(body.enabled);
    if ("url" in body && typeof body.url === "string") update.url = body.url;
    if ("events" in body && Array.isArray(body.events)) update.events = body.events;

    const updated = await prisma.webhook.update({ where: { id }, data: update });
    return NextResponse.json({ webhook: updated });
  } catch (err) {
    console.error("PATCH /webhooks/[id] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE — remove webhook
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getAuth();
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const hook = await getOwnedWebhook(id, payload.companyId);
    if (!hook) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.webhook.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /webhooks/[id] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
