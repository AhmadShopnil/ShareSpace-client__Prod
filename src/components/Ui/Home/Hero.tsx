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
      <div className="w-full md:w-1/2   pt-5">
        <h1 className="text-xl md:text-4xl font-bold mb-4">
          Looking for spaces ? We’ve Got You Covered
        </h1>
        <p className="text-gray-600 mb-6 text-xs md:text-lg">
          Need a space in Tangail or have extra space to share? Tangail Space
          makes it easy and seamless!
        </p>
        {/* <p className="text-gray-600 mb-6 text-xs md:text-lg">
          Struggling to find the perfect space in Tangail for your work, events,
          or storage needs? Or maybe you have extra space sitting idle, wasting
          its potential? TangailSpaces is here to bridge the gap and make
          sharing seamless!
        </p> */}
        {/* <p className="text-gray-600 mb-6 text-xs md:text-lg">
          Find the perfect home or the ideal space for your ofice in your area.
          Connect with others and create the arrangement you’ve always wanted.
        </p> */}

        <div className="flex gap-3 md:gap-4 ">
          <ShareSpaceButton></ShareSpaceButton>
          <Link
            href="/allSpacesList"
            className="text-sm sm:text-base px-4 py-2 sm:px-6  bg-teal-100
               text-teal-500 rounded z-10"
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
