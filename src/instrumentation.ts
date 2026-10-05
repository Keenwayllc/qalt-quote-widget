import type { InstrumentationOnRequestError } from "next/dist/server/instrumentation/types";

export function register() {}

/** Server errors from pages, API routes and server actions go to error monitoring. */
export const onRequestError: InstrumentationOnRequestError = async (error, request, context) => {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { recordAppError } = await import("@/lib/error-triage");
  const err = error instanceof Error ? error : new Error(String(error));
  await recordAppError({
    source: "server",
    message: `${err.message} [${context.routeType}]`,
    stack: err.stack ?? null,
    path: context.routePath || request.path,
    userAgent: typeof request.headers["user-agent"] === "string" ? request.headers["user-agent"] : null,
  });
};
