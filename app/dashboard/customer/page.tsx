"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMyRentals } from "@/services/RentalService";
import { format } from "date-fns";
import {
  Package,
  Clock3,
  CheckCircle2,
  XCircle,
  ArrowRight,
  CalendarDays,
  CreditCard,
} from "lucide-react";

export default function CustomerDashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-rentals"],
    queryFn: getMyRentals,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  const rentals = data?.data || [];

  const totalRentals = rentals.length;

  const placedRentals = rentals.filter(
    (r) => r.status === "PLACED"
  ).length;

  const completedRentals = rentals.filter(
    (r) => r.status === "COMPLETED"
  ).length;

  const cancelledRentals = rentals.filter(
    (r) => r.status === "CANCELLED"
  ).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Customer Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back! Here is a quick overview of your rentals.
          </p>
        </div>

        {/* Summary Cards */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <Package className="h-8 w-8 text-orange-500" />

              <span className="text-3xl font-bold">
                {totalRentals}
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Total Rentals
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <Clock3 className="h-8 w-8 text-blue-500" />

              <span className="text-3xl font-bold">
                {placedRentals}
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Active Rentals
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <CheckCircle2 className="h-8 w-8 text-green-500" />

              <span className="text-3xl font-bold">
                {completedRentals}
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Completed
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <XCircle className="h-8 w-8 text-red-500" />

              <span className="text-3xl font-bold">
                {cancelledRentals}
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Cancelled
            </p>
          </div>
        </div>

        {/* Recent Rentals */}

        <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Rentals
            </h2>

            <Link
              href="/dashboard/rentals"
              className="text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              View All
            </Link>
          </div>

          {!rentals.length ? (
            <div className="py-10 text-center">
              <p className="text-slate-500">
                You havenot rented anything yet.
              </p>

              <Link
                href="/gear"
                className="mt-5 inline-flex rounded-xl bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
              >
                Browse Gear
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {rentals.slice(0, 5).map((rental) => (
                <Link
                  key={rental.id}
                  href={`/dashboard/rentals/${rental.id}`}
                >
                  <div className="rounded-xl border border-slate-200 p-5 transition hover:border-orange-200 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {rental.items?.[0]?.gearItem?.name ??
                            "Rental Order"}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Order ID: {rental.id.slice(0, 8)}...
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          rental.status === "PLACED"
                            ? "bg-blue-100 text-blue-700"
                            : rental.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {rental.status}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-orange-500" />

                        <span className="text-sm text-slate-600">
                          {format(
                            new Date(rental.startDate),
                            "dd MMM"
                          )}{" "}
                          -{" "}
                          {format(
                            new Date(rental.endDate),
                            "dd MMM yyyy"
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-orange-500" />

                        <span className="font-medium">
                          ৳{rental.totalAmount}
                        </span>
                      </div>

                      <div className="flex justify-end">
                        <span className="flex items-center gap-1 text-sm font-medium text-orange-600">
                          View Details

                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}