import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";

const MyReviews = () => {
    const { user } = useAuth(); // Get logged-in user's details
    const axiosSecure = useAxiosSecure();
    const [reviews, setReviews] = useState([]);
  console.log(reviews)
    // Fetch reviews for the logged-in user
    const { isLoading, refetch } = useQuery({
        queryKey: ["myReviews", user.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews/${user.email}`);
            setReviews(data);
            return data;
        },
    });

    // Handle delete review
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            await axiosSecure.delete(`/reviews/${id}`);
            toast.success("Review deleted successfully!");
            refetch(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting review:", error);
            toast.error("Failed to delete the review.");
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="p-4 bg-white shadow-md rounded-lg border border-gray-200  gap-2 "
                    >
                        <h3 className="text-lg font-semibold">{review.title}</h3>
                        <img 
                            src={review.image}
                            alt={review.title}
                            className="w-12 h-12 object-cover rounded-full mb-2"
                        />
                        <p className="text-sm text-gray-600">Agent: {review.name}</p>
                        <p className="text-sm text-gray-500">Reviewed by: {review.email}</p>
                        <p className="mt-2">{review.text}</p>
                        <button
                            onClick={() => handleDelete(review._id)}
                            className="mt-4 bg-red-500 text-white py-1 px-3 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReviews;
