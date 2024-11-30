import {
  faBangladeshiTakaSign,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export type TFlat = {
  _id?: string;
  title: string;
  totalBedrooms: number;
  location: string;
  description: string;
  rent: number;
  advanceAmount: number;
};

const SpaceCard = ({ flat }: { flat: any }) => {
  const { title, location, rent, _id, description, images } = flat;

  return (
    <Link
      className=" rounded-lg  p-4 overflow-hidden 
      shadow-lg border border-teal-100 hover:border-teal-300  "
      href={`/flatDetails/${_id}`}
    >
      <div className="max-w-sm max-h-80  ">
        {/* image section start */}
        <div className="bg-gray-200 h-36 rounded-lg overflow-hidden relative">
          {images && images.length > 0 ? (
            <Image src={images[0]} alt={title} fill className="rounded-lg" />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>
        {/* end image section */}
        {/* content section  start*/}
        <div className=" py-4">
          <p className="font-bold text-xl mb-2">{title}</p>
          {/* <p className="text-gray-700 text-sm  ">{description.slice(0, 40)}</p> */}
        </div>
        <div className="  pb-2 font-light ">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBangladeshiTakaSign} color="teal" />
            <span className="text-gray-600 ml-2  text-sm">
              {rent} Per Month
            </span>
          </div>
          <div className="flex items-center mt-2">
            <FontAwesomeIcon icon={faLocationDot} color="teal" />
            <span className="text-gray-600 ml-2 text-sm">{location}</span>
          </div>
        </div>
      </div>
      {/* <Link href={`/flatDetails/${_id}`} className="text-sm mt-1 text-teal-400">
        Details
      </Link> */}
    </Link>
  );
};

export default SpaceCard;
