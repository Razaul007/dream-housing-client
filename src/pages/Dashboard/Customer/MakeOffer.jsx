import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MakeOffer = () => {
    const {user} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()
    const { property } = location.state;

    const [offerAmount, setOfferAmount] = useState("");
    const [buyingDate, setBuyingDate] = useState("");

    // Handle offer submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // const [minPrice, maxPrice] = property.priceRange.split("-").map((price) => parseInt(price.trim()));

        if (offerAmount < property.minPrice || offerAmount > property.maxPrice) {
            alert(`Offer amount must be between ${property.minPrice} and ${property.maxPrice}.`);
            return;
        }

        try {
            const offerData = {
                propertyId: property.id,
                title: property.title,
                image: property.image,
                location: property.location,
                agentName: property.agent.name,
                offerAmount,
                buyerEmail: property.customer.email, 
                buyerName:property.customer.name,  
                buyingDate,
                status: "pending",
            };
            console.log(offerData)
            // Save offer to the database
            await axiosSecure.post(`/offers`, offerData);
            alert("Offer submitted successfully!");
            navigate("/dashboard/property-bought");
        } catch (error) {
            console.error("Failed to submit offer:", error);
        }
    };

    return (
        <div className="make-offer-page">
            <h1 className="text-2xl font-bold mb-4">Make an Offer</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-md">
                <div className="mb-4">
                    <label className="block font-semibold">Property Title</label>
                    <input
                        type="text"
                        value={property.title}
                        readOnly
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Property Location</label>
                    <input
                        type="text"
                        value={property.location}
                        readOnly
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Agent Name</label>
                    <input
                        type="text"
                        value={property.agent.name}
                        readOnly
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Offer Amount</label>
                    <input
                        type="number"
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                        className="w-full border rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold">Buying Date</label>
                    <input
                        type="date"
                        value={buyingDate}
                        onChange={(e) => setBuyingDate(e.target.value)}
                        className="w-full border rounded-md p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                    Submit Offer
                </button>
            </form>
        </div>
    );
};

export default MakeOffer;
