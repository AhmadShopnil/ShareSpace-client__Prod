import {
  faBangladeshiTakaSign,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// export type TFlat = {
//   _id?: string;
//   title: string;
//   totalBedrooms: number;
//   location: string;
//   description: string;
//   rent: number;
//   advanceAmount: number;
//   images?: string[];
// };

const SpaceCardResponsive = ({ space, path }: { space: any; path: string }) => {
  const { title, location, rent, _id, images } = space;

  return (
    <Link
      className="rounded-md p-2 md:p-3 overflow-hidden shadow-sm border
     border-teal-100 hover:border-teal-300
      flex flex-row sm:flex-col  gap-6 "
      href={`/${path}/${_id}`}
    >
      {/* Image section start */}
      <div
        className="bg-gray-200 h-18 sm:h-36 w-20 sm:w-full sm:mr-4 rounded-md overflow-hidden
      relative flex-shrink-0"
      >
        {images && images.length > 0 ? (
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md object-cover "
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p className="text-xs text-center"> No Image Available</p>
          </div>
        )}
      </div>
      {/* End image section */}

      {/* Content section start */}
      <div className="  flex flex-col justify-center ">
        <p className="font-semibold text-xs md:text-xl mb-2 ">{title}</p>
        <div className="pb-2  text-[10px] font-light">
          <div className="flex  items-center ">
            <FontAwesomeIcon icon={faBangladeshiTakaSign} color="teal" />
            <span className="text-gray-600 ml-2 ">{rent} Per Month</span>
          </div>
          <div className="flex items-center mt-1 ">
            <FontAwesomeIcon icon={faLocationDot} color="teal" />
            <span className="text-gray-600 ml-2 ">{location}</span>
          </div>
        </div>
      </div>
      {/* End content section */}
    </Link>
  );
};

export default SpaceCardResponsive;
