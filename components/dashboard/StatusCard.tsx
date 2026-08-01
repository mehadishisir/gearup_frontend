import { LucideIcon } from "lucide-react";


interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}


export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
}: StatsCardProps) {

  return (
    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-orange-50
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


      <div className="mt-5">

        <p className="text-sm text-slate-500">
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


        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>

      </div>


    </div>
  );
}