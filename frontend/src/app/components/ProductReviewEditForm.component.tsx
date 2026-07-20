import React, { useEffect, useState } from 'react'
import { ReviewsInterface } from '../utils/review.interface';
import axios, { AxiosError } from 'axios';

const ProductReviewEditFormComponent = (
  {
    editData,
    setEditData,
    setEditToggle,
     setReviews}
  : {
    editData: ReviewsInterface | null;
    setEditData: React.Dispatch<React.SetStateAction<ReviewsInterface | null>>;
    setEditToggle: React.Dispatch<React.SetStateAction<boolean>>;
    setReviews: React.Dispatch<React.SetStateAction<ReviewsInterface[]>>;
  }
) => {
    const [rating, setRating] = useState(1);
    const ratingOptions = [1, 2, 3, 4, 5];
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

useEffect(() => {
    if (editData) {
        setRating(editData.rating);
    }
}, [editData]);
const handleEditSubmit = async () => {

  
  if (!editData) return alert("No review data to edit");

  try {
    const res = await axios.patch(
      `${API_URL}/update/${editData._id}`,
      {
        rating,
        reviewMessage: editData.reviewMessage,
      },
      { withCredentials: true }
    );

    // Update review list instantly
    setReviews((prev) =>
      prev.map((r) => (r._id === editData._id ? { ...r, ...res.data.data } : r))
    );

    // setEditToggle(false);
    setEditData(null);
  } catch (error:unknown) {
    if (error instanceof AxiosError) {
      alert("Failed to edit review: " + (error.response?.data.message || "Unknown error"));
      return;
    }
  }
};
  return (
 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
  <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-100">
    <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
      <span className="w-1.5 h-5 bg-gray-500 rounded-full" />
      Edit Your Review
    </h2>

    <div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-sm font-medium">Rating</label>
        <div className="flex space-x-1">
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
      </div>

      {editData && (
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 text-sm font-medium">
            Review Message
          </label>
          <textarea
            value={editData.reviewMessage}
            required
            onChange={(e) =>
              setEditData({ ...editData, reviewMessage: e.target.value })
            }
            className="w-full border text-gray-800 border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
            rows={4}
            placeholder="Write your review here..."
          ></textarea>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => setEditToggle(false)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleEditSubmit}
          className="px-4 py-2 bg-gradient-to-r from-gray-600 to-amber-500 text-white rounded-lg hover:from-gray-500 hover:to-amber-400 transition-all font-medium shadow-sm hover:shadow-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default ProductReviewEditFormComponent
