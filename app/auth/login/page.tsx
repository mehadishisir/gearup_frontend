"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { loginSchema, LoginFormData } from "@/schemas/login.schema";
import { loginUser, getCurrentUser } from "@/services/AuthService";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const leftPanelVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function FeatureItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-0.5 text-sm text-white/70">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    try {
      const result = await loginUser(data);

      if (result.success) {
  toast.success(result.message || "Welcome back!");

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    toast.error("Failed to load user information.");
    return;
  }

  const roleRoutes: Record<string, string> = {
    CUSTOMER: "/dashboard/customer",
    PROVIDER: "/dashboard/provider",
    ADMIN: "/dashboard/admin",
  };

  router.push(roleRoutes[currentUser.role] || "/");
} else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Panel */}
      <motion.div
        variants={leftPanelVariants}
        initial="hidden"
        animate="visible"
        className="relative hidden w-1/2 overflow-hidden lg:block"
      >
        <div className="absolute inset-0 bg-linear-to-br from-orange-500 via-orange-600 to-slate-900" />
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative flex h-full flex-col justify-between p-12">
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                <Image
                  src="/logo-new.png"
                  alt="GearUp Logo"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                  priority
                  unoptimized
                />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="mb-8 text-3xl font-bold leading-tight text-white">
              Welcome Back,<br />
              <span className="text-orange-200">Adventurer</span>
            </h2>

            <FeatureItem icon={ShieldCheck} title="Secure Access" desc="Your data is protected with enterprise-grade security" />
            <FeatureItem icon={Clock} title="Quick Booking" desc="Resume where you left off in seconds" />
            <FeatureItem icon={MapPin} title="Track Orders" desc="Manage all your rentals in one place" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-6"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-500 bg-slate-800 text-xs font-medium text-white">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/80">
              <span className="font-semibold text-white">2,500+</span> active members
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="flex w-full items-center justify-center bg-[#F8FAFC] p-4 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <Image
              src="/logo-new.png"
              alt="GearUp Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
              unoptimized
            />
          </div>

          <Card className="border-0 shadow-2xl shadow-slate-200/50">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-slate-900">Sign in to your account</CardTitle>
              <CardDescription className="text-slate-500">Enter your credentials to access your dashboard</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="h-11 rounded-xl border-slate-200 bg-white pl-10 text-sm focus:border-orange-500 focus:ring-orange-500/20"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && <p className="text-xs font-medium text-red-500">{errors.email.message}</p>}
                </motion.div>

                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                    <Link href="/auth/forgot-password" className="text-xs font-medium text-orange-600 hover:text-orange-700">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-11 rounded-xl border-slate-200 bg-white pl-10 pr-10 text-sm focus:border-orange-500 focus:ring-orange-500/20"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs font-medium text-red-500">{errors.password.message}</p>}
                </motion.div>

                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                  <Label htmlFor="remember" className="text-sm font-normal text-slate-600">Remember me for 30 days</Label>
                </motion.div>

                <motion.div variants={itemVariants} initial="hidden" animate="visible">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-11 w-full rounded-xl bg-orange-500 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-orange-500/40 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in...</>
                    ) : (
                      <>Sign In<ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.p variants={itemVariants} initial="hidden" animate="visible" className="mt-6 text-center text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="font-semibold text-orange-600 hover:text-orange-700">Create one</Link>
              </motion.p>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-xs text-slate-400">Protected by industry-standard encryption</p>
        </motion.div>
      </div>
    </div>
  );
}