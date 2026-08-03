"use client";

import { Suspense } from "react";
import Link from "next/link";
import { XCircle } from "lucide-react";

function PaymentCancelContent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Payment Cancelled</h1>
        <p className="mt-3 text-slate-500">You can retry the payment from your rentals page.</p>
        <Link
          href="/dashboard/rentals"
          className="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Back to Rentals
        </Link>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-slate-500">Loading...</p>
        </div>
      }
    >
      <PaymentCancelContent />
    </Suspense>
  );
}