import React from 'react';
import UrlInputForm from '../components/urlinputform';

const Home = () => {
    return (
        <div className='ml-24 bg-gray-800 p-4 w-screen h-screen'>
            <h1 className='text-3xl font-bold text-center bg-teal-800 text-white p-2'>
                Home
            </h1>
            <p className='mt-2 border-2 border-gray-500 p-2 text-white'>This is the homepage of our mini project.</p>

            <UrlInputForm />
        </div>
    );
};

export default Home;