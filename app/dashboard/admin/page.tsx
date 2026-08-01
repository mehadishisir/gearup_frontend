import AnalyticsOverview from "@/components/dashboard/AnalyticsOverview";
import RecentRentalsTable from "@/components/dashboard/RecentRentalsTable";
import StatsCard from "@/components/dashboard/StatusCard";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";



const stats = [
  {
    title: "Total Users",
    value: "2,540",
    description: "Active platform users",
    icon: Users,
  },

  {
    title: "Total Gear",
    value: "860",
    description: "Available equipment",
    icon: Package,
  },

  {
    title: "Total Rentals",
    value: "1,240",
    description: "Completed rentals",
    icon: ShoppingCart,
  },

  {
    title: "Revenue",
    value: "$24.5K",
    description: "Monthly revenue",
    icon: TrendingUp,
  },
];



export default function AdminDashboardPage() {

  return (
    <div className="space-y-8">


      {/* Header */}

      <section>

        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Admin Dashboard
        </h1>


        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Manage GearUp marketplace performance and operations.
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

        {stats.map((item) => (

          <StatsCard
            key={item.title}
            title={item.title}
            value={item.value}
            description={item.description}
            icon={item.icon}
          />

        ))}

      </section>


      <RecentRentalsTable />

      <AnalyticsOverview />

      {/* Analytics Placeholder */}

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
          Analytics Overview
        </h2>


        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Revenue charts and rental insights will appear here.
        </p>


      </section>


    </div>
  );
}