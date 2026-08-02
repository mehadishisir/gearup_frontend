"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api-client";

export interface IRentalOrderItem {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  gearItem: { name: string };
  customer: { name: string; email: string };
}

async function authHeader(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export const getProviderOrders = async () => {
  return apiFetch<{ data: IRentalOrderItem[] }>("/provider/orders", {
    headers: await authHeader(),
  });
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  return apiFetch<{ data: IRentalOrderItem }>(`/provider/orders/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    headers: await authHeader(),
  });
};