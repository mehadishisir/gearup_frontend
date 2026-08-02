"use server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gear-up-backend-one.vercel.app/api";

export const getCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch categories");
  }

  return result.data;
};