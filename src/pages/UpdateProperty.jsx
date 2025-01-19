import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateProperty = () => {
  const { id } = useParams();
  console.log(id)
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  console.log(property);
  // Fetch the property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await axiosSecure.get(`/properties/${id}`);
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property details:", err);
      }
    };

    fetchProperty();
  }, [axiosSecure, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { _id, ...dataToUpdate } = property; // Exclude _id from the request
      await axiosSecure.put(`/update/${_id}`, dataToUpdate);
      toast.success("Property updated successfully!");
      navigate("/dashboard/my-properties");
    } catch (err) {
      console.error("Error updating property:", err);
      toast.error("Failed to update property.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  if (!property) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Property Title</label>
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleInputChange}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Property Location</label>
          <input
            type="text"
            name="location"
            value={property.location}
            onChange={handleInputChange}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minPrice"
              value={property.minPrice}
              onChange={handleInputChange}
              required
              className="w-1/2 mt-1 p-2 border rounded"
              placeholder="Min Price"
            />
            <input
              type="number"
              name="maxPrice"
              value={property.maxPrice}
              onChange={handleInputChange}
              required
              className="w-1/2 mt-1 p-2 border rounded"
              placeholder="Max Price"
            />
          </div>

        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
