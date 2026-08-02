"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Payment Successful</h1>
        <p className="mt-3 text-slate-500">Your rental order has been confirmed.</p>
        {sessionId && (
          <p className="mt-2 text-xs text-slate-400">Session: {sessionId}</p>
        )}
        <Link
          href="/dashboard/rentals"
          className="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          View My Rentals
        </Link>
      </div>
    </div>
  );
}