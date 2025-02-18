import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800">About DreamHouzing</h1>
                <p className="text-lg text-gray-600 mt-4">
                    Your trusted real estate platform for buying, selling, and renting properties.
                </p>
            </div>

            {/* Our Mission */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
                <p className="text-gray-600 mt-3">
                    At DreamHouzing, we aim to simplify the real estate experience by providing 
                    verified listings and secure transactions.
                </p>
            </div>

            {/* Why Choose Us */}
            <div className="my-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white shadow-md rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-700">✔ Verified Properties</h3>
                        <p className="text-gray-600 mt-2">All listings are checked and verified.</p>
                    </div>
                    <div className="p-6 bg-white shadow-md rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-700">✔ Secure Transactions</h3>
                        <p className="text-gray-600 mt-2">We ensure safety for both buyers and sellers.</p>
                    </div>
                    <div className="p-6 bg-white shadow-md rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-700">✔ 24/7 Support</h3>
                        <p className="text-gray-600 mt-2">Our team is here to help you anytime.</p>
                    </div>
                </div>
            </div>

            {/* Meet Our Team */}
            <div className="my-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h3 className="text-xl font-semibold">John Doe</h3>
                        <p className="text-gray-600">CEO & Founder</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h3 className="text-xl font-semibold">Sarah Smith</h3>
                        <p className="text-gray-600">Marketing Manager</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h3 className="text-xl font-semibold">Michael Johnson</h3>
                        <p className="text-gray-600">Lead Developer</p>
                    </div>
                </div>
            </div>

            {/* Customer Reviews */}
            <div className="my-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <p className="text-gray-600 italic">"DreamHouzing made my home-buying process effortless. Highly recommend!"</p>
                    <h3 className="text-lg font-bold mt-3">- Jane Doe</h3>
                </div>
            </div>

            {/* Contact Section */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
                <p className="text-gray-600">📍 123 Real Estate St, NewYork, America</p>
                <p className="text-gray-600">📞 +123 456 7890</p>
                <p className="text-gray-600">📧 contact@dreamhouzing.com</p>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-10">
               <Link to ='/all-properties'>
               <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition">
                    Browse Properties
                </button>
               </Link>
            </div>
        </div>
    );
};

export default About;
