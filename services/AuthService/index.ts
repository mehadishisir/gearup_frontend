import { IRegisterPayload, ILoginPayload, IApiResponse, ILoginResponse, IUser } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const registerUser = async (
  payload: IRegisterPayload
): Promise<IApiResponse<IUser>> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data) {
    throw new Error(data?.message || "Registration failed. Please try again.");
  }

  return data;
};

export const loginUser = async (
  payload: ILoginPayload
): Promise<IApiResponse<ILoginResponse>> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data) {
    throw new Error(data?.message || "Login failed. Please try again.");
  }

  return data;
};

export const getCurrentUser = async (): Promise<IApiResponse<IUser>> => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data) {
    throw new Error(data?.message || "Failed to fetch user.");
  }

  return data;
};

export const logoutUser = async (): Promise<IApiResponse<null>> => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data) {
    throw new Error(data?.message || "Logout failed.");
  }

  return data;
};