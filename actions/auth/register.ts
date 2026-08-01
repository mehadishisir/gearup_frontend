"use server";

import { IRegisterPayload } from "@/types/auth";
import { registerUser } from "@/services/AuthService";

export async function registerUserAction(payload: IRegisterPayload) {
  try {
    const response = await registerUser(payload);
    return {
      success: true,
      message: response.message || "Registration successful!",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
      data: null,
    };
  }
}