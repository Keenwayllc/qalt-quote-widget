import crypto from "crypto";
import prisma from "@/lib/prisma";

export const INTEGRATION_SCOPES = ["quotes:read", "analytics:read"] as const;
export type IntegrationScope = (typeof INTEGRATION_SCOPES)[number];

export interface IntegrationConnectionRow {
  id: string;
  companyId: string;
  name: string;
  provider: string;
  tokenHash: string;
  tokenPrefix: string;
  scopes: string[];
  createdAt: Date;
  lastUsedAt: Date | null;
  revokedAt: Date | null;
}

let schemaPromise: Promise<void> | null = null;

export async function ensureIntegrationSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "IntegrationConnection" (
          "id" TEXT PRIMARY KEY,
          "companyId" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "provider" TEXT NOT NULL DEFAULT 'CUSTOM',
          "tokenHash" TEXT NOT NULL UNIQUE,
          "tokenPrefix" TEXT NOT NULL,
          "scopes" TEXT[] NOT NULL DEFAULT ARRAY['quotes:read','analytics:read']::TEXT[],
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "lastUsedAt" TIMESTAMP(3),
          "revokedAt" TIMESTAMP(3)
        )
      `);
      await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "IntegrationConnection_companyId_idx" ON "IntegrationConnection"("companyId")`);
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "IntegrationAuditLog" (
          "id" TEXT PRIMARY KEY,
          "companyId" TEXT NOT NULL,
          "connectionId" TEXT,
          "action" TEXT NOT NULL,
          "resource" TEXT,
          "metadata" JSONB,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
      await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "IntegrationAuditLog_companyId_createdAt_idx" ON "IntegrationAuditLog"("companyId", "createdAt" DESC)`);
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  await schemaPromise;
}

export function createIntegrationSecret() {
  const token = `qalt_live_${crypto.randomBytes(32).toString("base64url")}`;
  return {
    token,
    tokenHash: hashIntegrationSecret(token),
    tokenPrefix: `${token.slice(0, 18)}...`,
  };
}

export function hashIntegrationSecret(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function normalizeScopes(scopes: unknown): IntegrationScope[] {
  if (!Array.isArray(scopes)) return [...INTEGRATION_SCOPES];
  const requested = scopes.filter((scope): scope is IntegrationScope =>
    typeof scope === "string" && (INTEGRATION_SCOPES as readonly string[]).includes(scope)
  );
  return requested.length ? [...new Set(requested)] : [...INTEGRATION_SCOPES];
}

export async function authenticateIntegration(request: Request, requiredScope?: IntegrationScope) {
  await ensureIntegrationSchema();
  const authorization = request.headers.get("authorization") ?? "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;

  const tokenHash = hashIntegrationSecret(match[1].trim());
  const rows = await prisma.$queryRawUnsafe<IntegrationConnectionRow[]>(
    `SELECT * FROM "IntegrationConnection" WHERE "tokenHash" = $1 AND "revokedAt" IS NULL LIMIT 1`,
    tokenHash
  );
  const connection = rows[0];
  if (!connection) return null;
  if (requiredScope && !connection.scopes.includes(requiredScope)) return null;

  await prisma.$executeRawUnsafe(
    `UPDATE "IntegrationConnection" SET "lastUsedAt" = CURRENT_TIMESTAMP WHERE "id" = $1`,
    connection.id
  );
  return connection;
}

export async function writeIntegrationAudit(params: {
  companyId: string;
  connectionId?: string | null;
  action: string;
  resource?: string | null;
  metadata?: unknown;
}) {
  await ensureIntegrationSchema();
  await prisma.$executeRawUnsafe(
    `INSERT INTO "IntegrationAuditLog" ("id", "companyId", "connectionId", "action", "resource", "metadata") VALUES ($1,$2,$3,$4,$5,$6::jsonb)`,
    crypto.randomUUID(),
    params.companyId,
    params.connectionId ?? null,
    params.action,
    params.resource ?? null,
    JSON.stringify(params.metadata ?? {})
  );
}
