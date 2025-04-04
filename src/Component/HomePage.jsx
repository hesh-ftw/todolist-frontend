import React, { useState } from 'react'
import landingImage from "/src/assets/todolanding.png";
import { Link } from 'react-router-dom';
function HomePage() {

  return (
    <div>

        <h1 className="text-3xl font-bold text-gray-800 m-10">
            Organize Your Tasks Effortlessly!
        </h1>
        <Link to="/account/register">
            <button className="bg-black text-white px-6 py-3 ml-10 rounded-lg text-lg font-semibold ">
            Get Started
            </button>
        </Link>
        <img src={landingImage} className='w-200 h-100 ml-100 ' style={{marginTop:-60}}/>

    </div>
  )
}

export default HomePage
