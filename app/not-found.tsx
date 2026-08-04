import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <Compass className="h-16 w-16 text-orange-400" />

      <h1 className="mt-6 text-6xl font-bold text-slate-900">404</h1>

      <p className="mt-3 text-lg font-medium text-slate-700">
        This page couldn&apos;t be found
      </p>

      <p className="mt-2 text-sm text-slate-500">
        The gear you&apos;re looking for might have already been rented out.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
      >
        Back to Home
      </Link>
    </div>
  );
}