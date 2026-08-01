import {
  Package,
  ClipboardList,
  DollarSign,
  Activity,
} from "lucide-react";

import ProviderStatsCard from "@/components/dashboard/ProviderStatsCard";


const stats = [
  {
    title: "Total Gear",
    value: "24",
    description: "Listed equipment",
    icon: Package,
  },
  {
    title: "Rental Requests",
    value: "12",
    description: "Waiting for approval",
    icon: ClipboardList,
  },
  {
    title: "Total Earnings",
    value: "$2,450",
    description: "This month revenue",
    icon: DollarSign,
  },
  {
    title: "Active Rentals",
    value: "18",
    description: "Currently rented",
    icon: Activity,
  },
];



export default function ProviderDashboardPage() {


  return (

    <div
      className="
        space-y-8
      "
    >


      {/* Header */}

      <section>

        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Provider Dashboard
        </h1>


        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Manage your equipment, rentals and earnings.
        </p>


      </section>





      {/* Stats */}

      <section
        className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {
          stats.map((item)=>(
            
            <ProviderStatsCard
              key={item.title}
              title={item.title}
              value={item.value}
              description={item.description}
              icon={item.icon}
            />

          ))
        }

      </section>





      {/* Placeholder */}

      <section
        className="
          rounded-2xl
          bg-white
          p-8
          shadow-sm
        "
      >

        <h2
          className="
            text-xl
            font-semibold
            text-slate-900
          "
        >
          My Gear Overview
        </h2>


        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          Your equipment management section will appear here.
        </p>


      </section>



    </div>

  );
}