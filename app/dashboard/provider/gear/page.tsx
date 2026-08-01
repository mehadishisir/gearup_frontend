import Link from "next/link";
import { Plus } from "lucide-react";

import GearTable from "@/components/dashboard/provider/GearTable";


export default function ProviderGearPage() {


  return (

    <div
      className="
        space-y-8
      "
    >


      {/* Header */}

      <section
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
              text-slate-900
            "
          >
            My Gear
          </h1>


          <p
            className="
              mt-2
              text-slate-500
            "
          >
            Manage your listed sports and outdoor equipment.
          </p>


        </div>




        <Link
          href="/dashboard/provider/add-gear"
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-orange-500
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-orange-600
          "
        >

          <Plus className="h-5 w-5" />

          Add Gear

        </Link>


      </section>





      

      <GearTable />


    </div>

  );
}