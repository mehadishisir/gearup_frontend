import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  exp: number;
}

const ROLE_ROUTES = [
  { prefix: "/dashboard/customer", roles: ["CUSTOMER"] },
  { prefix: "/dashboard/provider", roles: ["PROVIDER"] },
  { prefix: "/dashboard/admin", roles: ["ADMIN"] },
] ;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const rule = ROLE_ROUTES.find((r) => pathname.startsWith(r.prefix));
  if (!rule) return NextResponse.next();

  const token = request.cookies.get("gearup_token")?.value;
  if (!token) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.exp * 1000 < Date.now()) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (!rule.roles.includes(decoded.role)) {
      return NextResponse.redirect(new URL(`/dashboard/${decoded.role.toLowerCase()}`, request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };