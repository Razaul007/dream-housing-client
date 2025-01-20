import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const PropertyBought = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch bought properties
    const { data: boughtProperties, isLoading } = useQuery({
        queryKey: ["bought-properties", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/bought-properties/${user.email}`);
            return data;
        },
    });
    console.log(boughtProperties)

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Property Bought</h2>
            {boughtProperties?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {boughtProperties.map((property) => (
                        <div key={property._id} className="p-4 bg-white shadow-md rounded-lg">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <h3 className="text-xl font-bold">{property.title}</h3>
                            <p>Location: {property.location}</p>
                            <p>Agent: {property.agentName}</p>
                          
                            <p>Status: <span className="font-semibold">{property.status}</span></p>
                            <p>Offer Amount: ${property.offerAmount}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">You haven't bought any properties yet.</p>
            )}
        </div>
    );
};

export default PropertyBought;
