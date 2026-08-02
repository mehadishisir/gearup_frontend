"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  ArrowLeft,
  CalendarIcon,
  MapPin,
  Star,
  User,
  Loader2,
} from "lucide-react";
import { apiFetch } from "@/lib/api-client";
import { useAuth } from "@/providers/AuthProvider";
import { format, differenceInCalendarDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { createRental } from "@/services/RentalService";
interface GearDetail {
  id: string;
  name: string;
  description: string;
  category: { name: string };
  brand?: string;
  price: string;
  images: string[];
  available: boolean;
  avgRating?: number;
  provider: {
    name: string;
    location?: string;
  };
}

export default function GearDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [range, setRange] = useState<DateRange | undefined>();

  const { data: gear, isLoading } = useQuery({
  queryKey: ["gear", id],
  queryFn: async () => {
    const res = await apiFetch<{ data: GearDetail }>(`/gear/${id}`);

    console.log("GEAR RESPONSE:", res);

    return res.data;
  },
});

 const rentMutation = useMutation({
  mutationFn: () => {
    if (!range?.from || !range?.to) {
      throw new Error("Please select rental dates");
    }

    return createRental({
      startDate: format(
        range.from,
        "yyyy-MM-dd"
      ),
      endDate: format(
        range.to,
        "yyyy-MM-dd"
      ),
      items: [
        {
          gearItemId: id,
          quantity: 1,
        },
      ],
    });
  },

  onSuccess: (res) => {
    toast.success("Rental created successfully");

    console.log(
      "RENTAL RESPONSE:",
      res
    );

    router.push("/dashboard/rentals");
  },

  onError: (err: Error) => {
    toast.error(err.message);
  },
});

  function handleRentNow() {
    if (!isAuthenticated) {
      toast.error("Please log in first");
      router.push(`/auth/login?next=/gear/${id}`);
      return;
    }

    if (!range?.from || !range?.to) {
      toast.error("Select a start and end date");
      return;
    }

    rentMutation.mutate();
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  if (!gear) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Gear not found.
      </div>
    );
  }

  const days =
    range?.from && range?.to
      ? differenceInCalendarDays(range.to, range.from) || 1
      : 0;

  const totalPrice = days * parseFloat(gear.price);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link
          href="/gear"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to browse
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-slate-100">
   <Image
  src={
    gear.images?.length
      ? gear.images[0]
      : "/images/hero.jpg"
  }
  alt={gear.name || "Gear image"}
  fill
  className="object-cover"
  unoptimized
/>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <Badge className="bg-orange-100 text-orange-700">
                {gear.category?.name}
              </Badge>

              <span
                className={`text-sm font-medium ${
                  gear.available
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {gear.available ? "Available" : "Out of Stock"}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              {gear.name}
            </h1>

            {gear.brand && (
              <p className="mt-2 text-slate-500">
                {gear.brand}
              </p>
            )}

            {gear.avgRating && (
              <div className="mt-4 flex items-center gap-1 text-amber-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-semibold text-slate-900">
                  {gear.avgRating}
                </span>
              </div>
            )}

            <p className="mt-6 text-lg text-slate-600">
              {gear.description}
            </p>

            <div className="mt-8">
              <p className="text-3xl font-bold text-slate-900">
                ${gear.price}
                <span className="text-lg font-normal text-slate-400">
                  {" "}
                  / day
                </span>
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                <User className="h-5 w-5 text-slate-600" />
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  {gear.provider?.name}
                </p>

                {gear.provider?.location && (
                  <p className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3 w-3" />
                    {gear.provider.location}
                  </p>
                )}
              </div>
            </div>

            <Card className="mt-8 border-0 shadow-sm">
  <CardContent className="p-4">
    <h3 className="mb-3 font-semibold text-slate-900">
      Select rental dates
    </h3>

    <Popover>
      <PopoverTrigger
        className="flex w-full items-center justify-start rounded-md border px-4 py-2 text-sm"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />

        {range?.from && range?.to
          ? `${format(range.from, "d MMM")} — ${format(
              range.to,
              "d MMM"
            )}`
          : "Pick a date range"}
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          disabled={{
            before: new Date(),
          }}
        />
      </PopoverContent>
    </Popover>

    {days > 0 && (
      <p className="mt-3 text-sm text-slate-600">
        {days} day{days > 1 ? "s" : ""} × ৳{gear.price} ={" "}
        <span className="font-semibold text-slate-900">
          ৳{totalPrice.toFixed(2)}
        </span>
      </p>
    )}
  </CardContent>
</Card>

            <div className="mt-8 flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
                onClick={handleRentNow}
                disabled={
                  !gear.available ||
                  rentMutation.isPending
                }
              >
                {rentMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Rent Now"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}