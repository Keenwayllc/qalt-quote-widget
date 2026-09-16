import crypto from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getEntitlements } from "@/lib/plans";
import {
  createIntegrationSecret,
  ensureIntegrationSchema,
  normalizeScopes,
  writeIntegrationAudit,
} from "@/lib/integration-auth";

async function getDashboardAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

async function getEnterpriseCompany(companyId: string) {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { id: true, subscriptionPlan: true },
  });
  if (!company) return null;
  return {
    ...company,
    allowed: getEntitlements(company.subscriptionPlan).isWebhookEnabled,
  };
}

export async function GET(request: Request) {
  try {
    const auth = await getDashboardAuth();
    if (!auth?.companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await getEnterpriseCompany(auth.companyId);
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    await ensureIntegrationSchema();

    const connections = company.allowed
      ? await prisma.$queryRawUnsafe<Array<{
          id: string;
          name: string;
          provider: string;
          tokenPrefix: string;
          scopes: string[];
          createdAt: Date;
          lastUsedAt: Date | null;
          revokedAt: Date | null;
        }>>(
          `SELECT "id", "name", "provider", "tokenPrefix", "scopes", "createdAt", "lastUsedAt", "revokedAt"
           FROM "IntegrationConnection"
           WHERE "companyId" = $1
           ORDER BY "createdAt" DESC`,
          auth.companyId
        )
      : [];

    const activity = company.allowed
      ? await prisma.$queryRawUnsafe<Array<{
          id: string;
          connectionId: string | null;
          action: string;
          resource: string | null;
          metadata: unknown;
          createdAt: Date;
        }>>(
          `SELECT "id", "connectionId", "action", "resource", "metadata", "createdAt"
           FROM "IntegrationAuditLog"
           WHERE "companyId" = $1
           ORDER BY "createdAt" DESC
           LIMIT 20`,
          auth.companyId
        )
      : [];

    const origin = new URL(request.url).origin;
    return NextResponse.json({
      enterpriseEnabled: company.allowed,
      connections,
      activity,
      endpoints: {
        mcp: `${origin}/api/mcp`,
        apiBase: `${origin}/api/v1`,
      },
    });
  } catch (error) {
    console.error("GET /api/dashboard/integrations error:", error);
    return NextResponse.json({ error: "Unable to load integrations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getDashboardAuth();
    if (!auth?.companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await getEnterpriseCompany(auth.companyId);
    if (!company?.allowed) {
      return NextResponse.json({ error: "Enterprise plan required" }, { status: 403 });
    }

    await ensureIntegrationSchema();
    const body = await request.json().catch(() => ({}));
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "AI connection";
    const providerInput = typeof body.provider === "string" ? body.provider.toUpperCase() : "CUSTOM";
    const allowedProviders = new Set(["CHATGPT", "CLAUDE", "MANUS", "PERPLEXITY", "QWEN", "DEEPSEEK", "CUSTOM"]);
    const provider = allowedProviders.has(providerInput) ? providerInput : "CUSTOM";
    const scopes = normalizeScopes(body.scopes);
    const secret = createIntegrationSecret();
    const id = crypto.randomUUID();

    await prisma.$executeRawUnsafe(
      `INSERT INTO "IntegrationConnection" ("id", "companyId", "name", "provider", "tokenHash", "tokenPrefix", "scopes")
       VALUES ($1,$2,$3,$4,$5,$6,$7::text[])`,
      id,
      auth.companyId,
      name || `${provider} connection`,
      provider,
      secret.tokenHash,
      secret.tokenPrefix,
      scopes
    );

    await writeIntegrationAudit({
      companyId: auth.companyId,
      connectionId: id,
      action: "connection.created",
      resource: provider,
      metadata: { scopes },
    });

    const origin = new URL(request.url).origin;
    return NextResponse.json({
      connection: {
        id,
        name: name || `${provider} connection`,
        provider,
        tokenPrefix: secret.tokenPrefix,
        scopes,
        createdAt: new Date().toISOString(),
        lastUsedAt: null,
        revokedAt: null,
      },
      token: secret.token,
      warning: "Copy this token now. Qalt stores only its hash and cannot show it again.",
      endpoints: {
        mcp: `${origin}/api/mcp`,
        apiBase: `${origin}/api/v1`,
      },
    });
  } catch (error) {
    console.error("POST /api/dashboard/integrations error:", error);
    return NextResponse.json({ error: "Unable to create integration" }, { status: 500 });
  }
}
