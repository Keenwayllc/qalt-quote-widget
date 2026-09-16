import { NextResponse } from "next/server";
import { INTEGRATION_SCOPES } from "@/lib/integration-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  return NextResponse.json(
    {
      resource: `${origin}/api/mcp`,
      authorization_servers: [origin],
      bearer_methods_supported: ["header"],
      scopes_supported: [...INTEGRATION_SCOPES],
      resource_documentation: `${origin}/dashboard/integrations`,
    },
    { headers: { "Cache-Control": "public, max-age=300" } }
  );
}
