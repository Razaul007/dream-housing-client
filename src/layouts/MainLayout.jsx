import React from 'react';
import Navbar from '../shared/Navbar/Navbar';

import Footer from '../shared/Footer/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <div className="min-h-screen container mx-auto mt-10 mb-10">
               <Outlet/>
             </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;