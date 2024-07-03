import React from "react";
import FindHomeSvg from "../../../../assets/findHome-1.svg"; // Adjust the path based on your project structure
import Image from "next/image";
import findHome from "../../../../../public/findHome-1.svg";

// #3B82F6

const Hero = () => {
  return (
    <div className="bg-white =">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">
            Looking for a Home? We’ve Got You Covered
          </h1>
          <p className="text-gray-600 mb-6">
            Find the perfect home or the ideal flat in your area. Connect with
            others and create the living arrangement you’ve always wanted.
          </p>
          <div>
            <button className="bg-teal-500 text-white px-6 py-2 rounded mr-4">
              Post a Home
            </button>
            <button className="bg-teal-100 text-teal-500 px-6 py-2 rounded">
              Find a Home
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex justify-center">
          <Image
            src={findHome}
            alt="Flat sharing illustration"
            width={400} // Adjust width as needed
            height={400} // Adjust height as needed
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
