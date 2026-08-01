"use client";

import {
  Bell,
  Menu,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  useAuth,
} from "@/providers/AuthProvider";


export default function DashboardHeader() {

  const {
    user,
  } = useAuth();


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
        bg-white
        px-5
        md:px-8
        shadow-sm
      "
    >

      {/* Left Side */}
      <div className="flex items-center gap-4">


        {/* Mobile Menu Button */}
        <button
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-slate-600
            hover:bg-slate-50
            lg:hidden
          "
        >
          <Menu size={22} />
        </button>



        <div>

          <h1
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            Welcome back
          </h1>


          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Manage your GearUp activities
          </p>

        </div>


      </div>



      {/* Right Side */}
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
            text-slate-600
            hover:bg-slate-50
          "
        >

          <Bell size={20}/>

        </button>




        {/* User */}
        <div
          className="
            hidden
            items-center
            gap-3
            sm:flex
          "
        >

          <Avatar>

            <AvatarFallback
              className="
                bg-orange-500
                text-white
              "
            >
              {
                user?.name
                  ?.charAt(0)
                  .toUpperCase()
              }
            </AvatarFallback>

          </Avatar>



          <div
            className="
              leading-tight
            "
          >

            <p
              className="
                text-sm
                font-medium
                text-slate-900
              "
            >
              {user?.name}
            </p>


            <p
              className="
                text-xs
                text-slate-500
              "
            >
              {user?.role}
            </p>


          </div>


        </div>


      </div>


    </header>
  );
}