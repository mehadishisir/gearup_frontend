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
  name: string;
  brand: string;
  price: string;
  images: string[];
  available: boolean;

  category?: {
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

      const res = await apiFetch<{
        data: Gear[];
      }>("/gear");

      return res.data;

    },
  });



  const filtered = gearList.filter((gear) => {


    const matchesSearch =
      gear.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      gear.brand
        ?.toLowerCase()
        .includes(search.toLowerCase());



    const matchesCategory =
      activeCategory === "All" ||

      gear.category?.name === activeCategory;



    return matchesSearch && matchesCategory;

  });



  if(isLoading){

    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading gear...
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

            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />


            <Input

              placeholder="Search gear or brand..."

              className="h-11 rounded-xl bg-white pl-10"

              value={search}

              onChange={(e)=>setSearch(e.target.value)}

            />

          </div>




          <div className="flex gap-2 overflow-x-auto">

            {
              categories.map((cat)=>(

                <Button

                  key={cat}

                  size="sm"

                  variant={
                    activeCategory===cat
                    ? "default"
                    : "outline"
                  }


                  onClick={()=>
                    setActiveCategory(cat)
                  }


                  className={
                    activeCategory===cat
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    :""
                  }

                >

                  {cat}

                </Button>

              ))
            }

          </div>


        </div>






        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">


          {
            filtered.map((gear)=>(


              <Link

                href={`/gear/${gear.id}`}

                key={gear.id}

              >


                <Card className="group overflow-hidden border-0 shadow-sm transition hover:shadow-xl">


                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">


                    <Image

                      src={
                        gear.images?.[0]
                        ||
                        "/placeholder-gear.jpg"
                      }


                      alt={gear.name}


                      fill


                      className="object-cover transition group-hover:scale-105"


                      unoptimized

                    />


                  </div>





                  <CardContent className="p-5">


                    <div className="mb-3 flex justify-between">


                      <Badge>

                        {gear.category?.name}

                      </Badge>



                      <span

                        className={
                          gear.available
                          ?
                          "text-xs text-green-600"
                          :
                          "text-xs text-red-500"
                        }

                      >

                        {
                          gear.available
                          ?
                          "Available"
                          :
                          "Rented"
                        }


                      </span>


                    </div>




                    <h3 className="font-semibold">

                      {gear.name}

                    </h3>



                    <p className="text-sm text-slate-500">

                      {gear.brand}

                    </p>




                    <p className="mt-3 text-xl font-bold">

                      ৳{gear.price}

                      <span className="text-sm font-normal text-slate-400">

                        / day

                      </span>

                    </p>



                  </CardContent>


                </Card>


              </Link>


            ))
          }


        </div>






        {
          filtered.length===0 &&

          <div className="py-20 text-center">


            <SlidersHorizontal
              className="mx-auto h-12 w-12 text-slate-300"
            />


            <p className="mt-4 text-lg font-medium">

              No gear found

            </p>


          </div>

        }



      </div>


    </div>

  );

}