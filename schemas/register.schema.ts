import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .regex(
      /^(?:\+88|88)?(01[3-9]\d{8})$/,
      "Please enter a valid Bangladeshi phone number"
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

  role: z.enum(["CUSTOMER", "PROVIDER"], {
    message: "Please select a role",
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;