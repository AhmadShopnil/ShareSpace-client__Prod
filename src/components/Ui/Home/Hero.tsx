import React from "react";

import Image from "next/image";
import findHome from "../../../../public/findHome-1.svg";
import Link from "next/link";
import ShareSpaceButton from "@/components/Modal/ShareSpaceModal/ShareSpaceButton";

// #3B82F6

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center  ">
      {/* Left Side */}
      <div className="w-full md:w-1/2  z-10">
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
            href={`/allSpacesList`}
            className="text-xs sm:text-base px-4 py-2 sm:px-6  bg-teal-100
               text-teal-500  rounded"
          >
            Find for Rent
          </Link>
        </div>
      </div>
      {/* Right Side */}
      <div className=" w-full -mt-5 md:mt-0  md:w-1/2  flex justify-center z-0 ">
        <Image
          priority
          src={findHome} // Ensure the path is correct
          alt="Flat sharing illustration"
          width={400} // Explicit width
          height={400} // Explicit height
          sizes="(max-width: 768px) 50vw, 400px" // Adjust for responsiveness if needed
          quality={50} // Optional: Adjust quality for performance
          style={{ maxWidth: "100%", height: "auto" }} // Ensures responsive behavior
        />
      </div>
    </div>
  );
};

export default Hero;
