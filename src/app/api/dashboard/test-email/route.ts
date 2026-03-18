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
      html: `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc"><div style="background:#1e3a5f;border-radius:12px 12px 0 0;padding:48px 32px;text-align:center"><img src="https://qalt.site/images/faceqaltwh.png" height="60" style="display:block;margin:0 auto 16px" alt="Qalt"/><p style="margin:0;color:#93c5fd;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">Your rates. Embedded. Anywhere.</p></div><div style="padding:48px 40px"><h1 style="font-size:28px;color:#0f172a;margin:0 0 16px;font-weight:900;letter-spacing:-0.03em">Email Test — Working!</h1><p style="color:#64748b;font-size:17px;line-height:1.6;margin:0">Your Qalt email notifications are configured correctly. Quote requests from your widget will be delivered here instantly.</p></div><div style="padding:32px;text-align:center;border-top:1px solid #e2e8f0"><p style="margin:0;font-size:13px;color:#94a3b8;font-weight:600">Sent via Qalt Dashboard &nbsp;•&nbsp; <a href="https://qalt.site" style="color:#3b82f6;text-decoration:none">qalt.site</a></p></div></div>`,
    });

    return NextResponse.json({ success: true, result, sentTo: payload.email });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg, raw: String(error) }, { status: 500 });
  }
}
