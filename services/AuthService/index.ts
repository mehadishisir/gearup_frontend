"use server";

import { cookies } from "next/headers";

import {
  IUser,
  IRegisterPayload,
  ILoginPayload,
  IApiResponse,
  ILoginResponse,
} from "@/types/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gear-up-backend-one.vercel.app/api";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60, 
};

// Register User
export const registerUser = async (
  payload: IRegisterPayload
): Promise<IApiResponse<IUser>> => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json().catch(() => null);

  if (!res.ok || !result) {
    throw new Error(result?.message || "Registration failed");
  }

  return result;
};

// login
export const loginUser = async (
  payload: ILoginPayload
): Promise<IApiResponse<ILoginResponse>> => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json().catch(() => null);

  if (!res.ok || !result) {
    throw new Error(result?.message || "Login failed");
  }

  const cookieStore = await cookies();
  if (result?.data?.accessToken) {
    cookieStore.set("accessToken", result.data.accessToken, COOKIE_OPTIONS);
  }
  if (result?.data?.refreshToken) {
    cookieStore.set("refreshToken", result.data.refreshToken, COOKIE_OPTIONS);
  }

  return result;
};

export const getCurrentUser = async (): Promise<IUser | null> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const result = await res.json();
  return result.data ?? null;
};

// logout
export const logoutUser = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};