"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getRentalById } from "@/services/RentalService";
import { format } from "date-fns";
import Image from "next/image";


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


        <h1 className="text-3xl font-bold">
          Rental Details
        </h1>



        <div className="mt-6 rounded-xl bg-white p-6 shadow">


          <div className="flex justify-between">


            <h2 className="text-xl font-semibold">
              Order Information
            </h2>


            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              {rental.status}
            </span>


          </div>



          <div className="mt-4 space-y-2">


            <p>
              Start Date:
              {" "}
              {format(
                new Date(rental.startDate),
                "dd MMM yyyy"
              )}
            </p>


            <p>
              End Date:
              {" "}
              {format(
                new Date(rental.endDate),
                "dd MMM yyyy"
              )}
            </p>


            <p>
              Total:
              {" "}
              ৳{rental.totalAmount}
            </p>


          </div>


        </div>



        <div className="mt-6 rounded-xl bg-white p-6 shadow">


          <h2 className="text-xl font-semibold">
            Gear Items
          </h2>


          <div className="mt-4 space-y-4">


          {rental.items?.map((item)=>(


            <div
              key={item.id}
              className="flex gap-4 rounded-lg border p-4"
            >


              <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-slate-100">


                <Image
                  src={
                    item.gearItem.images?.[0] ||
                    "/images/hero.jpg"
                  }
                  alt={
                    item.gearItem.name ||
                    "Gear image"
                  }
                  fill
                  className="object-cover"
                  unoptimized
                />


              </div>



              <div>


                <h3 className="font-semibold">
                  {item.gearItem.name}
                </h3>


                <p className="text-sm text-slate-500">
                  {item.gearItem.brand}
                </p>


                <p>
                  Quantity:
                  {" "}
                  {item.quantity}
                </p>


              </div>


            </div>


          ))}


          </div>


        </div>



      </div>


    </div>

  );

}