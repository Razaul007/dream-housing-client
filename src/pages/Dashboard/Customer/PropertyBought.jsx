import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PropertyBought = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
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

     // Redirect to payment page
  const handlePayment = (property) => {
    navigate(`/payment/${property._id}`, { state: property });
  };

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
                            <p>Offer Amount: ${property.offerAmount}</p>
                            <p>Status: <span className="font-semibold">{property.status}</span></p>
                            {property.status === "accepted" && (
                                <button
                                    onClick={() => handlePayment(property)}
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Pay
                                </button>
                            )}
                            {property.status === "bought" && (
                                <p className="mt-4 text-green-600 font-bold">
                                    Sold Property!
                                </p>
                            )}
                            
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
