

import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import { imageUpload } from "../../../api/utils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const AddProperty = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure= useAxiosSecure();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState([]);
   


    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target
        const title = form.title.value
        const location = form.location.value
        const minPrice = parseFloat(form.minPrice.value)
        const maxPrice = parseFloat(form.maxPrice.value)
        const image = form.image.files[0]
        // console.log(image)
        
        const imageURL = await imageUpload(image)
    // console.log(imageURL)
          // User details
    const agent = {
        name: user?.displayName,
        image: user?.photoURL,
        email: user?.email,

    };
    
        // Create plant data object
        const propertyData = {
          title,
          location,
          minPrice,
          maxPrice,
          imageURL,
          agent,
          verificationStatus: "pending", 
        }
    
        console.table(propertyData)
         setFormData(propertyData)
        // save plant in db
        try {
          // post req
          await axiosSecure.post('/properties', propertyData)
          toast.success('Property Added Successfully!')

          navigate('/dashboard/my-properties')
        } catch (err) {
          console.log(err)
        } finally {
          setLoading(false)
        }
      }

 

   
    // console.log(formData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };


  

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add Property</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Property Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
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
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Property Image</label>
                    <input
                        type="file"
                        name ="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Agent Name</label>
                    <input
                        type="text"
                        value={user?.displayName}
                        readOnly
                        className="w-full mt-1 p-2 border rounded bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Agent Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="w-full mt-1 p-2 border rounded bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Minimum Price</label>
                    <input
                        type="number"
                        name="minPrice"
                        value={formData.minPrice}
                        onChange={handleInputChange}
                        required
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Maximum Price</label>
                    <input
                        type="number"
                        name="maxPrice"
                        value={formData.maxPrice}
                        onChange={handleInputChange}
                        required
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-center font-bold rounded-lg items-center w-full h-10"
                            
                    >
                      Add Property
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProperty;

