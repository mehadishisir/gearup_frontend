import { z } from "zod";

export const gearSchema = z.object({
  name: z
    .string()
    .min(3, "Gear name must be at least 3 characters"),

  brand: z
    .string()
    .min(2, "Brand is required"),

  categoryId: z
    .string()
    .min(1, "Category is required"),

  price: z.coerce
    .number()
    .min(1, "Price must be greater than 0"),

  stock: z.coerce
    .number()
    .min(1, "Stock must be at least 1"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  available: z.boolean(),
});

export type GearFormData = z.infer<typeof gearSchema>;