import crypto from "crypto";
import prisma from "@/lib/prisma";
import { deliverWebhook } from "@/lib/webhook-security";

export type WebhookEvent = "quote.created" | "quote.status_changed";

export async function fireWebhooks(
  companyId: string,
  event: WebhookEvent,
  data: Record<string, unknown>
) {
  let hooks: { id: string; url: string; secret: string }[] = [];

  try {
    hooks = await prisma.webhook.findMany({
      where: { companyId, enabled: true, events: { has: event } },
      select: { id: true, url: true, secret: true },
    });
  } catch (err) {
    console.error("Failed to query webhooks:", err);
    return;
  }

  if (hooks.length === 0) return;

  const payload = JSON.stringify({
    event,
    timestamp: new Date().toISOString(),
    data,
  });

  for (const hook of hooks) {
    const sig = crypto
      .createHmac("sha256", hook.secret)
      .update(payload)
      .digest("hex");

    // fire-and-forget — never block the caller. deliverWebhook revalidates the
    // destination against current DNS (rebinding guard), refuses redirects, and
    // times out. It never throws, so this cannot break quote business logic.
    deliverWebhook(
      hook.url,
      {
        headers: {
          "X-Qalt-Event": event,
          "X-Qalt-Signature": `sha256=${sig}`,
        },
        body: payload,
      },
      { timeoutMs: 8000, webhookId: hook.id }
    ).then((r) => {
      if (!r.delivered) console.error(`Webhook delivery failed [${hook.id}]: ${r.error}`);
    });
  }
}
