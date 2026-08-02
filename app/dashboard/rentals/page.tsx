"use client";

import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getMyRentals } from "@/services/RentalService";
import { apiFetch } from "@/lib/api-client";
import { format } from "date-fns";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  Package,
} from "lucide-react";

export default function RentalsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-rentals"],
    queryFn: getMyRentals,
  });

  const payMutation = useMutation({
    mutationFn: (rentalOrderId: string) =>
      apiFetch<{ data: { checkoutUrl: string } }>("/payments/create", {
        method: "POST",
        body: JSON.stringify({ rentalOrderId }),
      }),
    onSuccess: (res) => {
      window.location.href = res.data.checkoutUrl;
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading rentals...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">My Rentals</h1>
          <p className="mt-2 text-slate-500">Manage and track all your rental orders.</p>
        </div>

        {!data?.data?.length && (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <Package className="mx-auto h-14 w-14 text-slate-300" />
            <h2 className="mt-4 text-xl font-semibold text-slate-900">No Rentals Yet</h2>
            <p className="mt-2 text-slate-500">Browse gear and place your first rental order.</p>
            <Link
              href="/gear"
              className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-medium text-white transition hover:bg-orange-600"
            >
              Browse Gear
            </Link>
          </div>
        )}

        <div className="space-y-6">
          {data?.data?.map((rental) => (
            <div
              key={rental.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Rental Order</h2>
                  <p className="mt-1 font-mono text-xs text-slate-400">
                    #{rental.id.slice(0, 8)}
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-1 text-xs font-semibold ${
                    rental.status === "PLACED"
                      ? "bg-blue-100 text-blue-700"
                      : rental.status === "CONFIRMED"
                      ? "bg-purple-100 text-purple-700"
                      : rental.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : rental.status === "CANCELLED"
                      ? "bg-red-100 text-red-600"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {rental.status}
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays className="h-4 w-4 text-orange-500" />
                    Start Date
                  </div>
                  <p className="mt-2 font-semibold text-slate-900">
                    {format(new Date(rental.startDate), "dd MMM yyyy")}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays className="h-4 w-4 text-orange-500" />
                    End Date
                  </div>
                  <p className="mt-2 font-semibold text-slate-900">
                    {format(new Date(rental.endDate), "dd MMM yyyy")}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CreditCard className="h-4 w-4 text-orange-500" />
                    Total Amount
                  </div>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    ৳{rental.totalAmount}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Link
                  href={`/dashboard/rentals/${rental.id}`}
                  className="flex items-center text-sm font-semibold text-orange-600"
                >
                  <span>View Details</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                {rental.status === "CONFIRMED" && (
                  <button
                    disabled={payMutation.isPending}
                    onClick={() => payMutation.mutate(rental.id)}
                    className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
                  >
                    {payMutation.isPending ? "Processing..." : "Pay Now"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}