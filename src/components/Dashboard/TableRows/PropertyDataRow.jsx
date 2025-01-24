// import React from 'react';
// import { useState } from 'react'
// import UpdateUserModal from '../../Modal/UpdateUserModal'
// import PropTypes from 'prop-types'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'
// import { toast } from 'react-hot-toast'
import PropTypes from 'prop-types'

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const PropertyDataRow = ({ property, refetch }) => {
    const axiosSecure = useAxiosSecure()
      const [isOpen, setIsOpen] = useState(false)
    


  
    // handle property status update
    const updateStatus = async (propertyId, selectedStatus) => {
        if (property.verificationStatus === selectedStatus) return;
        try {
            await axiosSecure.put(`/properties/status/${propertyId}`, {
                status: selectedStatus,
            });
            toast.success('Status updated successfully!');
            refetch(); 
        } catch (err) {
            toast.error(err?.response?.data || "Failed to update status");
            console.log(err);
        } finally {
            setIsOpen(false); 
        }
    };

    const handleVerify = async (id) => {
        try {
          await updateStatus(id, "verified");
          toast.success("Property verified successfully!");
          refetch(); 
        } catch (error) {
          console.error("Failed to verify the property:", error);
          toast.error("Failed to verify the property.");
        }
      };

      const handleReject = async (id) => {
        try {
          await updateStatus(id, "rejected");
          refetch(); 
        } catch (error) {
          console.error("Failed to reject the property:", error);
        }
      };


    return (
        <tr key={property._id} className="text-center">
            <td className="px-4 py-2 border">{property.title}</td>
            <td className="px-4 py-2 border">{property.location}</td>
            <td className="px-4 py-2 border">{property.agent?.name}</td>
            <td className="px-4 py-2 border">{property.agent?.email}</td>
            <td className="px-4 py-2 border">
                ${property.minPrice} - ${property.maxPrice}
            </td>
            <td className="px-4 py-2 border">
                {property.verificationStatus === "verified" ? (
                    <span className="text-green-600 font-bold">Verified</span>
                ) : property.verificationStatus === "rejected" ? (
                    <span className="text-red-600 font-bold">Rejected</span>
                ) : (
                    <>
                        <button
                            onClick={() => handleVerify(property._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                        >
                            Verify
                        </button>
                        <button
                            onClick={() => handleReject(property._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Reject
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default PropertyDataRow;