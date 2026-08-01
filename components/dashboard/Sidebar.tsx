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
  {
    title: "Dashboard",
    href: "/dashboard/customer",
    icon: LayoutDashboard,
  },
  {
    title: "My Rentals",
    href: "/dashboard/customer/rentals",
    icon: Package,
  },
  {
    title: "Payment History",
    href: "/dashboard/customer/payments",
    icon: CreditCard,
  },
  {
    title: "Profile",
    href: "/dashboard/customer/profile",
    icon: UserCircle,
  },
];


const providerMenu = [
  {
    title: "Dashboard",
    href: "/dashboard/provider",
    icon: LayoutDashboard,
  },
  {
    title: "My Gear",
    href: "/dashboard/provider/gear",
    icon: Package,
  },
  {
    title: "Add Gear",
    href: "/dashboard/provider/add-gear",
    icon: PlusCircle,
  },
  {
    title: "Rental Requests",
    href: "/dashboard/provider/requests",
    icon: ClipboardList,
  },
  {
    title: "Profile",
    href: "/dashboard/provider/profile",
    icon: UserCircle,
  },
];


const adminMenu = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Manage Gear",
    href: "/dashboard/admin/gear",
    icon: Package,
  },
  {
    title: "Manage Orders",
    href: "/dashboard/admin/orders",
    icon: ClipboardList,
  },
  {
    title: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: BarChart3,
  },
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


  return (
    <aside
      className="
        h-screen
        w-72
        bg-white
        shadow-sm
        px-6
        py-8
        sticky
        top-0
      "
    >

      {/* Logo */}
      <Link
        href="/"
        className="
          text-2xl
          font-bold
          text-orange-500
        "
      >
        GearUp
      </Link>


      {/* Navigation */}
      <nav className="mt-10 space-y-2">


        {menuItems.map((item) => {

          const Icon = item.icon;


          const active =
            pathname === item.href;


          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition

                ${
                  active
                    ? "bg-orange-50 text-orange-500"
                    : "text-slate-600 hover:bg-slate-50"
                }
              `}
            >

              <Icon
                size={20}
              />

              <span>
                {item.title}
              </span>


            </Link>
          );
        })}


      </nav>


    </aside>
  );
}