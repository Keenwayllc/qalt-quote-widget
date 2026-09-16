import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function normalizedHost(request: NextRequest) {
  return (request.headers.get("host") || "").split(":")[0].trim().toLowerCase();
}

function isQaltHost(host: string) {
  return (
    !host ||
    host === "qalt.site" ||
    host === "www.qalt.site" ||
    host === "localhost" ||
    host.endsWith(".vercel.app")
  );
}

export function proxy(request: NextRequest) {
  const host = normalizedHost(request);
  const pathname = request.nextUrl.pathname;

  // A merchant custom domain serves its verified widget at the root. API and
  // framework asset requests stay untouched so the embedded app continues to
  // function normally on that hostname.
  if (!isQaltHost(host) && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/custom-widget/${encodeURIComponent(host)}`;
    return NextResponse.rewrite(url);
  }

  const response = NextResponse.next();
  // Forward the current pathname as a header so server layouts can read it.
  if (pathname.startsWith("/dashboard")) {
    response.headers.set("x-pathname", pathname);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
