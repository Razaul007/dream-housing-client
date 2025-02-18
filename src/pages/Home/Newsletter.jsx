import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you for subscribing, ${email}!`);
        setEmail("");
    };

    return (
        <div className="bg-gray-100 p-8 text-center rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800">📩 Stay Updated!</h2>
            <p className="text-lg text-gray-600 my-4">
                Subscribe to get the latest property updates and special offers.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center gap-4">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="p-3 border rounded-md w-full md:w-1/3"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-800">
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default Newsletter;
