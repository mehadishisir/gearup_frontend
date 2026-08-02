import AddGearForm from "@/components/forms/AddGearForm";


export default function AddGearPage() {


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
          Add New Gear
        </h1>


        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Add your sports and outdoor equipment to GearUp marketplace.
        </p>

      </section>



      {/* Form */}

      <div
        className="
          max-w-3xl
        "
      >

        <AddGearForm />

      </div>


    </div>

  );

}