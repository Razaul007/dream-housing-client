import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";


const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all reviews
    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/reviews");
            return data;
        },
    });

    console.log(reviews)
     
    if (isLoading) return <LoadingSpinner />;

    // Handle delete review
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            await axiosSecure.delete(`/reviews/${id}`);
            toast.success("Review deleted successfully!");
            refetch(); 
        } catch (error) {
            console.error("Failed to delete review:", error);
            toast.error("Failed to delete review!");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="p-4 shadow-md rounded-lg flex flex-col items-start bg-slate-200"
                    >
                        <img
                            src={review.image}
                            alt={review.name}
                            className="w-12 h-12 rounded-full mb-2"
                        />
                        <h3 className="text-lg font-bold">{review.name}</h3>
                        <p className="text-sm text-gray-500">{review.email}</p>
                        <p className="mt-2 text-gray-700">{review.text}</p>
                        <button
                            onClick={() => handleDelete(review._id)}
                            className="mt-4 bg-red-600 text-white py-1 px-3 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageReviews;
