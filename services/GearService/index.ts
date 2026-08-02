"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gear-up-backend-one.vercel.app/api";

export interface CreateGearPayload {
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  categoryId: string;
  available: boolean;
}

export const createGear = async (
  payload: CreateGearPayload
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${API_BASE_URL}/gear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create gear");
  }

  return result;
};