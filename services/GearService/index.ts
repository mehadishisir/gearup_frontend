import { apiFetch } from "@/lib/api-client";



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

  return apiFetch(
    "/gear",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

};