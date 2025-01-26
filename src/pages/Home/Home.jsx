import React from 'react';
import AllProperties from '../AllProperties/AllProperties';
import Banner from './Banner';
import Contact from './Contact';

const Home = () => {
    return (
        <div className="max-w-[1280px] mx-auto mt-5" >
             <div className='mb-10'> 
                <Banner/>
             </div>
            <div>
                <h1 className=' text-3xl font-bold text-center m-5'> Advertisement section</h1>
                <AllProperties />
            </div>
            <div className="my-24 mx-8">
                {/* <h1 className="text-3xl font-bold my-16 text-center">User Testimonials</h1> */}
                <Contact />
            </div>
        </div>
    );
};

export default Home;