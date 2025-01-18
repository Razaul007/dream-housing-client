
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';
import Card from '../Home/Card';


const AllProperties = () => {
    const { data: properties,
        isLoading } = useQuery({
            queryKey: ['properties'],
            queryFn: async () => {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/properties`)
                console.log(data)
                return data
            },
        })
    if (isLoading) return <LoadingSpinner />

    return (
        <div className='p-10'>
            {properties && properties.length > 0 ? (
                <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {properties.map(property => (
                        <Card key={property._id} property={property} />
                    ))}
                </div>
            ) : (
                <p>No Property Available</p>
            )}
        </div>
    );
};

export default AllProperties;