import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const LastReviews = () => {
    const axiosSecure = useAxiosSecure()

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/reviews"); // Fetch all reviews
            // Sort reviews by time (most recent first) and take the top 3
            return data
                .sort((a, b) => new Date(b.reviewTime) - new Date(a.reviewTime))
                .slice(0, 3);
        },
    });
    console.log(reviews)



    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Latest Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="p-4 shadow-md rounded-lg flex flex-col items-start bg-slate-100"
                    >
                        <img
                            src={review.image}
                            alt={review.name}
                            className="w-12 h-12 rounded-full mb-2"
                        />
                        <h3 className="text-lg font-bold">{review.name}</h3>
                        <p className="mt-2 text-gray-700">Review: {review.text}</p>
                        <p className="text-lg font-semibold text-gray-500">{review.title}</p>

                       
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LastReviews;