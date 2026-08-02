import { apiFetch } from "@/lib/api-client";

export interface CreateRentalPayload {
  startDate: string;
  endDate: string;
  items: {
    gearItemId: string;
    quantity: number;
  }[];
}

export interface Rental {
  id: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: string;

  items?: {
    id: string;
    quantity: number;
    priceAtBooking: string;

    gearItem: {
      id:string;
      name:string;
      brand:string;
      images:string[];
    };
  }[];

}


export const createRental = async (
  payload: CreateRentalPayload
) => {
  return apiFetch<{
    success: boolean;
    message: string;
    data: Rental;
  }>("/rentals", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};



export const getMyRentals = async () => {
  return apiFetch<{
    success: boolean;
    message: string;
    data: Rental[];
  }>("/rentals", {
    method: "GET",
  });
};

export const getRentalById = async (
  id: string
) => {

  return apiFetch<{
    success: boolean;
    message: string;
    data: Rental;
  }>(
    `/rentals/${id}`,
    {
      method: "GET",
    }
  );

};