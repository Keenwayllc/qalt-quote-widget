import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { Resend } from "resend";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return NextResponse.json({ error: "RESEND_API_KEY is not set in environment" }, { status: 500 });
    }

    const resend = new Resend(key);

    const result = await resend.emails.send({
      from: "Qalt <notifications@qalt.site>",
      to: payload.email,
      subject: "Qalt Email Test",
      html: `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc"><div style="background:#1e3a5f;border-radius:12px 12px 0 0;padding:28px 32px;display:flex;align-items:center;gap:14px"><img src="https://qalt.site/images/qalt_face.png" width="44" height="44" style="border-radius:10px" alt=""/><img src="https://qalt.site/images/qalt.png" height="28" alt="Qalt"/></div><div style="padding:28px 32px"><h1 style="font-size:20px;color:#0f172a;margin:0 0 8px">Email Test — Working!</h1><p style="color:#64748b;font-size:14px;margin:0">Your Qalt email notifications are configured correctly. Quote requests will be delivered to this address.</p></div><div style="padding:16px 32px;border-top:1px solid #e2e8f0;text-align:center"><p style="margin:0;font-size:12px;color:#94a3b8">Sent via Qalt · qalt.site</p></div></div>`,
    });

    return NextResponse.json({ success: true, result, sentTo: payload.email });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg, raw: String(error) }, { status: 500 });
  }
}
