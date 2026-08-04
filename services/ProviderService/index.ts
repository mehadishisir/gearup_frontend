import { apiFetch } from "@/lib/api-client";

export interface IRentalOrderItem {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  gearItem: { name: string };
  customer: { name: string; email: string };
}

export const getProviderOrders = async () => {
  return apiFetch<{ data: IRentalOrderItem[] }>("/provider/orders");
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  return apiFetch<{ data: IRentalOrderItem }>(`/provider/orders/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};