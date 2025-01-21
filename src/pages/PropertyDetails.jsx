import React, { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import useAuth from '../hooks/useAuth';
import { isDate } from 'date-fns';


const PropertyDetails = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    console.log(user)
    const { id } = useParams(); // Get property ID from route
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewText, setReviewText] = useState("");

    // Fetch property details
    const { data: property =[],
         isLoading: propertyLoading, refetch } = useQuery({
        queryKey: ['property', id],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/properties/${id}`);
            return data;
        },
    });
    console.log(property)
    // Fetch reviews for the property
    const { data: reviews, isLoading: reviewsLoading, refetch: refetchReviews } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
            return data;
        },
    });

    // Add property to wishlist
  
    const handleAddToWishlist = async () => {
        try {
            const propertyData = {
                id,
                customer: {
                    email:user?.email,
                    name:user.displayName,
                    image:user.photoURL
                },                     
                image: property?.imageURL, 
                title: property?.title,    
                location: property?.location,
                agent: {
                    name:property?.agent?.name,       
                    email:property?.agent?.email,       
                    image: property?.agent?.image,  
                },
                status: property.verificationStatus,      
                minPrice: property?.minPrice, 
                maxPrice: property?.maxPrice  
            };
        //  console.log(propertyData)
            await axios.post(`${import.meta.env.VITE_API_URL}/wishlist`, propertyData);
    
            alert("Property added to wishlist!");
        //    navigate("dashboard/my-wishlist")
        navigate('/dashboard/my-wishlist')
        } catch (error) {
            console.error("Failed to add property to wishlist:", error);
        }
    };
    

    // Add a review
    const handleAddReview = async () => {
        
        try {
            const reviewData = {
                id,    
                title:property.title,                 
                image: user?.photoURL, 
                name: user?.displayName, 
                email: user?.email, 
                text:reviewText , 
                reviewTime: new isDate()
            
            };
            await axios.post(`${import.meta.env.VITE_API_URL}/reviews`,reviewData);
            setIsModalOpen(false);
            refetchReviews(); 
            setReviewText("");
            navigate('/dashboard/my-reviews');
        } catch (error) {
            console.error("Failed to add review:", error);
        }
    };

    if (propertyLoading || reviewsLoading) return <div><LoadingSpinner/></div>;

    return (
        <div className=" w-3/4 mx-auto flex items-center gap-10 p-6">
            {/* Property Details Section */}
            <div className='p-10 rounded-xl'>
                <img
                    src={property.imageURL}
                    alt={property.title}
                    className="w-full  object-cover rounded mb-4"
                />
            </div>
            <div className='flex flex-col items-center p-10 bg-slate-100 rounded-xl '>
                <div className="mb-6">

                    <h1 className="text-2xl font-bold">{property.title}</h1>
                    <p className="text-gray-600 mb-2">Location: {property.location}</p>
                    <p className="text-lg font-semibold">Price Range: ${property.minPrice} - ${property.maxPrice}</p>
                    <p className="text-sm text-gray-500 mb-2">
                        Status: <strong>{property.verificationStatus}</strong>
                    </p>
                    <div className="flex items-center mb-4">
                        <img
                            src={property.agent.image}
                            alt={property.agent.name}
                            className="w-12 h-12 rounded-full mr-4"
                        />
                        <p className="text-gray-700">Agent: {property.agent.name}</p>
                    </div>
                </div>
                <div className="mb-6">
                  
                    <button
                        className="btn btn-primary mt-4"
                        onClick={handleAddToWishlist}
                    >
                        Add to Wishlist
                    </button>
                </div>

                {/* Review Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold">Reviews</h2>
                    <div className="space-y-4">
                        {reviews?.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="p-4 border rounded">
                                    <p>{review.text}</p>
                                    <span className="text-sm text-gray-500">By {review.user}</span>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                    <button
                        className="btn btn-secondary mt-4"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add a Review
                    </button>
                </div>

                {/* Review Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-lg font-bold mb-4">Add a Review</h3>
                            <textarea
                                className="w-full border p-2 rounded"
                                placeholder="Write your review..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            ></textarea>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAddReview}
                                >
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyDetails;
