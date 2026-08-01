"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";


export default function DashboardPage() {

  const router = useRouter();

  const { user, isLoading } = useAuth();


  useEffect(() => {

    if (isLoading) return;


    if (!user) {
      router.push("/auth/login");
      return;
    }


    const roleRoutes: Record<string, string> = {

      ADMIN: "/dashboard/admin",

      PROVIDER: "/dashboard/provider",

      CUSTOMER: "/dashboard/customer",

    };


    router.push(
      roleRoutes[user.role] || "/"
    );


  }, [
    user,
    isLoading,
    router,
  ]);



  return (

    <div className="flex min-h-[60vh] items-center justify-center">

      <p className="text-slate-500">
        Loading dashboard...
      </p>

    </div>

  );

}