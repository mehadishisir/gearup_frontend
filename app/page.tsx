"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  ArrowRight,
  Tent,
  Bike,
  Camera,
  Mountain,
  Waves,
  Anchor,
  CalendarDays,
  ShieldCheck,
  Star,
  MapPin,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";
import HeroSection from "@/components/home/HeroSection";

interface Gear {
  id: string;
  name: string;
  brand?: string;
  price: string;
  images: string[];
  available: boolean;
  category: { name: string };
}

const categories = [
  { name: "Camping", icon: Tent, color: "bg-emerald-100 text-emerald-700" },
  { name: "Cycling", icon: Bike, color: "bg-blue-100 text-blue-700" },
  { name: "Photography", icon: Camera, color: "bg-purple-100 text-purple-700" },
  { name: "Hiking", icon: Mountain, color: "bg-amber-100 text-amber-700" },
  { name: "Water Sports", icon: Waves, color: "bg-cyan-100 text-cyan-700" },
  { name: "Climbing", icon: Anchor, color: "bg-rose-100 text-rose-700" },
];

const howItWorks = [
  {
    icon: Search,
    title: "Browse Gear",
    desc: "Explore 1000+ premium sports and outdoor equipment from trusted providers.",
  },
  {
    icon: CalendarDays,
    title: "Book Dates",
    desc: "Select your rental period and reserve instantly with real-time availability.",
  },
  {
    icon: MapPin,
    title: "Pick Up & Enjoy",
    desc: "Collect your gear and embark on your next adventure hassle-free.",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");

  const { data: gearList, isLoading } = useQuery({
    queryKey: ["featured-gear"],
    queryFn: async () => {
      const res = await apiFetch<{ data: Gear[] }>("/gear");
      return res.data.slice(0, 6);
    },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
    <HeroSection></HeroSection>

      {/* Stats */}
      <section className="border-b border-slate-100 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900">1000+</p>
            <p className="mt-1 text-sm text-slate-500">Gear Items</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900">500+</p>
            <p className="mt-1 text-sm text-slate-500">Happy Renters</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900">50+</p>
            <p className="mt-1 text-sm text-slate-500">Trusted Providers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900">4.9</p>
            <p className="mt-1 text-sm text-slate-500">Average Rating</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#F8FAFC] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Browse by Category</h2>
            <p className="mt-3 text-slate-500">Find the perfect gear for your adventure type</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  href={`/gear?category=${cat.name}`}
                  className="group flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${cat.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-4 font-semibold text-slate-900">{cat.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Gear */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Featured Gear</h2>
              <p className="mt-3 text-slate-500">Hand-picked equipment for your next trip</p>
            </div>
            <Link
              href="/gear"
              className="hidden items-center gap-1 text-sm font-semibold text-orange-600 transition hover:text-orange-700 sm:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-100" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gearList?.map((gear) => (
                  <Link key={gear.id} href={`/gear/${gear.id}`}>
                    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        <Image
                          src={gear.images?.[0] || "/placeholder-gear.jpg"}
                          alt={gear.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                      <div className="p-5">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                            {gear.category?.name}
                          </span>
                          <span
                            className={`text-xs font-medium ${
                              gear.available ? "text-emerald-600" : "text-red-500"
                            }`}
                          >
                            {gear.available ? "Available" : "Rented"}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-900">{gear.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{gear.brand}</p>
                        <p className="mt-3 text-xl font-bold text-slate-900">
                          ৳{gear.price}
                          <span className="ml-1 text-sm font-normal text-slate-400">/ day</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-center sm:hidden">
                <Link
                  href="/gear"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600"
                >
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#0F172A] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-3 text-slate-400">Rent premium gear in three simple steps</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="mt-6">
                    <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20 text-xs font-bold text-orange-400">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-slate-400">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 shrink-0 text-orange-500" />
              <div>
                <h3 className="font-semibold text-slate-900">Verified Providers</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Every provider is vetted to ensure quality gear and reliable service.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Star className="h-8 w-8 shrink-0 text-orange-500" />
              <div>
                <h3 className="font-semibold text-slate-900">Review System</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Read honest reviews from real renters before making a booking.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-8 w-8 shrink-0 text-orange-500" />
              <div>
                <h3 className="font-semibold text-slate-900">Nationwide Coverage</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Gear available across Bangladesh from local providers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-orange-500 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white">Ready for Your Next Adventure?</h2>
          <p className="mt-4 text-orange-100">
            Join thousands of adventurers renting premium gear at affordable prices.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/gear"
              className="inline-flex h-12 items-center rounded-xl bg-white px-8 font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Start Browsing
            </Link>
            <Link
              href="/auth/register?role=PROVIDER"
              className="inline-flex h-12 items-center rounded-xl border-2 border-white px-8 font-semibold text-white transition hover:bg-white/10"
            >
              List Your Gear
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}