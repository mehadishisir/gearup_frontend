"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { apiFetch } from "@/lib/api-client";

interface Gear {
  id: string;
  title: string;
  brand?: string;
  pricePerDay: number;
  images: string[];
  isAvailable: boolean;
  category: {
    name: string;
  };
}

const categories = [
  "All",
  "Camping",
  "Cycling",
  "Photography",
  "Hiking",
  "Water Sports",
];

export default function GearPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const {
    data: gearList = [],
    isLoading,
  } = useQuery({
    queryKey: ["gear"],
    queryFn: async () => {
      const res = await apiFetch<{ data: Gear[] }>("/gear");
      return res.data;
    },
  });

  const filtered = gearList.filter((gear) => {
    const matchesSearch =
      gear.title.toLowerCase().includes(search.toLowerCase()) ||
      gear.brand?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      gear.category?.name === activeCategory;

    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Browse Gear
          </h1>

          <p className="mt-2 text-slate-500">
            Find the perfect equipment for your adventure
          </p>
        </div>


        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              placeholder="Search gear or brand..."
              className="h-11 rounded-xl bg-white pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>


          <div className="flex gap-2 overflow-x-auto pb-2">

            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={
                  activeCategory === category
                    ? "default"
                    : "outline"
                }
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : ""
                }
              >
                {category}
              </Button>
            ))}

          </div>

        </div>


        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {filtered.map((gear) => (

            <Link
              href={`/gear/${gear.id}`}
              key={gear.id}
            >

              <Card className="group overflow-hidden border-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">

                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">

                  <Image
                    src={
                      gear.images?.[0] ||
                      "/placeholder-gear.jpg"
                    }
                    alt={gear.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                </div>


                <CardContent className="p-5">

                  <div className="mb-3 flex items-center justify-between">

                    <Badge className="bg-orange-100 text-orange-700">
                      {gear.category?.name}
                    </Badge>


                    <span
                      className={`text-xs font-medium ${
                        gear.isAvailable
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {gear.isAvailable
                        ? "Available"
                        : "Rented"}
                    </span>

                  </div>


                  <h3 className="font-semibold text-slate-900">
                    {gear.title}
                  </h3>


                  <p className="mt-1 text-sm text-slate-500">
                    {gear.brand}
                  </p>


                  <p className="mt-3 text-xl font-bold text-slate-900">
                    ৳{gear.pricePerDay}

                    <span className="ml-1 text-sm font-normal text-slate-400">
                      / day
                    </span>
                  </p>

                </CardContent>

              </Card>

            </Link>

          ))}

        </div>


        {filtered.length === 0 && (

          <div className="py-20 text-center">

            <SlidersHorizontal className="mx-auto h-12 w-12 text-slate-300" />

            <p className="mt-4 text-lg font-medium text-slate-900">
              No gear found
            </p>

            <p className="text-slate-500">
              Try adjusting your search or filters
            </p>

          </div>

        )}

      </div>
    </div>
  );
}