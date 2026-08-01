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
    icon: Users,
  },
  {
    title: "Total Gear",
    value: "860",
    icon: Package,
  },
  {
    title: "Total Rentals",
    value: "1,240",
    icon: ShoppingCart,
  },
  {
    title: "Revenue",
    value: "$24.5K",
    icon: TrendingUp,
  },
];


export default function AdminDashboardPage() {

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Manage GearUp platform operations.
        </p>
      </div>


      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                rounded-2xl
                bg-white
                p-6
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">

                <Icon className="h-6 w-6 text-orange-500" />

              </div>


              <h2 className="mt-5 text-3xl font-bold text-slate-900">
                {item.value}
              </h2>


              <p className="mt-1 text-sm text-slate-500">
                {item.title}
              </p>

            </div>
          );

        })}

      </div>


    </div>
  );
}