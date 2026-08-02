"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMyRentals } from "@/services/RentalService";
import { format } from "date-fns";
import { ArrowRight, CalendarDays, CreditCard } from "lucide-react";


export default function RentalsPage() {

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["my-rentals"],
    queryFn: getMyRentals,
  });



  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Loading rentals...
      </div>
    );
  }



  return (

    <div className="min-h-screen bg-[#F8FAFC] p-8">

      <div className="mx-auto max-w-5xl">


        <div className="mb-8">

          <h1 className="text-3xl font-bold text-slate-900">
            My Rentals
          </h1>

          <p className="mt-2 text-slate-500">
            Manage and track your rental orders
          </p>

        </div>




        {!data?.data?.length && (

          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

            <p className="text-lg font-medium text-slate-900">
              No rentals found
            </p>

            <p className="mt-2 text-slate-500">
              Start renting gear for your next adventure
            </p>

          </div>

        )}





        <div className="space-y-5">


          {data?.data?.map((rental)=>(


            <Link
              key={rental.id}
              href={`/dashboard/rentals/${rental.id}`}
            >


              <div
                className="
                rounded-2xl 
                bg-white 
                p-6 
                shadow-sm 
                transition-all
                hover:-translate-y-1
                hover:shadow-lg
                cursor-pointer
                "
              >



                <div className="flex items-center justify-between">


                  <div>

                    <h2 className="text-lg font-semibold text-slate-900">
                      Rental Order
                    </h2>


                    <p className="mt-1 text-xs text-slate-400">
                      ID: {rental.id.slice(0,8)}...
                    </p>

                  </div>





                  <span
                    className={`
                    rounded-full 
                    px-3 
                    py-1 
                    text-xs 
                    font-semibold
                    
                    ${
                      rental.status === "PLACED"
                      ? "bg-blue-100 text-blue-700"
                      : rental.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-700"
                    }
                    `}
                  >
                    {rental.status}
                  </span>


                </div>






                <div className="mt-6 grid gap-4 sm:grid-cols-3">


                  <div className="rounded-xl bg-slate-50 p-4">

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                      <CalendarDays className="h-4 w-4"/>

                      Start

                    </div>


                    <p className="mt-1 font-medium text-slate-900">

                      {format(
                        new Date(rental.startDate),
                        "dd MMM yyyy"
                      )}

                    </p>


                  </div>






                  <div className="rounded-xl bg-slate-50 p-4">

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                      <CalendarDays className="h-4 w-4"/>

                      End

                    </div>


                    <p className="mt-1 font-medium text-slate-900">

                      {format(
                        new Date(rental.endDate),
                        "dd MMM yyyy"
                      )}

                    </p>


                  </div>







                  <div className="rounded-xl bg-slate-50 p-4">

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                      <CreditCard className="h-4 w-4"/>

                      Amount

                    </div>


                    <p className="mt-1 font-bold text-slate-900">

                      ৳{rental.totalAmount}

                    </p>


                  </div>



                </div>






                <div className="mt-5 flex items-center justify-end gap-2 text-sm font-medium text-orange-600">

                  View Details

                  <ArrowRight className="h-4 w-4"/>

                </div>



              </div>


            </Link>


          ))}


        </div>


      </div>


    </div>

  );
}