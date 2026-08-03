"use client";

import { useQuery } from "@tanstack/react-query";
import { CreditCard } from "lucide-react";
import { format } from "date-fns";

interface Payment {
  id: string;
  amount: string;
  status: "PAID" | "PENDING" | "FAILED" | "CANCELLED";
  createdAt: string;
}

interface PaymentsResponse {
  success: boolean;
  message: string;
  data: Payment[];
}

export default function PaymentsPage() {
  const { data, isLoading } = useQuery<PaymentsResponse>({
    queryKey: ["my-payments"],
    queryFn: async () => {
      const res = await fetch("/api/payments", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch payments");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading payments...</p>
      </div>
    );
  }

  const payments = data?.data ?? [];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold text-slate-900">Payment History</h1>
        <p className="mt-2 text-slate-500">View all your payment transactions.</p>

        {!payments.length && (
          <div className="mt-10 rounded-2xl bg-white p-12 text-center shadow-sm">
            <CreditCard className="mx-auto h-14 w-14 text-slate-300" />
            <h2 className="mt-4 text-xl font-semibold text-slate-900">No Payments Yet</h2>
            <p className="mt-2 text-slate-500">Your payment history will appear here.</p>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div>
                <p className="font-mono text-xs text-slate-400">#{payment.id.slice(0, 8)}</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  ৳{payment.amount}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {format(new Date(payment.createdAt), "dd MMM yyyy, hh:mm a")}
                </p>
              </div>
              <span
                className={`rounded-full px-4 py-1 text-xs font-semibold ${
                  payment.status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : payment.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {payment.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}