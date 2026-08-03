"use client";
import ReviewForm from "@/components/review/ReviewForm";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getRentalById } from "@/services/RentalService";
import { createPaymentSession } from "@/services/PaymentService";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  Package,
  
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function RentalDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["rental", id],
    queryFn: () => getRentalById(id),
  });

  const payMutation = useMutation({
    mutationFn: () => createPaymentSession(id),
    onSuccess: (res) => {
      window.location.href = res.data.paymentUrl;
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading rental details...</p>
      </div>
    );
  }

  const rental = data?.data;

  if (!rental) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Rental not found</p>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
  PLACED: "bg-blue-100 text-blue-700",
  CONFIRMED: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
  RETURNED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-600",
};

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/dashboard/rentals"
          className="mb-6 inline-flex items-center gap-2 text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Rentals
        </Link>

        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Rental Details</h1>
            <p className="mt-2 text-slate-500">
              View complete information about your rental order.
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-1 text-xs font-semibold ${
              statusColors[rental.status] || "bg-slate-100 text-slate-700"
            }`}
          >
            {rental.status}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <Package className="h-5 w-5 text-orange-500" />
                  Gear Items
                </h2>

                <div className="space-y-4">
                  {rental.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-5 rounded-xl border border-slate-200 p-4"
                    >
                      <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-slate-100">
                        <Image
                          src={
                            item.gearItem.images?.length
                              ? item.gearItem.images[0]
                              : "/images/hero.jpg"
                          }
                          alt={item.gearItem.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {item.gearItem.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {item.gearItem.brand}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-4 text-sm">
                          <p>
                            <span className="font-medium">Quantity:</span>{" "}
                            {item.quantity}
                          </p>
                          <p>
                            <span className="font-medium">Price:</span> ৳
                            {item.priceAtBooking}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {rental.status === "RETURNED" &&
  rental.items?.map((item) => (
    <ReviewForm
      key={item.id}
      rentalOrderId={rental.id}
      gearItemId={item.gearItem.id}
    />
  ))}
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <CalendarDays className="h-5 w-5 text-orange-500" />
                  Rental Period
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Start Date</span>
                    <span className="font-medium text-slate-900">
                      {format(new Date(rental.startDate), "dd MMM yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">End Date</span>
                    <span className="font-medium text-slate-900">
                      {format(new Date(rental.endDate), "dd MMM yyyy")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <CreditCard className="h-5 w-5 text-orange-500" />
                  Payment Summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Total Amount</span>
                    <span className="text-xl font-bold text-slate-900">
                      ৳{rental.totalAmount}
                    </span>
                  </div>
                </div>

                {rental.status === "CONFIRMED" && (
                  <button
                    disabled={payMutation.isPending}
                    onClick={() => payMutation.mutate()}
                    className="mt-6 w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
                  >
                    {payMutation.isPending ? "Processing..." : "Pay Now"}
                  </button>
                )}

                {rental.status === "COMPLETED" && (
                  <div className="mt-6 rounded-xl bg-green-50 p-3 text-center text-sm font-medium text-green-700">
                    Payment Completed
                  </div>
                )}

                {rental.status === "PLACED" && (
                  <div className="mt-6 rounded-xl bg-blue-50 p-3 text-center text-sm font-medium text-blue-700">
                    Awaiting Provider Confirmation
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}