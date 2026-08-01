import { LucideIcon } from "lucide-react";


interface ProviderStatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}


export default function ProviderStatsCard({
  title,
  value,
  description,
  icon: Icon,
}: ProviderStatsCardProps) {


  return (

    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            {title}
          </p>


          <h3
            className="
              mt-2
              text-3xl
              font-bold
              text-slate-900
            "
          >
            {value}
          </h3>


          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            {description}
          </p>


        </div>


        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-orange-100
          "
        >

          <Icon
            className="
              h-6
              w-6
              text-orange-500
            "
          />

        </div>


      </div>


    </div>

  );
}