"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Star } from "lucide-react";

import { createReview } from "@/services/ReviewService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewFormProps {
  rentalOrderId: string;
  gearItemId: string;
}

export default function ReviewForm({
  rentalOrderId,
  gearItemId,
}: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const reviewMutation = useMutation({
    mutationFn: () =>
      createReview({
        rentalOrderId,
        gearItemId,
        rating,
        comment,
      }),

    onSuccess: () => {
      toast.success("Review submitted successfully");
      setComment("");
      setRating(5);
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <Card className="mt-6 border-0 shadow-sm">
      <CardContent className="p-6">
        <h2 className="mb-5 text-xl font-semibold text-slate-900">
          Leave a Review
        </h2>

        <div className="mb-5 flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
            >
              <Star
                className={`h-7 w-7 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }`}
              />
            </button>
          ))}
        </div>

        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-orange-500"
        />

        <Button
          className="mt-5 bg-orange-500 hover:bg-orange-600"
          disabled={reviewMutation.isPending}
          onClick={() => reviewMutation.mutate()}
        >
          {reviewMutation.isPending
            ? "Submitting..."
            : "Submit Review"}
        </Button>
      </CardContent>
    </Card>
  );
}