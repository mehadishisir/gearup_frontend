"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, clearToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

const DASHBOARD_PATH: Record<string, string> = {
  CUSTOMER: "/dashboard/customer",
  PROVIDER: "/dashboard/provider",
  ADMIN: "/dashboard/admin",
};

export function Navbar() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const router = useRouter();

  useEffect(() => setUser(getCurrentUser()), []);

  return (
    <header className="border-b border-line bg-canvas sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl text-pine">
          GEAR<span className="text-blaze">UP</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link href="/gear">Browse Gear</Link>
          {user && <Link href={DASHBOARD_PATH[user.role]}>Dashboard</Link>}
        </nav>
        {user ? (
          <button
            onClick={() => { clearToken(); setUser(null); router.push("/auth/login"); }}
            className="text-sm text-ink/70"
          >
            Log out
          </button>
        ) : (
          <div className="flex gap-3">
            <Link href="/auth/login" className="text-sm">Log in</Link>
            <Link href="/auth/register" className="bg-pine text-canvas text-sm px-4 py-2 rounded-sm">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}