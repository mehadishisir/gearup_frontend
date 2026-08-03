"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api-client";

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

async function authHeader(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export const getAllUsers = async () => {
  return apiFetch<{ data: IAdminUser[] }>("/admin/users", {
    headers: await authHeader(),
  });
};

export const updateUserStatus = async (userId: string, status: "ACTIVE" | "SUSPENDED") => {
  return apiFetch<{ data: IAdminUser }>(`/admin/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    headers: await authHeader(),
  });
};