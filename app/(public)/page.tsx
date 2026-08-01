"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

const allGear = [
  { id: "1", name: "Trekking Tent", category: "Camping", brand: "North Face", price: 500, image: "/images/hero.jpg", available: true },
  { id: "2", name: "Mountain Bike", category: "Cycling", brand: "Trek", price: 300, image: "/images/hero.jpg", available: true },
  { id: "3", name: "DSLR Camera", category: "Photography", brand: "Canon", price: 800, image: "/images/hero.jpg", available: true },
  { id: "4", name: "Camping Chair", category: "Camping", brand: "Helinox", price: 200, image: "/images/hero.jpg", available: false },
  { id: "5", name: "Hiking Boots", category: "Hiking", brand: "Salomon", price: 150, image: "/images/hero.jpg", available: true },
  { id: "6", name: "Kayak", category: "Water Sports", brand: "Intex", price: 1200, image: "/images/hero.jpg", available: false },
];

const categories = ["All", "Camping", "Cycling", "Photography", "Hiking", "Water Sports"];

export default function GearPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = allGear.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || g.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Browse Gear</h1>
          <p className="mt-2 text-slate-500">Find the perfect equipment for your adventure</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search gear or brand..."
              className="h-11 rounded-xl border-slate-200 bg-white pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? "bg-orange-500 text-white hover:bg-orange-600" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((gear) => (
            <Link href={`/gear/${gear.id}`} key={gear.id}>
              <Card className="group overflow-hidden border-0 shadow-sm transition-all hover:shadow-lg">
                <div className="aspect-4/3 bg-slate-100 relative overflow-hidden">
                  <Image
                    src={gear.image}
                    alt={gear.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">{gear.category}</Badge>
                    <span className={`text-xs font-medium ${gear.available ? "text-emerald-600" : "text-red-500"}`}>
                      {gear.available ? "Available" : "Rented"}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900">{gear.name}</h3>
                  <p className="text-xs text-slate-500">{gear.brand}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">৳{gear.price} <span className="text-sm font-normal text-slate-400">/ day</span></p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <SlidersHorizontal className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 text-lg font-medium text-slate-900">No gear found</p>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}