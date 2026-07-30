export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isSuspended?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface GearItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  pricePerDay: number;
  brand?: string;
  images: string[];
  isAvailable: boolean;
  avgRating?: number;
  providerId: string;
}

export type RentalStatus =
  | "PLACED" | "CONFIRMED" | "PAID" | "PICKED_UP" | "RETURNED" | "CANCELLED";

export interface RentalOrder {
  id: string;
  gearItem: GearItem;
  customerId: string;
  providerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: RentalStatus;
}

export interface Payment {
  id: string;
  rentalOrderId: string;
  amount: number;
  status: "PENDING" | "SUCCEEDED" | "FAILED";
}

export interface ApiError {
  success: false;
  message: string;
}