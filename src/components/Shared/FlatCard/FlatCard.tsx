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

const FlatCard = ({ flat }: { flat: any }) => {
  const { title, location, rent, _id, description } = flat;

  return (
    <Link href={`/flatDetails/${_id}`}>
      <div className="max-w-sm rounded-lg  p-4 overflow-hidden shadow-lg border border-teal-100 hover:border-teal-300  ">
        {/* image section start*/}
        <div className="bg-gray-200 h-48 rounded-lg "></div>
        {/* end image section */}
        {/* content section  start*/}
        <div className=" py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-sm  ">{description.slice(0, 40)}</p>
        </div>
        <div className=" pt-4 pb-2 font-light ">
          <div className="flex items-center">
            <svg
              className="h-4 w-4 text-gray-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-6 14h6M5 13h14M7 10h10m-6 7v6m-6-6h6m0 0v-6"
              />
            </svg>
            <span className="text-gray-600  text-sm">{rent}</span>
          </div>
          <div className="flex items-center mt-2">
            <svg
              className="h-4 w-4 text-gray-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10l1.405-1.405a2 2 0 012.83 0L12 13.34l4.765-4.765a2 2 0 012.83 0L21 10m0 0l-9 9-9-9z"
              />
            </svg>
            <span className="text-gray-600 text-sm">{location}</span>
          </div>
        </div>
        <Link
          href={`/flatDetails/${_id}`}
          className="text-sm mt-4 text-teal-400"
        >
          Details
        </Link>
      </div>
    </Link>
  );
};

export default FlatCard;
