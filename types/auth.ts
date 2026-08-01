export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}