"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api-client";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // ✅ sessionId থাকলে loading, না থাকলে error — effect ছাড়াই determine
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    sessionId ? "loading" : "error"
  );
  const [message, setMessage] = useState(
    sessionId ? "Confirming your payment..." : "Missing session ID."
  );

  useEffect(() => {
    // sessionId না থাকলে effect-এ কিছুই করব না
    if (!sessionId) return;

    let cancelled = false;

    (async () => {
      try {
        await apiFetch("/payments/confirm", {
          method: "POST",
          body: JSON.stringify({ sessionId }),
        });

        if (!cancelled) {
          setStatus("success");
          setMessage("Your rental order has been confirmed.");
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setMessage(
            err instanceof Error
              ? err.message
              : "Payment confirmed, but we couldn't update your order."
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-16 w-16 animate-spin text-orange-500" />
            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Confirming Payment
            </h1>
            <p className="mt-3 text-slate-500">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Payment Successful
            </h1>
            <p className="mt-3 text-slate-500">{message}</p>
            {sessionId && (
              <p className="mt-2 text-xs text-slate-400 break-all">
                Session: {sessionId}
              </p>
            )}
            <Link
              href="/dashboard/customer/rentals"
              className="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              View My Rentals
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Something Went Wrong
            </h1>
            <p className="mt-3 text-slate-500">{message}</p>
            <Link
              href="/dashboard/customer/payments"
              className="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Check Payment History
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-slate-500">Loading...</p>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}