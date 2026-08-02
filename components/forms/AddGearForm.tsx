"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  gearSchema,
  GearFormData,
} from "@/schemas/gear.schema";



export default function AddGearForm() {


  const [loading, setLoading] = useState(false);



  const {
    register,
    handleSubmit,
    reset,
    formState:{
      errors
    }

  } = useForm<GearFormData>({

    resolver:zodResolver(gearSchema),

    defaultValues:{
      name:"",
      category:"",
      price:"",
      description:"",
    }

  });




  const onSubmit = async(data:GearFormData)=>{

    try{

      setLoading(true);


      console.log(data);


      /*
        API integration
        will be added here
      */


      toast.success(
        "Gear added successfully"
      );


      reset();


    }catch(error){

      toast.error(
        "Something went wrong"
      );


    }finally{

      setLoading(false);

    }

  };



  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        space-y-6
        rounded-2xl
        bg-white
        p-6
        shadow-sm
      "
    >


      {/* Name */}

      <div className="space-y-2">

        <Label>
          Gear Name
        </Label>


        <Input
          placeholder="Mountain Bike"
          {...register("name")}
        />


        {
          errors.name &&
          (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )
        }

      </div>




      {/* Category */}

      <div className="space-y-2">

        <Label>
          Category
        </Label>


        <Input
          placeholder="Cycling"
          {...register("category")}
        />


        {
          errors.category &&
          (
            <p className="text-sm text-red-500">
              {errors.category.message}
            </p>
          )
        }


      </div>




      {/* Price */}

      <div className="space-y-2">

        <Label>
          Rental Price
        </Label>


        <Input
          placeholder="20"
          {...register("price")}
        />


        {
          errors.price &&
          (
            <p className="text-sm text-red-500">
              {errors.price.message}
            </p>
          )
        }

      </div>




      {/* Description */}

      <div className="space-y-2">


        <Label>
          Description
        </Label>


        <Textarea
          placeholder="Describe your equipment..."
          rows={5}
          {...register("description")}
        />


        {
          errors.description &&
          (
            <p className="text-sm text-red-500">
              {errors.description.message}
            </p>
          )
        }


      </div>




      <Button
        disabled={loading}
        className="
          w-full
          rounded-xl
          bg-orange-500
          hover:bg-orange-600
        "
      >

        {
          loading
          ?
          (
            <>
              <Loader2
                className="
                  mr-2
                  h-4
                  w-4
                  animate-spin
                "
              />

              Adding...

            </>
          )
          :
          "Add Gear"
        }


      </Button>



    </form>

  );

}