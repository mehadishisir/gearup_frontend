"use client";

import {
  Bell,
  ChevronDown,
  LogOut,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/providers/AuthProvider";
import { logoutUser } from "@/services/AuthService";


export default function DashboardHeader() {

  const { user } = useAuth();
  const router = useRouter();


  const handleLogout = async () => {

    try {

      await logoutUser();

      toast.success(
        "Logged out successfully"
      );

      router.push("/auth/login");
      router.refresh();


    } catch {

      toast.error(
        "Logout failed"
      );

    }

  };


  return (
    <header
      className="
        sticky
        top-0
        z-20
        flex
        h-20
        items-center
        justify-between
        border-b
        border-slate-100
        bg-white/80
        px-6
        backdrop-blur
      "
    >

      {/* Left */}

      <div>

        <h2
          className="
            text-xl
            font-semibold
            text-slate-900
          "
        >
          Welcome back, {user?.name || "User"}
        </h2>


        <p
          className="
            text-sm
            text-slate-500
          "
        >
          Manage your GearUp experience
        </p>

      </div>



      {/* Right */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >


        {/* Notification */}

        <button
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-slate-500
            transition
            hover:bg-slate-50
          "
        >

          <Bell className="h-5 w-5" />


          <span
            className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-orange-500
            "
          />

        </button>




        {/* User */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-3
            py-2
            transition
            hover:bg-slate-50
          "
        >

          <Avatar>

            <AvatarFallback
              className="
                bg-orange-100
                text-orange-600
                font-semibold
              "
            >
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>

          </Avatar>



          <div className="hidden sm:block">

            <p
              className="
                text-sm
                font-semibold
                text-slate-900
              "
            >
              {user?.name || "User"}
            </p>


            <p
              className="
                text-xs
                text-slate-500
              "
            >
              {user?.role || "CUSTOMER"}
            </p>

          </div>



          <ChevronDown
            className="
              h-4
              w-4
              text-slate-400
            "
          />


          {/* Logout */}

          <button
            onClick={handleLogout}
            className="
              ml-2
              flex
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              text-sm
              font-medium
              text-red-500
              transition
              hover:bg-red-50
            "
          >

            <LogOut
              className="h-4 w-4"
            />

            <span className="hidden md:block">
              Logout
            </span>

          </button>


        </div>


      </div>


    </header>
  );
}