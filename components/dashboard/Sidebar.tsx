"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ClipboardList,
  CreditCard,
  Users,
  BarChart3,
  UserCircle,
} from "lucide-react";

import { useAuth } from "@/providers/AuthProvider";

const customerMenu = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "My Rentals", href: "/dashboard/rentals", icon: Package },
  { title: "Payment History", href: "/dashboard/payments", icon: CreditCard },
  { title: "Profile", href: "/dashboard/profile", icon: UserCircle },
];

const providerMenu = [
  { title: "Dashboard", href: "/dashboard/provider", icon: LayoutDashboard },
  { title: "My Gear", href: "/dashboard/provider/gear", icon: Package },
  { title: "Add Gear", href: "/dashboard/provider/add-gear", icon: PlusCircle },
  { title: "Rental Requests", href: "/dashboard/provider/orders", icon: ClipboardList },
  { title: "Profile", href: "/dashboard/provider/profile", icon: UserCircle },
];

const adminMenu = [
  { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { title: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { title: "Manage Gear", href: "/dashboard/admin/gear", icon: Package },
  { title: "Manage Orders", href: "/dashboard/admin/orders", icon: ClipboardList },
  { title: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems =
    user?.role === "ADMIN"
      ? adminMenu
      : user?.role === "PROVIDER"
      ? providerMenu
      : customerMenu;

  const activeClass = "bg-orange-50 text-orange-600";
  const inactiveClass = "text-slate-600 hover:bg-slate-50 hover:text-slate-900";
  const activeIconClass = "text-orange-500";
  const inactiveIconClass = "text-slate-400";

  return (
    <>
      {/* Mobile Tab Bar — sits directly below the navbar */}
      <div className="sticky top-16 z-40 flex gap-1 overflow-x-auto border-b border-slate-100 bg-white px-3 py-2 lg:hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                active ? activeClass : inactiveClass
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? activeIconClass : inactiveIconClass}`} />
              {item.title}
            </Link>
          );
        })}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-72 shrink-0 border-r border-slate-100 bg-white px-6 py-8 lg:block sticky top-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-lg font-bold text-white">
            G
          </div>
          <span className="text-2xl font-bold text-slate-900">GearUp</span>
        </Link>

        <div className="mt-8 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">Logged in as</p>
          <p className="mt-1 font-semibold text-slate-900">{user?.role || "USER"}</p>
        </div>

        <nav className="mt-8 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active ? activeClass : inactiveClass
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${active ? activeIconClass : inactiveIconClass}`}
                />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}