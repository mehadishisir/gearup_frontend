import { apiFetch } from "@/lib/api-client";

export interface CreateReviewPayload {
  rentalOrderId: string;
  gearItemId: string;
  rating: number;
  comment: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const createReview = async (
  payload: CreateReviewPayload
) => {
  return apiFetch<{
    success: boolean;
    message: string;
    data: Review;
  }>("/reviews", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};