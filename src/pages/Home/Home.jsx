import React from 'react';
import AllProperties from '../AllProperties/AllProperties';
import Banner from './Banner';
import Contact from './Contact';
import LastReviews from './LastReviews';
import Accordion from './Accordion';

const Home = () => {
    return (
        <div className="max-w-[1280px] mx-auto mt-5" >
            <div className='mb-10'>
                <Banner />
            </div>
            <div>
                <h1 className=' text-3xl font-bold text-center m-5'> Advertisement</h1>
                <AllProperties />
            </div>
            <div className="my-24 mx-8">
                <LastReviews />
            </div>
            <div className="my-24 mx-8">
                <Contact />
            </div>
            <div className="my-24 mx-8">
                <h1 className="text-3xl font-bold my-16 text-center">Frequently Asked Questions</h1>
                <Accordion />
            </div>
        </div>
    );
};

export default Home;