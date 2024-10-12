import React from "react";

import Image from "next/image";
import findHome from "../../../../../public/findHome-1.svg";
import Link from "next/link";
import ShareSpaceButton from "@/components/Modal/ShareSpaceModal/ShareSpaceButton";

// #3B82F6

const Hero = () => {
  return (
    <div className="bg-white px-2 sm:px-0">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Looking for a Home? We’ve Got You Covered
          </h1>
          <p className="text-gray-600 mb-6 text-xs md:text-lg">
            Find the perfect home or the ideal flat in your area. Connect with
            others and create the living arrangement you’ve always wanted.
          </p>

          <div className="flex gap-4 md:gap-8">
            <ShareSpaceButton></ShareSpaceButton>
            <Link
              href={`/allFlatList`}
              className="text-xs sm:text-lg px-4 py-2 sm:px-6  bg-teal-100 text-teal-500  rounded"
            >
              Find for Rent
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex justify-center">
          <Image
            priority
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
