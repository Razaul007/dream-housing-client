/* eslint-disable react/prop-types */

import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";



const MyProperties = () => {
    const {user} = useAuth()
  const navigate = useNavigate();

    const axiosSecure = useAxiosSecure()
    const {
      data: properties = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['properties'],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/properties?agentEmail=${user.email}`)
  
        return data
      },
    })
    console.log(properties)
    if (isLoading) return <LoadingSpinner />


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;

        try {
            // Delete the property from the backend
            await axiosSecure.delete(`/properties/${id}`);
            toast.success("Property deleted successfully!");

            refetch();

        } catch (err) {
            console.error("Error deleting property:", err);
            toast.error("Failed to delete property.");
        }
    };


    // Handle Update Redirect
    const handleUpdate = (id) => {
        navigate(`/dashboard/update/${id}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">My Added Properties</h2>
            {properties && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties && properties.map((property) => (

                    <div key={property._id} className="p-4 bg-white shadow-md rounded-lg">
                        <img
                            src={property?.imageURL}
                            alt={property?.title}
                            className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        <h3 className="text-xl font-bold">{property.title}</h3>
                        <p>Location: {property?.location}</p>
                        <p>Agent: {property.agent?.name}</p>
                        <img
                            src={property.agent?.image}
                            alt={property.agent?.name}
                            className="w-10 h-10 rounded-full mt-2"
                        />
                        <p>Verification Status: {property.verificationStatus}</p>
                        <p>Price Range: ${property.minPrice} - ${property.maxPrice}</p>
                        <div className="flex gap-2 mt-4">
                            {property.verificationStatus !== "rejected" && (
                                <button
                                    onClick={() => handleUpdate(property._id)}
                                    className="bg-blue-600 text-white py-1 px-3 rounded"
                                >
                                    Update
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(property._id)}
                                className="bg-red-600 text-white py-1 px-3 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default MyProperties;