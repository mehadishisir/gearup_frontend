"use server";

import { cookies } from "next/headers";

export async function createPaymentSession(rentalOrderId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("Authentication required. Please login again.");
  }

  const res = await fetch(
    "https://gear-up-backend-one.vercel.app/api/payments/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rentalOrderId }),
    }
  );

  const result = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("Payment API Error:", { status: res.status, result });
    throw new Error(result?.message || `Payment failed (${res.status})`);
  }

  return result as { data: { checkoutUrl: string } };
}