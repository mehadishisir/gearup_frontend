import {
  TrendingUp,
  BarChart3,
  Activity,
} from "lucide-react";


const metrics = [
  {
    title: "Revenue Growth",
    value: "+18.4%",
    description: "Compared to last month",
    icon: TrendingUp,
  },
  {
    title: "Rental Performance",
    value: "86%",
    description: "Successful rental completion",
    icon: BarChart3,
  },
  {
    title: "Platform Activity",
    value: "High",
    description: "Customer engagement level",
    icon: Activity,
  },
];


export default function AnalyticsOverview() {

  return (
    <section
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-sm
      "
    >

      <div className="mb-6">

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
            mt-1
            text-sm
            text-slate-500
          "
        >
          Track your GearUp marketplace performance.
        </p>

      </div>



      <div
        className="
          grid
          gap-6
          md:grid-cols-3
        "
      >

        {metrics.map((item) => {

          const Icon = item.icon;


          return (

            <div
              key={item.title}
              className="
                rounded-xl
                bg-slate-50
                p-5
                transition
                hover:bg-orange-50
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-orange-100
                "
              >

                <Icon
                  className="
                    h-5
                    w-5
                    text-orange-500
                  "
                />

              </div>


              <h3
                className="
                  mt-4
                  text-sm
                  text-slate-500
                "
              >
                {item.title}
              </h3>


              <p
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-slate-900
                "
              >
                {item.value}
              </p>


              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                {item.description}
              </p>


            </div>

          );

        })}

      </div>


    </section>
  );
}