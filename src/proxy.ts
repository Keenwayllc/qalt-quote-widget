import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev-only-do-not-use-in-prod";
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get("qalt_token")?.value;

  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await jose.jwtVerify(token, encodedSecret);
      return NextResponse.next();
    } catch {
      // Token is invalid or expired
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("qalt_token");
      return response;
    }
  }

  // Redirect logged-in users away from /login and /register
  if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") {
    if (token) {
      try {
        await jose.jwtVerify(token, encodedSecret);
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch {
        // Token is invalid, let them proceed to login/register
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
