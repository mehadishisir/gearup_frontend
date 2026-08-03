import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <XCircle className="mx-auto h-14 w-14 text-slate-400" />
        <h1 className="mt-4 text-xl font-semibold text-slate-900">Payment cancelled</h1>
        <p className="mt-2 text-slate-500">You can try paying again from your rentals page.</p>
        <Link
          href="/dashboard/rentals"
          className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 font-medium text-white hover:bg-orange-600"
        >
          Back to Rentals
        </Link>
      </div>
    </div>
  );
}