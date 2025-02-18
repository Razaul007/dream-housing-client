import React from "react";
import logo from '/logo.jpg'
const AboutUs = () => {
    return (
        <div className="max-w-[1280px] mx-auto my-24 px-6">
            <h1 className="text-3xl font-bold text-center mb-6">🏡 About DreamHouzing</h1>
            <p className="text-gray-600 text-lg  text-center">
                DreamHouzing is a trusted real estate platform, helping people find their dream homes with ease. <br/>
                Our mission is to provide the best property deals with transparency and reliability.
            </p>
            <div className="flex justify-center mt-6">
                <img src={logo} alt="About Us" className="w-100 h-100 rounded-lg shadow-md" />
            </div>
        </div>
    );
};

export default AboutUs;
