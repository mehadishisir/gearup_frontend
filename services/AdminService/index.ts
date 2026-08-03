"use server";

import { cookies } from "next/headers";

export async function getAllUsers() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("Unauthorized");

  const res = await fetch(
    "https://gear-up-backend-one.vercel.app/api/admin/users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await res.json();
  if (!res.ok) throw new Error(result?.message || "Failed to fetch users");
  return result;
}

export async function updateUserStatus(userId: string, status: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) throw new Error("Unauthorized");

  const res = await fetch(
    `https://gear-up-backend-one.vercel.app/api/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  const result = await res.json();
  if (!res.ok) throw new Error(result?.message || "Failed to update user");
  return result;
}