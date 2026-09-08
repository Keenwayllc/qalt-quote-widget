import dns from "node:dns/promises";
import net from "node:net";

// Centralized SSRF protection for merchant-supplied outbound webhook URLs.
// The SAME validation is used at save time (create/update) and immediately
// before every outbound delivery (test + production), so a hostname that
// resolves publicly at save time but privately later (DNS rebinding) is still
// rejected at delivery time.

// HTTP is permitted ONLY outside production so local development can target a
// plaintext tunnel. In production (NODE_ENV=production, e.g. Vercel) only
// https: destinations are accepted.
const ALLOW_HTTP = process.env.NODE_ENV !== "production";

const DEFAULT_TIMEOUT_MS = 8000;

// ---- IPv4 ----

const UNSAFE_V4_CIDRS = [
  "0.0.0.0/8",
  "10.0.0.0/8",
  "100.64.0.0/10",
  "127.0.0.0/8",
  "169.254.0.0/16", // link-local (includes 169.254.169.254 cloud metadata)
  "172.16.0.0/12",
  "192.0.0.0/24",
  "192.0.2.0/24",
  "192.168.0.0/16",
  "198.18.0.0/15",
  "198.51.100.0/24",
  "203.0.113.0/24",
  "224.0.0.0/4", // multicast
  "240.0.0.0/4", // reserved
];

function v4ToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    const o = Number(p);
    if (o > 255) return null;
    n = ((n << 8) | o) >>> 0;
  }
  return n >>> 0;
}

function inV4Cidr(ipInt: number, cidr: string): boolean {
  const [base, bitsStr] = cidr.split("/");
  const bits = Number(bitsStr);
  const baseInt = v4ToInt(base);
  if (baseInt === null) return false;
  if (bits === 0) return true;
  const mask = bits === 32 ? 0xffffffff : (~((1 << (32 - bits)) - 1)) >>> 0;
  return (ipInt & mask) === (baseInt & mask);
}

function isUnsafeIPv4(ip: string): boolean {
  const n = v4ToInt(ip);
  if (n === null) return true;
  return UNSAFE_V4_CIDRS.some((c) => inV4Cidr(n, c));
}

// ---- IPv6 ----

function ipv6ToBytes(input: string): number[] | null {
  let ip = input.split("%")[0]; // drop zone id
  // Expand a trailing embedded IPv4 (e.g. ::ffff:127.0.0.1) into two hextets.
  if (ip.includes(".")) {
    const idx = ip.lastIndexOf(":");
    if (idx === -1) return null;
    const v4 = v4ToInt(ip.slice(idx + 1));
    if (v4 === null) return null;
    const g1 = ((v4 >>> 16) & 0xffff).toString(16);
    const g2 = (v4 & 0xffff).toString(16);
    ip = ip.slice(0, idx + 1) + g1 + ":" + g2;
  }
  const halves = ip.split("::");
  if (halves.length > 2) return null;
  const toGroups = (s: string): number[] | null => {
    if (s === "") return [];
    const out: number[] = [];
    for (const p of s.split(":")) {
      if (!/^[0-9a-fA-F]{1,4}$/.test(p)) return null;
      out.push(parseInt(p, 16));
    }
    return out;
  };
  const head = toGroups(halves[0]);
  const tail = halves.length === 2 ? toGroups(halves[1]) : [];
  if (head === null || tail === null) return null;
  let groups: number[];
  if (halves.length === 2) {
    const missing = 8 - head.length - tail.length;
    if (missing < 0) return null;
    groups = [...head, ...Array(missing).fill(0), ...tail];
  } else {
    groups = head;
  }
  if (groups.length !== 8) return null;
  const bytes: number[] = [];
  for (const g of groups) bytes.push((g >>> 8) & 255, g & 255);
  return bytes;
}

function isUnsafeIPv6(ip: string): boolean {
  const b = ipv6ToBytes(ip);
  if (!b) return true;
  if (b.every((x) => x === 0)) return true; // :: unspecified
  if (b.slice(0, 15).every((x) => x === 0) && b[15] === 1) return true; // ::1 loopback
  if ((b[0] & 0xfe) === 0xfc) return true; // fc00::/7 unique-local
  if (b[0] === 0xfe && (b[1] & 0xc0) === 0x80) return true; // fe80::/10 link-local
  if (b[0] === 0xff) return true; // ff00::/8 multicast
  // IPv4-mapped ::ffff:0:0/96 — inspect the embedded IPv4.
  if (b.slice(0, 10).every((x) => x === 0) && b[10] === 0xff && b[11] === 0xff) {
    return isUnsafeIPv4(`${b[12]}.${b[13]}.${b[14]}.${b[15]}`);
  }
  // IPv4-compatible ::/96 (deprecated) — inspect the embedded IPv4 too.
  if (b.slice(0, 12).every((x) => x === 0)) {
    return isUnsafeIPv4(`${b[12]}.${b[13]}.${b[14]}.${b[15]}`);
  }
  return false;
}

function isUnsafeIp(ip: string): boolean {
  const t = net.isIP(ip);
  if (t === 4) return isUnsafeIPv4(ip);
  if (t === 6) return isUnsafeIPv6(ip);
  return true; // not a valid IP literal → treat as unsafe
}

// ---- URL validation ----

const BLOCKED_HOSTNAMES = new Set(["localhost", "localhost."]);

export type UrlValidationResult =
  | { ok: true; url: URL }
  | { ok: false; reason: string };

/**
 * Validate a merchant webhook URL. Resolves DNS and rejects if the destination
 * (or any resolved A/AAAA address) is unsafe. Async because of DNS.
 */
export async function validateWebhookUrl(raw: unknown): Promise<UrlValidationResult> {
  if (typeof raw !== "string" || raw.trim() === "") {
    return { ok: false, reason: "empty" };
  }

  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return { ok: false, reason: "malformed" };
  }

  // Scheme policy: https always; http only outside production.
  if (url.protocol !== "https:" && !(url.protocol === "http:" && ALLOW_HTTP)) {
    return { ok: false, reason: "scheme" };
  }

  // No credentials embedded in the URL.
  if (url.username || url.password) {
    return { ok: false, reason: "credentials" };
  }

  const hostname = url.hostname.toLowerCase();
  if (
    BLOCKED_HOSTNAMES.has(hostname) ||
    hostname === "localhost." ||
    hostname.endsWith(".localhost")
  ) {
    return { ok: false, reason: "blocked-host" };
  }

  // Bracketed IPv6 literal (e.g. "[::1]") → strip brackets for the IP check.
  let hostForIp = hostname;
  if (hostForIp.startsWith("[") && hostForIp.endsWith("]")) {
    hostForIp = hostForIp.slice(1, -1);
  }

  // If the host is an IP literal, check it directly — no DNS.
  if (net.isIP(hostForIp) !== 0) {
    if (isUnsafeIp(hostForIp)) return { ok: false, reason: "unsafe-ip" };
    return { ok: true, url };
  }

  // Otherwise resolve DNS and reject if ANY resolved address is unsafe.
  let addrs: { address: string }[];
  try {
    addrs = await dns.lookup(hostForIp, { all: true });
  } catch {
    return { ok: false, reason: "dns-failed" };
  }
  if (addrs.length === 0) return { ok: false, reason: "dns-empty" };
  for (const a of addrs) {
    if (isUnsafeIp(a.address)) return { ok: false, reason: "unsafe-ip" };
  }

  return { ok: true, url };
}

function safeHostLabel(raw: string): string {
  try {
    return new URL(raw).hostname;
  } catch {
    return "invalid-url";
  }
}

export type DeliveryResult =
  | { delivered: true; status: number; ok: boolean }
  | { delivered: false; status: 0; error: string };

/**
 * Deliver a signed webhook payload safely: re-validate the destination against
 * current DNS (rebinding guard), refuse redirects (redirect: "manual"), and
 * apply a timeout. Never throws. A 3xx is treated as a failed delivery, not
 * followed, so a public URL can't bounce us into a private network.
 */
export async function deliverWebhook(
  rawUrl: string,
  init: { headers: Record<string, string>; body: string },
  opts?: { timeoutMs?: number; webhookId?: string }
): Promise<DeliveryResult> {
  const timeoutMs = opts?.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  const check = await validateWebhookUrl(rawUrl);
  if (!check.ok) {
    console.warn(
      `[webhook-security] blocked delivery${opts?.webhookId ? ` [${opts.webhookId}]` : ""} to ${safeHostLabel(rawUrl)}: ${check.reason}`
    );
    return { delivered: false, status: 0, error: "Destination not allowed" };
  }

  try {
    const res = await fetch(check.url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json", ...init.headers },
      body: init.body,
      redirect: "manual",
      signal: AbortSignal.timeout(timeoutMs),
    });

    // Refuse redirects — do not follow into a possibly-internal Location.
    if (res.type === "opaqueredirect" || (res.status >= 300 && res.status < 400)) {
      return { delivered: false, status: 0, error: "Redirect not allowed" };
    }

    return { delivered: true, status: res.status, ok: res.ok };
  } catch (err) {
    return { delivered: false, status: 0, error: (err as Error).message };
  }
}
