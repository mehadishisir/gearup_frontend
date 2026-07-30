import { jwtDecode } from "jwt-decode";
import type { Role } from "./types";

const TOKEN_COOKIE = "gearup_token";

interface DecodedToken {
  id: string;
  email: string;
  role: Role;
  exp: number;
}

// cookie-তে রাখছি কারণ middleware.ts (server-side) এখান থেকেই role check করবে
export function setToken(token: string) {
  document.cookie = `${TOKEN_COOKIE}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${TOKEN_COOKIE}=([^;]+)`));
  return match ? match[2] : null;
}

export function clearToken() {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
}

export function getCurrentUser(): DecodedToken | null {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.exp * 1000 < Date.now()) {
      clearToken();
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}