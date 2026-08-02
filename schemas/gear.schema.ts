import { z } from "zod";


export const gearSchema = z.object({

  name: z
    .string()
    .min(3, "Gear name must be at least 3 characters"),


  category: z
    .string()
    .min(1, "Category is required"),


  price: z
    .string()
    .min(1, "Price is required"),


  description: z
    .string()
    .min(
      10,
      "Description must be at least 10 characters"
    ),


});


export type GearFormData =
  z.infer<typeof gearSchema>;