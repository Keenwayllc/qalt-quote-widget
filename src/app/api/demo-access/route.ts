import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { PartnerInquiryEmail } from "@/components/emails/PartnerInquiryEmail";
import * as React from "react";

// Gated /demo access request. A visitor fills this to unlock the interactive
// Northline widget (which loads Google Maps once mounted), so this endpoint is
// the choke point that keeps bots and random traffic from generating API usage.
//
// Defenses, in order: honeypot -> Cloudflare Turnstile -> per-IP throttle ->
// per-email dedup. Only a verified human request creates a PartnerInquiry and
// notifies business@qalt.site. Leads reuse the existing PartnerInquiry model
// (no new lead system, no CRM).

// Verify a Cloudflare Turnstile token server-side. Mirrors the registration
// flow. When no secret is configured (local dev) we skip rather than lock out.
async function verifyTurnstile(token: unknown, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[demo-access] Turnstile verification error:", err);
    return false;
  }
}

// Best-effort in-memory per-IP throttle. Serverless instances don't share this,
// so it's a soft backstop; Turnstile + the per-email DB dedup are the durable
// controls. Caps burst abuse from a single IP within one instance.
const IP_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const IP_MAX = 8; // requests per IP per window
const IP_MIN_GAP_MS = 8 * 1000; // minimum spacing between requests
const ipHits = new Map<string, number[]>();

function ipThrottled(ip: string | null): boolean {
  if (!ip) return false;
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < IP_WINDOW_MS);
  if (hits.length && now - hits[hits.length - 1] < IP_MIN_GAP_MS) return true;
  if (hits.length >= IP_MAX) return true;
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

// Per-email cooldown: only one lead + notification per email within this window.
// A returning visitor still gets access (we just skip creating a duplicate).
const EMAIL_COOLDOWN_MS = 10 * 60 * 1000;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyName, contactName, email, website, turnstileToken, honeypot } = body ?? {};

    // 1. Honeypot: a hidden field only a bot would fill. Pretend success so the
    //    bot moves on, but do nothing.
    if (typeof honeypot === "string" && honeypot.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    // 2. Validate required fields.
    if (!companyName || !contactName || !email) {
      return NextResponse.json({ error: "Company, contact name, and email are required." }, { status: 400 });
    }
    if (typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;

    // 3. Per-IP throttle.
    if (ipThrottled(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    // 4. Human verification. This is the primary gate.
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      return NextResponse.json(
        { error: "Human verification failed. Please complete the check and try again." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 5. Per-email dedup. If this email already requested access recently, grant
    //    access again but don't create a duplicate lead or resend the email.
    const since = new Date(Date.now() - EMAIL_COOLDOWN_MS);
    const recent = await prisma.partnerInquiry.findFirst({
      where: { email: cleanEmail, partnershipType: "Demo Access", createdAt: { gte: since } },
      select: { id: true },
    });
    if (recent) {
      return NextResponse.json({ success: true, deduped: true });
    }

    const cleanWebsite = typeof website === "string" && website.trim() ? website.trim() : null;
    const submittedAt = new Date();

    // 6. Save the lead via the existing inquiry model.
    await prisma.partnerInquiry.create({
      data: {
        companyName: String(companyName).trim(),
        website: cleanWebsite,
        contactName: String(contactName).trim(),
        email: cleanEmail,
        partnershipType: "Demo Access",
        message: `Source: Gated Live Demo\nSubmitted: ${submittedAt.toISOString()}\nRequested interactive demo access.`,
      },
    });

    // 7. Notify the team. Reuses PartnerInquiryEmail; a failure here doesn't
    //    block the prospect since the lead is already saved.
    const emailResult = await sendEmail({
      to: "business@qalt.site",
      subject: `New Qalt Demo Access — ${String(companyName).trim()}`,
      react: React.createElement(PartnerInquiryEmail, {
        companyName: String(companyName).trim(),
        website: cleanWebsite || undefined,
        contactName: String(contactName).trim(),
        email: cleanEmail,
        partnershipType: "Demo Access (Gated Live Demo)",
        message: `Source: Gated Live Demo\nSubmitted: ${submittedAt.toISOString()}`,
      }),
    });

    if (!emailResult.success) {
      console.warn("[demo-access] saved but notification email failed:", emailResult.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[demo-access] error:", error);
    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 });
  }
}
