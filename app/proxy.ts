
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/gear",
  "/auth/login",
  "/auth/register",
  "/payment-success",
  "/payment-cancel",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    /\.(png|jpg|jpeg|svg|gif|ico|css|js|woff|woff2)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const isPublicRoute =
    pathname === "/" ||
    PUBLIC_ROUTES.some((route) => pathname === route) ||
    pathname.startsWith("/gear/");

  if (!token) {
    if (!isPublicRoute) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (token && (pathname === "/auth/login" || pathname === "/auth/register")) {
    const redirectTo = request.nextUrl.searchParams.get("redirectTo") || "/dashboard";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};