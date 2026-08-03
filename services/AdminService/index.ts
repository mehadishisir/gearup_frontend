import { apiFetch } from "@/lib/api-client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export const getAllUsers = async () => {
  return apiFetch<{
    success: boolean;
    message: string;
    data: User[];
  }>("/admin/users", {
    method: "GET",
  });
};

export const updateUserStatus = async (userId: string, status: string) => {
  return apiFetch<{
    success: boolean;
    message: string;
    data: User;
  }>(`/admin/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};