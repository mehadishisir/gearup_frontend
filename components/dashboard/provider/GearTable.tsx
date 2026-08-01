"use client";

import {
  Edit,
  Trash2,
} from "lucide-react";


const gears = [
  {
    id:1,
    name:"Mountain Bike",
    category:"Cycling",
    price:"$20/day",
    status:"AVAILABLE",
  },
  {
    id:2,
    name:"Camping Tent",
    category:"Camping",
    price:"$15/day",
    status:"RENTED",
  },
];



export default function GearTable(){


  return (

    <div
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-sm
      "
    >

      <div
        className="
          mb-6
        "
      >

        <h2
          className="
            text-xl
            font-semibold
            text-slate-900
          "
        >
          My Gear
        </h2>


        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Manage your listed equipment.
        </p>


      </div>



      <div
        className="
          overflow-x-auto
        "
      >

        <table
          className="
            w-full
            text-sm
          "
        >

          <thead>

            <tr
              className="
                border-b
                text-left
                text-slate-500
              "
            >

              <th className="pb-4">
                Gear
              </th>

              <th className="pb-4">
                Category
              </th>

              <th className="pb-4">
                Price
              </th>

              <th className="pb-4">
                Status
              </th>

              <th className="pb-4">
                Action
              </th>

            </tr>

          </thead>



          <tbody>


          {
            gears.map((gear)=>(


              <tr
                key={gear.id}
                className="
                  border-b
                  hover:bg-slate-50
                "
              >


                <td className="py-4 font-medium">
                  {gear.name}
                </td>


                <td className="py-4 text-slate-600">
                  {gear.category}
                </td>


                <td className="py-4 text-slate-600">
                  {gear.price}
                </td>



                <td className="py-4">

                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium

                      ${
                        gear.status==="AVAILABLE"
                        ?"bg-green-100 text-green-600"
                        :"bg-orange-100 text-orange-600"
                      }
                    `}
                  >

                    {gear.status}

                  </span>


                </td>



                <td className="py-4">


                  <div
                    className="
                      flex
                      gap-2
                    "
                  >

                    <button
                      className="
                        rounded-lg
                        p-2
                        text-slate-500
                        hover:bg-slate-100
                      "
                    >

                      <Edit
                        className="h-4 w-4"
                      />

                    </button>



                    <button
                      className="
                        rounded-lg
                        p-2
                        text-red-500
                        hover:bg-red-50
                      "
                    >

                      <Trash2
                        className="h-4 w-4"
                      />

                    </button>


                  </div>


                </td>


              </tr>


            ))
          }


          </tbody>


        </table>


      </div>


    </div>

  );
}