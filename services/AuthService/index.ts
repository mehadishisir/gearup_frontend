

import { apiFetch } from "@/lib/api-client";
import {
  IUser,
  IRegisterPayload,
  ILoginPayload,
  IApiResponse,
  ILoginResponse,
} from "@/types/auth";


// Register User

export const registerUser = async (
  payload: IRegisterPayload
): Promise<IApiResponse<IUser>> => {

  return apiFetch(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

};



// Login User

export const loginUser = async (
  payload: ILoginPayload
): Promise<IApiResponse<ILoginResponse>> => {

  return apiFetch(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

};



// Get Current User

export const getCurrentUser = async (): Promise<IUser | null> => {

  try {

    const result = await apiFetch<
      IApiResponse<IUser>
    >(
      "/auth/me",
      {
        method: "GET",
      }
    );


    return result.data ?? null;


  } catch{

    return null;

  }

};



// Logout

export const logoutUser = async (): Promise<void> => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }
};