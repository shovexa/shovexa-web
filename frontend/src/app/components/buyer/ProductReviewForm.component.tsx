"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ProductReviewFormComponent = ({
    productId,
}: {

    productId: string | null;
}) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [reviewMessage, setReviewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [rating, setRating] = useState(1);
    const ratingOptions = [1, 2, 3, 4, 5];
    const router = useRouter()

    const handleSubmit = async () => {
        if (!productId) {
            alert("Product not found. Return to home page and try again.");
            return;
        }
        if (reviewMessage.trim() === "") {
            return setError("Review message cannot be empty.");

        }
        if (rating < 1 || rating > 5) {
            setError("Rating must be between 1 and 5.");
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await axios.post(
                `${API_URL}/review/${productId}`,
                { rating, reviewMessage },
                { withCredentials: true }
            );
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
            setReviewMessage("");
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    router.push('/login')
                }
                setError(`Failed to submit review:${err.response?.data.error || 'Unknown error'}`);
            }

            setTimeout(() => {
                setError(null);

            }, 2000);
        } finally {
            setLoading(false);
            setError(null);
            setSuccess(false);


        }
    };

    return (
        <div
  className={`${!productId && "hidden"} bg-white rounded-xl border border-gray-100 shadow-sm p-6`}
>
  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
    <span className="w-1.5 h-5 bg-gray-500 rounded-full" />
    Write a Review
  </h2>

  {success && (
    <p className="text-green-600 bg-green-50 border border-green-100 rounded-lg px-3 py-2 text-sm mb-4">
      Review submitted successfully!
    </p>
  )}

  {productId ? (
    <div>
      <label className="block text-sm font-medium text-gray-700">Rating</label>
      <div className="flex space-x-1 mt-2">
        {ratingOptions.map((num) => (
          <span
            key={num}
            className={`cursor-pointer text-2xl transition-transform hover:scale-110 ${
              num <= rating ? "text-amber-500" : "text-gray-300"
            }`}
            onClick={() => setRating(num)}
          >
            ★
          </span>
        ))}
      </div>

      <label className="block text-sm font-medium text-gray-700 mt-4">
        Review
      </label>
      <textarea
        className="w-full p-3 border border-gray-300 text-gray-700 rounded-lg mt-1.5 overflow-y-auto resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
        rows={3}
        value={reviewMessage}
        onChange={(e) => setReviewMessage(e.target.value)}
        placeholder="Write your review here..."
      />

      <div className="flex flex-col items-center">
        {error && (
          <p className="text-red-500 text-sm mt-3 w-full text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-gray-600 to-amber-500 hover:from-gray-500 hover:to-amber-400 text-white font-semibold py-2.5 px-4 rounded-lg mt-4 shadow-sm hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  ) : (
    <Link
      className="w-full inline-block text-center hover:text-gray-600 text-gray-600 font-semibold underline decoration-gray-300 underline-offset-4 py-2 px-4 rounded mt-3 transition-colors"
      href="/"
    >
      Return to Home Page ↗
    </Link>
  )}
</div>
    );
};

export default ProductReviewFormComponent;
