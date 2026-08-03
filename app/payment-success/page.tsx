"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/api-client";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
  sessionId ? "loading" : "error"
);

useEffect(() => {
  if (!sessionId) return;

  apiFetch("/payments/confirm", {
    method: "POST",
    body: JSON.stringify({ sessionId }),
  })
    .then(() => setStatus("success"))
    .catch(() => setStatus("error"));
}, [sessionId]);
 

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-14 w-14 animate-spin text-orange-500" />
            <h1 className="mt-4 text-xl font-semibold text-slate-900">Confirming payment...</h1>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
            <h1 className="mt-4 text-xl font-semibold text-slate-900">Payment successful</h1>
            <p className="mt-2 text-slate-500">Your rental has been confirmed and paid.</p>
            <Link
              href="/dashboard/rentals"
              className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-medium text-white hover:bg-orange-600"
            >
              View My Rentals
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto h-14 w-14 text-red-500" />
            <h1 className="mt-4 text-xl font-semibold text-slate-900">Something went wrong</h1>
            <p className="mt-2 text-slate-500">We could not confirm your payment.</p>
            <Link
              href="/dashboard/rentals"
              className="mt-6 inline-flex rounded-xl bg-slate-200 px-5 py-3 font-medium text-slate-700 hover:bg-slate-300"
            >
              Back to Rentals
            </Link>
          </>
        )}
      </div>
    </div>
  );
}