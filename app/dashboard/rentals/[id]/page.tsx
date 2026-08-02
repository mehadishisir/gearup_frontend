"use client";

import Link from "next/link";
import Image from "next/image";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getRentalById } from "@/services/RentalService";
import { format } from "date-fns";

import { ArrowLeft, CalendarDays, CreditCard, Package, User } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function RentalDetailsPage(){

  const {id}=useParams<{id:string}>();


  const {
    data,
    isLoading
  }=useQuery({

    queryKey:["rental",id],

    queryFn:()=>getRentalById(id),

  });



  if(isLoading){

    return(
      <div className="p-8">
        Loading rental details...
      </div>
    );

  }



  const rental=data?.data;



  if(!rental){

    return(
      <div className="p-8">
        Rental not found
      </div>
    );

  }



  return(

    <div className="min-h-screen bg-slate-50 p-8">


      <div className="mx-auto max-w-5xl">
<Link
  href="/dashboard/rentals"
  className="mb-6 inline-flex items-center gap-2 text-orange-600 hover:text-orange-700"
>
  <ArrowLeft className="h-4 w-4" />
  Back to Rentals
</Link>

        <div className="mb-8">
  <h1 className="text-3xl font-bold text-slate-900">
    Rental Details
  </h1>

  <p className="mt-2 text-slate-500">
    View complete information about your rental order.
  </p>
</div>



   <Card className="mt-6 border-0 shadow-sm">
  <CardContent className="p-6">

    <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-slate-900">
      <Package className="h-5 w-5 text-orange-500" />
      Gear Items
    </h2>

    <div className="space-y-4">
      {rental.items?.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-5 rounded-xl border border-slate-200 p-4"
        >
          <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-slate-100">
            <Image
              src={
                item.gearItem.images?.length
                  ? item.gearItem.images[0]
                  : "/images/hero.jpg"
              }
              alt={item.gearItem.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">
              {item.gearItem.name}
            </h3>

            <p className="text-sm text-slate-500">
              {item.gearItem.brand}
            </p>

            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <p>
                <span className="font-medium">Quantity:</span>{" "}
                {item.quantity}
              </p>

              <p>
                <span className="font-medium">Price:</span>{" "}
                ৳{item.priceAtBooking}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

  </CardContent>
</Card>


        



      </div>


    </div>

  );

}