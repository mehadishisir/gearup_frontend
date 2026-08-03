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
    href: "/dashboard/provider/orders",
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
        hidden
        h-screen
        w-72
        shrink-0
        border-r
        border-slate-100
        bg-white
        px-6
        py-8
        lg:block
        sticky
        top-0
      "
    >


      {/* Brand */}

      <Link
        href="/"
        className="
          flex
          items-center
          gap-2
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-orange-500
            text-lg
            font-bold
            text-white
          "
        >
          G
        </div>


        <span
          className="
            text-2xl
            font-bold
            text-slate-900
          "
        >
          GearUp
        </span>


      </Link>




      {/* User Role */}

      <div
        className="
          mt-8
          rounded-2xl
          bg-slate-50
          p-4
        "
      >

        <p className="text-xs text-slate-500">
          Logged in as
        </p>


        <p
          className="
            mt-1
            font-semibold
            text-slate-900
          "
        >
          {user?.role || "USER"}
        </p>

      </div>





      {/* Navigation */}

      <nav
        className="
          mt-8
          space-y-2
        "
      >

        {menuItems.map((item)=>{

          const Icon = item.icon;


          const active =
            pathname === item.href;


          return (

            <Link
              key={item.href}
              href={item.href}
              className={`
                group
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all

                ${
                  active
                  ? "bg-orange-50 text-orange-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >


              <Icon
                className={`
                  h-5
                  w-5

                  ${
                    active
                    ? "text-orange-500"
                    : "text-slate-400 group-hover:text-slate-600"
                  }
                `}
              />


              {item.title}


            </Link>

          );

        })}


      </nav>


    </aside>

  );
}