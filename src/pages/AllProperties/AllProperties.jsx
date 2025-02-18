
/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Card from "../Home/Card";

const AllProperties = () => {
    const axiosSecure = useAxiosSecure();
    const [sortType, setSortType] = useState("price-asc"); 

    // Fetch properties from API
    const { data: properties = [], isLoading } = useQuery({
        queryKey: ["verified-properties"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/properties/verified");
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    // Sorting function
    const sortedProperties = [...properties].sort((a, b) => {
        if (sortType === "price-asc") return parseInt(a.minPrice) - parseInt(b.minPrice);
        if (sortType === "price-desc") return parseInt(b.minPrice) - parseInt(a.minPrice);
        if (sortType === "location-asc") return a.location.localeCompare(b.location);
        if (sortType === "location-desc") return b.location.localeCompare(a.location);
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            {/* Sorting Dropdown */}
            <div className="flex justify-end mb-4">
                <select
                    className="p-2 border border-gray-300 rounded-md"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                >
                    <option value="price-asc">Sort by Price: Low to High</option>
                    <option value="price-desc">Sort by Price: High to Low</option>
                    <option value="location-asc">Sort by Location: A to Z</option>
                    <option value="location-desc">Sort by Location: Z to A</option>
                </select>
            </div>

            {/* Properties Grid */}
            {sortedProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProperties.map((property) => (
                        <Card key={property._id} property={property} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg font-semibold">No Properties Available</p>
            )}
        </div>
    );
};

export default AllProperties;
