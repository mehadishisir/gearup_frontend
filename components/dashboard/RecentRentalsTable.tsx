import { CheckCircle2, Clock3 } from "lucide-react";


const rentals = [
  {
    id: 1,
    user: "Rahim Ahmed",
    gear: "Mountain Bike",
    status: "ACTIVE",
    amount: "$120",
  },
  {
    id: 2,
    user: "Karim Hasan",
    gear: "Camping Kit",
    status: "COMPLETED",
    amount: "$80",
  },
  {
    id: 3,
    user: "Sadia Islam",
    gear: "Kayak",
    status: "PENDING",
    amount: "$150",
  },
];



export default function RecentRentalsTable() {

  return (
    <div
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
          Recent Rentals
        </h2>


        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Latest rental activities from customers.
        </p>

      </div>




      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className="
                border-b
                text-left
                text-sm
                text-slate-500
              "
            >

              <th className="pb-4">
                Customer
              </th>

              <th className="pb-4">
                Gear
              </th>

              <th className="pb-4">
                Status
              </th>

              <th className="pb-4">
                Amount
              </th>

            </tr>

          </thead>



          <tbody>

            {rentals.map((rental) => (

              <tr
                key={rental.id}
                className="
                  border-b
                  transition
                  hover:bg-slate-50
                "
              >

                <td className="py-4 font-medium text-slate-900">
                  {rental.user}
                </td>


                <td className="py-4 text-slate-600">
                  {rental.gear}
                </td>



                <td className="py-4">

                  {rental.status === "COMPLETED" && (

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-full
                        bg-green-50
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-green-600
                      "
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Completed
                    </span>

                  )}



                  {rental.status === "ACTIVE" && (

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-full
                        bg-orange-50
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-orange-600
                      "
                    >
                      <Clock3 className="h-3 w-3" />
                      Active
                    </span>

                  )}



                  {rental.status === "PENDING" && (

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-full
                        bg-yellow-50
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-yellow-600
                      "
                    >
                      <Clock3 className="h-3 w-3" />
                      Pending
                    </span>

                  )}

                </td>



                <td className="py-4 font-semibold text-slate-900">
                  {rental.amount}
                </td>


              </tr>

            ))}

          </tbody>


        </table>


      </div>


    </div>
  );
}