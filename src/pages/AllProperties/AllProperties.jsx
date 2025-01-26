/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';
import Card from '../Home/Card';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const AllProperties = () => {
    const axiosSecure = useAxiosSecure();
    

    const { data: properties = [], isLoading } = useQuery({
        queryKey: ['verified-properties'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/properties/verified');
            return data;
        },
    });

   

    // console.log(properties)

    if (isLoading) return <LoadingSpinner />

    return (<>
        {/* <div className="mb-6 text-center flex justify-center items-center space-x-2">
            <input
                type="text"
                placeholder="Search by language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border rounded-lg w-1/2"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Search
            </button>
        </div> */}
        <div className='mt-5'>
            {properties && properties.length > 0 ? (
                <div className='pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {properties.map(property => (
                        <Card key={property._id} property={property} />
                    ))}
                </div>
            ) : (
                <p>No Property Available</p>
            )}
        </div>
    </>
    );
};

export default AllProperties;