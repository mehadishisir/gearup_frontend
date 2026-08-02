const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://gear-up-backend-one.vercel.app/api";

export interface ICategory {
  id: string;
  name: string;
}

export const getCategories = async (): Promise<ICategory[]> => {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result.data;
};