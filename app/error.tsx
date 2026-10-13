"use client";
export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Something went wrong</h1>
        <p className="mt-2 text-slate-500">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-orange-500 px-6 py-2 text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}