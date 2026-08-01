"use server";

import { cookies } from "next/headers";
import { IUser, IRegisterPayload, ILoginPayload, IApiResponse, ILoginResponse } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://gear-up-backend-one.vercel.app/api";
// register user

export const registerUser = async (
  payload: IRegisterPayload
): Promise<IApiResponse<IUser>> => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json().catch(() => null);

  if (!res.ok || !result) {
    throw new Error(result?.message || "Registration failed");
  }

  return result;
};
// get current user

export const loginUser = async (
  payload: ILoginPayload
): Promise<IApiResponse<ILoginResponse>> => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json().catch(() => null);

  if (!res.ok || !result) {
    throw new Error(result?.message || "Login failed");
  }

  return result;
};
// get current user

export const getCurrentUser = async (): Promise<IUser | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) return null;

  const result = await res.json();
  return result.data ?? null;
};
// logout user
export const logoutUser = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("userRole");
};