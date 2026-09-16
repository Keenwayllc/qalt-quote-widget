import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  authenticateIntegration,
  writeIntegrationAudit,
  type IntegrationConnectionRow,
} from "@/lib/integration-auth";

function rpcResult(id: unknown, result: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id, result });
}

function rpcError(id: unknown, code: number, message: string) {
  return NextResponse.json({ jsonrpc: "2.0", id, error: { code, message } });
}

async function listQuotes(connection: IntegrationConnectionRow, args: Record<string, unknown>) {
  const status = typeof args.status === "string" && args.status.trim() ? args.status.trim().toUpperCase() : null;
  const requestedLimit = typeof args.limit === "number" ? Math.floor(args.limit) : 20;
  const limit = Math.min(Math.max(requestedLimit, 1), 50);

  const quotes = await prisma.quoteRequest.findMany({
    where: {
      companyId: connection.companyId,
      deletedAt: null,
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      customerName: true,
      customerEmail: true,
      pickupZip: true,
      dropoffZip: true,
      distanceMiles: true,
      estimatedPrice: true,
      status: true,
      serviceType: true,
      paymentStatus: true,
      createdAt: true,
    },
  });

  await writeIntegrationAudit({
    companyId: connection.companyId,
    connectionId: connection.id,
    action: "mcp.tool_called",
    resource: "list_quotes",
    metadata: { status, limit },
  });
  return quotes;
}

async function getQuote(connection: IntegrationConnectionRow, args: Record<string, unknown>) {
  const id = typeof args.id === "string" ? args.id.trim() : "";
  if (!id) throw new Error("Quote id is required");

  const quote = await prisma.quoteRequest.findFirst({
    where: { id, companyId: connection.companyId, deletedAt: null },
    select: {
      id: true,
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      pickupZip: true,
      dropoffZip: true,
      pickupAddress: true,
      dropoffAddress: true,
      distanceMiles: true,
      estimatedPrice: true,
      pricingBreakdown: true,
      status: true,
      serviceType: true,
      paymentStatus: true,
      createdAt: true,
    },
  });

  await writeIntegrationAudit({
    companyId: connection.companyId,
    connectionId: connection.id,
    action: "mcp.tool_called",
    resource: "get_quote",
    metadata: { quoteId: id, found: !!quote },
  });
  return quote;
}

async function analyticsSummary(connection: IntegrationConnectionRow) {
  const [total, pending, won, lost, aggregate] = await Promise.all([
    prisma.quoteRequest.count({ where: { companyId: connection.companyId, deletedAt: null } }),
    prisma.quoteRequest.count({ where: { companyId: connection.companyId, deletedAt: null, status: "PENDING" } }),
    prisma.quoteRequest.count({ where: { companyId: connection.companyId, deletedAt: null, status: "WON" } }),
    prisma.quoteRequest.count({ where: { companyId: connection.companyId, deletedAt: null, status: "LOST" } }),
    prisma.quoteRequest.aggregate({
      where: { companyId: connection.companyId, deletedAt: null },
      _avg: { estimatedPrice: true },
      _sum: { estimatedPrice: true },
    }),
  ]);

  const summary = {
    totalQuotes: total,
    pendingQuotes: pending,
    wonQuotes: won,
    lostQuotes: lost,
    averageQuoteValue: aggregate._avg.estimatedPrice ?? 0,
    totalQuotedValue: aggregate._sum.estimatedPrice ?? 0,
  };

  await writeIntegrationAudit({
    companyId: connection.companyId,
    connectionId: connection.id,
    action: "mcp.tool_called",
    resource: "analytics_summary",
  });
  return summary;
}

export async function GET(request: Request) {
  const connection = await authenticateIntegration(request);
  if (!connection) {
    return NextResponse.json(
      { error: "Unauthorized", message: "Use a valid Qalt integration token in the Authorization: Bearer header." },
      { status: 401 }
    );
  }
  return NextResponse.json({
    name: "Qalt MCP Server",
    version: "1.0.0",
    mode: "read-only",
    tools: ["list_quotes", "get_quote", "analytics_summary"],
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || body.jsonrpc !== "2.0" || typeof body.method !== "string") {
    return rpcError(body?.id ?? null, -32600, "Invalid JSON-RPC request");
  }

  const connection = await authenticateIntegration(request);
  if (!connection) return rpcError(body.id ?? null, -32001, "Unauthorized Qalt integration connection");

  if (body.method === "initialize") {
    return rpcResult(body.id, {
      protocolVersion: "2025-06-18",
      capabilities: { tools: {} },
      serverInfo: { name: "Qalt", version: "1.0.0" },
      instructions: "Qalt provides merchant-scoped, read-only quote and analytics tools. The connection only sees data for the authorized Qalt merchant.",
    });
  }

  if (body.method === "notifications/initialized") {
    return new NextResponse(null, { status: 202 });
  }

  if (body.method === "tools/list") {
    return rpcResult(body.id, {
      tools: [
        {
          name: "list_quotes",
          description: "List recent quotes for the connected Qalt merchant.",
          inputSchema: {
            type: "object",
            properties: {
              status: { type: "string", description: "Optional quote status such as PENDING, WON, or LOST." },
              limit: { type: "number", minimum: 1, maximum: 50, default: 20 },
            },
            additionalProperties: false,
          },
        },
        {
          name: "get_quote",
          description: "Get one quote by its Qalt quote ID.",
          inputSchema: {
            type: "object",
            properties: { id: { type: "string" } },
            required: ["id"],
            additionalProperties: false,
          },
        },
        {
          name: "analytics_summary",
          description: "Get a basic quote activity summary for the connected Qalt merchant.",
          inputSchema: { type: "object", properties: {}, additionalProperties: false },
        },
      ],
    });
  }

  if (body.method === "tools/call") {
    const name = body.params?.name;
    const args = body.params?.arguments ?? {};
    try {
      let data: unknown;
      if (name === "list_quotes") {
        if (!connection.scopes.includes("quotes:read")) return rpcError(body.id, -32003, "Missing quotes:read permission");
        data = await listQuotes(connection, args);
      } else if (name === "get_quote") {
        if (!connection.scopes.includes("quotes:read")) return rpcError(body.id, -32003, "Missing quotes:read permission");
        data = await getQuote(connection, args);
      } else if (name === "analytics_summary") {
        if (!connection.scopes.includes("analytics:read")) return rpcError(body.id, -32003, "Missing analytics:read permission");
        data = await analyticsSummary(connection);
      } else {
        return rpcError(body.id, -32601, "Unknown Qalt tool");
      }

      return rpcResult(body.id, {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
        structuredContent: data,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Tool execution failed";
      return rpcResult(body.id, {
        isError: true,
        content: [{ type: "text", text: message }],
      });
    }
  }

  return rpcError(body.id ?? null, -32601, "Method not found");
}
