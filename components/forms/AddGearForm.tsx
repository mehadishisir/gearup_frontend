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

import { apiFetch } from "@/lib/api-client";

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
    formState: { errors }
  } = useForm({
    resolver: zodResolver(gearSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      price: 0,
      stock: 0,
      description: "",
      available: true,
      brand: "",
    },
  });

  const onSubmit = async (data: GearFormData) => {
    try {
      setLoading(true);

      await apiFetch("/provider/gear", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          images: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e"],
        }),
      });

      toast.success("Gear added successfully");

      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
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
        <Label>Gear Name</Label>

        <Input
          placeholder="Mountain Bike"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <Label>Brand</Label>

        <Input
          placeholder="Trek"
          {...register("brand")}
        />

        {errors.brand && (
          <p className="text-sm text-red-500">{errors.brand.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>

        <Input
          placeholder="Cycling"
          {...register("categoryId")}
        />

        {errors.categoryId && (
          <p className="text-sm text-red-500">{errors.categoryId.message}</p>
        )}
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label>Rental Price</Label>

        <Input
          type="number"
          placeholder="20"
          {...register("price", { valueAsNumber: true })}
        />

        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
      </div>

      {/* Stock */}
      <div className="space-y-2">
        <Label>Stock</Label>

        <Input
          type="number"
          placeholder="5"
          {...register("stock", { valueAsNumber: true })}
        />

        {errors.stock && (
          <p className="text-sm text-red-500">{errors.stock.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label>Description</Label>

        <Textarea
          placeholder="Describe your equipment..."
          rows={5}
          {...register("description")}
        />

        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <Button
      type="submit"
        disabled={loading}
        className="
          w-full
          rounded-xl
          bg-orange-500
          hover:bg-orange-600
        "
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          "Add Gear"
        )}
      </Button>
    </form>
  );
}