import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; 
import useAuth from '../../../hooks/useAuth';


const MySoldProperties = () => {
    const [soldOffers, setSoldOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // Get logged-in agent info

    useEffect(() => {
        // Fetch sold offers
        const fetchSoldOffers = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get(`/offers/sold?agentEmail=${user.email}`);
                setSoldOffers(response.data);
            } catch (error) {
                console.error('Error fetching sold offers:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchSoldOffers();
        }
    }, [axiosSecure, user?.email]);

    if (loading) {
        return <p>Loading sold offers...</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Sold Properties</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {soldOffers.length === 0 ? (
                    <p>No sold properties found!</p>
                ) : (
                    soldOffers.map((offer) => (
                        <div key={offer._id} className="shadow-lg p-4 rounded-lg border">
                            <img
                                src={offer.image}
                                alt={offer.title}
                                className="w-full h-48 object-cover rounded-md mb-2"
                            />
                            <h2 className="text-xl font-bold">{offer.title}</h2>
                            <p className="text-gray-600">Location: {offer.location}</p>
                            <p className="text-gray-600">Buyer: {offer.buyerName}</p>
                            <p className="text-gray-600">Buyer Email: {offer.buyerEmail}</p>
                            <p className="text-gray-600">Offer Amount: {offer.offerAmount}$</p>
                            <p className="text-gray-600">Buying Date: {offer.buyingDate}</p>
                            <p className="text-green-600 font-bold">
                                Status: {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                            </p>
                            <p className="text-blue-500 font-bold">Transaction ID: {offer.transactionId}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MySoldProperties;
