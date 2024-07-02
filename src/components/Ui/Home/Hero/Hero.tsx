import React from "react";

const Hero = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6">
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">
            Looking for a Flatmate? We’ve Got You Covered
          </h1>
          <p className="text-gray-600 mb-6">
            Find the perfect flatmate or the ideal flat in your area. Connect
            with others and create the living arrangement you’ve always wanted.
          </p>
          <div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded mr-4">
              Post a Flat
            </button>
            <button className="bg-blue-100 text-blue-500 px-6 py-2 rounded">
              Find a Flatmate
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex justify-center">
          {/* <img src="/path-to-your-image.png" alt="Flat sharing illustration" className="max-w-full h-auto" /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
