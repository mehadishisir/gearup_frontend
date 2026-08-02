import { apiFetch } from "@/lib/api-client";
import type { GearResponse } from "@/types/gear";

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
  return apiFetch("/gear", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getGear = async () => {
  return apiFetch<GearResponse>("/gear", {
    method: "GET",
    cache: "no-store",
  });
};