"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // ← ADD THIS
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
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

import { registerSchema, RegisterFormData } from "@/schemas/register.schema";
// import { registerUserAction } from "@/actions/auth/register";
import { watch } from "fs/promises";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

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

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "CUSTOMER",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);

    try {
      const result = await registerUserAction(data);

      if (result.success) {
        toast.success(result.message || "Account created successfully!");
        reset();
        setTimeout(() => {
          router.push("/auth/login");
        }, 800);
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* ─── Left Panel ─────────────────────────────── */}
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
          {/* logo */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Link href="/" className="flex items-center gap-3">
             <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
  <Image
    src="/logo-new.png"
    alt="GearUp Logo"
    width={140}
    height={40}
    className="h-10 w-auto"
    priority
  />
</div>
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.h2
              variants={itemVariants}
              className="mb-8 text-3xl font-bold leading-tight text-white"
            >
              Start Your Next
              <br />
              <span className="text-orange-200">Adventure Today</span>
            </motion.h2>

            <FeatureItem
              icon={ShieldCheck}
              title="Verified Gear"
              desc="Every item is inspected and certified for safety"
            />
            <FeatureItem
              icon={Clock}
              title="Instant Booking"
              desc="Book in seconds, pick up within hours"
            />
            <FeatureItem
              icon={MapPin}
              title="Nationwide Coverage"
              desc="1000+ gear items across Bangladesh"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-6"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-500 bg-slate-800 text-xs font-medium text-white"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/80">
              <span className="font-semibold text-white">2,500+</span> adventurers joined
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── Right Panel (Form) ─────────────────────── */}
      <div className="flex w-full items-center justify-center bg-[#F8FAFC] p-4 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <Image
              src="/logo-new.png"
              alt="GearUp Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>

          <Card className="border-0 shadow-2xl shadow-slate-200/50">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-slate-900">
                Create an account
              </CardTitle>
              <CardDescription className="text-slate-500">
                Enter your details to get started with GearUp
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="h-11 rounded-xl border-slate-200 bg-white pl-10 text-sm focus:border-orange-500 focus:ring-orange-500/20"
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs font-medium text-red-500">{errors.name.message}</p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Address
                  </Label>
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
                  {errors.email && (
                    <p className="text-xs font-medium text-red-500">{errors.email.message}</p>
                  )}
                </motion.div>

                {/* Phone */}
                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="01712345678"
                      className="h-11 rounded-xl border-slate-200 bg-white pl-10 text-sm focus:border-orange-500 focus:ring-orange-500/20"
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs font-medium text-red-500">{errors.phone.message}</p>
                  )}
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                    Password
                  </Label>
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
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs font-medium text-red-500">{errors.password.message}</p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "8+ chars", regex: /.{8,}/ },
                      { label: "Uppercase", regex: /[A-Z]/ },
                      { label: "Lowercase", regex: /[a-z]/ },
                      { label: "Number", regex: /[0-9]/ },
                      { label: "Special", regex: /[^A-Za-z0-9]/ },
                    ].map((req) => (
                      <span
                        key={req.label}
                        className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {req.label}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Role */}
                <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">I want to</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                        watch("role") === "CUSTOMER"
                          ? "border-orange-500 bg-orange-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <input type="radio" value="CUSTOMER" className="sr-only" {...register("role")} />
                      <User className="h-6 w-6 text-orange-500" />
                      <span className="text-sm font-semibold text-slate-900">Rent Gear</span>
                      <span className="text-xs text-slate-500">I want to rent equipment</span>
                    </label>

                    <label
                      className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                        watch("role") === "PROVIDER"
                          ? "border-orange-500 bg-orange-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <input type="radio" value="PROVIDER" className="sr-only" {...register("role")} />
                      <MapPin className="h-6 w-6 text-orange-500" />
                      <span className="text-sm font-semibold text-slate-900">List Gear</span>
                      <span className="text-xs text-slate-500">I want to rent out my gear</span>
                    </label>
                  </div>
                  {errors.role && (
                    <p className="text-xs font-medium text-red-500">{errors.role.message}</p>
                  )}
                </motion.div>

                {/* Submit */}
                <motion.div variants={itemVariants} initial="hidden" animate="visible">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-11 w-full rounded-xl bg-orange-500 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-orange-500/40 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.p
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="mt-6 text-center text-sm text-slate-500"
              >
                Already have an account?{" "}
                <Link href="/auth/login" className="font-semibold text-orange-600 hover:text-orange-700">
                  Sign in
                </Link>
              </motion.p>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-xs text-slate-400">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}