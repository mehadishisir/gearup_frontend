import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/gear", "/auth/login", "/auth/register", "/payment/success", "/payment/cancel"];
const AUTH_ROUTES = ["/auth/login", "/auth/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  // Allow public assets
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith("/gear/")
  );

  // Not logged in
  if (!token) {
    if (!isPublicRoute) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Logged in — block auth routes
  if (AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};