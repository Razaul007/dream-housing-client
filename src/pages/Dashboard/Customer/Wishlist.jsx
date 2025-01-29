
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const { user } = useAuth(); 
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { data: wishlist, isLoading, refetch } = useQuery({
        queryKey: ["wishlist", user?.email], 
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-wishlist/${user?.email}`);
            return data;
        },
        enabled: !!user?.email,
    });
    console.log(wishlist)
    //     // Remove property from wishlist
    const handleRemove = async (id) => {
        if (!window.confirm("Are you sure you want to remove this property from your wishlist?")) return;

        try {
            await axiosSecure.delete(`/wishlist/${id}`);
            toast.success("Property removed from wishlist!");
            refetch(); // Refresh the wishlist
        } catch (err) {
            console.error("Error removing property from wishlist:", err);
            toast.error("Failed to remove property from wishlist.");
        }
    };

//     // Navigate to Make Offer Page
    const handleMakeOffer = (property) => {
        navigate("/dashboard/make-offer", { state: { property } });
    };


    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">My Wishlist</h2>
            {wishlist?.length === 0 ? (
                <p className="text-center">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((property) => (
                        
                        <div key={property._id} className="p-4 bg-white shadow-md rounded-lg">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <h3 className="text-xl font-bold">{property.title}</h3>
                            <p>Location: {property.location}</p>
                            <p>Agent: {property.agent?.name}</p>
                            <p>Agent Email: {property.agent?.email}</p>
                            <img
                                src={property.agent?.image}
                                alt=""
                                className="w-10 h-10 rounded-full mt-2"
                            />
                            <p>Verification Status: {property.status}</p>
                            <p>Price Range: ${property.minPrice} - ${property.maxPrice}</p>
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => handleMakeOffer(property)}
                                    className="bg-green-600 text-white py-1 px-3 rounded"
                                >
                                    Make an Offer
                                </button>
                                <button
                                    onClick={() => handleRemove(property._id)}
                                    className="bg-red-600 text-white py-1 px-3 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAuth from "../../../hooks/useAuth";
// import LoadingSpinner from "../../../components/LoadingSpinner";
// import { toast } from "react-toastify";

// const Wishlist = () => {
//     const { user } = useAuth(); // Get authenticated user's details
//     const axiosSecure = useAxiosSecure();
//     const navigate = useNavigate();

//     // Fetch wishlist data
//     const { data: wishlist, isLoading, refetch } = useQuery({
//         queryKey: ["wishlist", user?.email],
//         queryFn: async () => {
//             const { data } = await axiosSecure.get(`/wishlist/${user.email}`);
//             return data;
//         },
//         enabled: !!user?.email,
//     });

//     // Remove property from wishlist
//     const handleRemove = async (id) => {
//         if (!window.confirm("Are you sure you want to remove this property from your wishlist?")) return;

//         try {
//             await axiosSecure.delete(`/wishlist/${id}`);
//             toast.success("Property removed from wishlist!");
//             refetch(); // Refresh the wishlist
//         } catch (err) {
//             console.error("Error removing property from wishlist:", err);
//             toast.error("Failed to remove property from wishlist.");
//         }
//     };

//     // Navigate to Make Offer Page
//     const handleMakeOffer = (property) => {
//         navigate("/dashboard/make-offer", { state: { property } });
//     };

//     if (isLoading) return <LoadingSpinner />;

//     return (
//         <div className="max-w-6xl mx-auto p-6">
//             <h2 className="text-2xl font-bold mb-4 text-center">My Wishlist</h2>
//             {wishlist?.length === 0 ? (
//                 <p className="text-center">Your wishlist is empty.</p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {wishlist.map((property) => (
//                         <div key={property._id} className="p-4 bg-white shadow-md rounded-lg">
//                             <img
//                                 src={property.image}
//                                 alt={property.title}
//                                 className="w-full h-40 object-cover rounded-md mb-3"
//                             />
//                             <h3 className="text-xl font-bold">{property.title}</h3>
//                             <p>Location: {property.location}</p>
//                             <p>Agent: {property.agent.name}</p>
//                             <img
//                                 src={property.agent.image}
//                                 alt={property.agent.name}
//                                 className="w-10 h-10 rounded-full mt-2"
//                             />
//                             <p>Verification Status: {property.status}</p>
//                             <p>Price Range: ${property.minPrice} - ${property.maxPrice}</p>
//                             <div className="flex gap-2 mt-4">
//                                 <button
//                                     onClick={() => handleMakeOffer(property)}
//                                     className="bg-green-600 text-white py-1 px-3 rounded"
//                                 >
//                                     Make an Offer
//                                 </button>
//                                 <button
//                                     onClick={() => handleRemove(property._id)}
//                                     className="bg-red-600 text-white py-1 px-3 rounded"
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Wishlist;
