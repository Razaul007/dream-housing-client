import React from "react";

const WhyChooseUs = () => {
    return (
        <div className="max-w-[1280px] mx-auto my-24 px-6">
            <h1 className="text-3xl font-bold text-center mb-6">✨ Why Choose Us?</h1>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 border rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-bold">✔ Trusted by Customers</h2>
                    <p className="text-gray-600">Thousands of happy clients have found their dream homes with us.</p>
                </div>
                <div className="p-6 border rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-bold">🏡 Best Property Deals</h2>
                    <p className="text-gray-600">We offer the most competitive prices in the market.</p>
                </div>
                <div className="p-6 border rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-bold">📞 24/7 Support</h2>
                    <p className="text-gray-600">Our team is always ready to assist you with your needs.</p>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
