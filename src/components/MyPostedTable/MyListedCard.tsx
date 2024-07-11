import { TFlatData } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faMapMarkerAlt,
  faMoneyBillWave,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const MyListedCard = ({ flat }: { flat: TFlatData }) => {
  const { title, location, rent, images } = flat;
  return (
    <div className="bg-teal-50 p-4 border border-teal-400 rounded-lg shadow-sm flex">
      {/* details section */}

      <div className="w-2/3 pr-4">
        <div className="mb-2 flex items-center">
          <FontAwesomeIcon icon={faHome} className="mr-2 text-gray-700" />
          <span className="font-semibold text-gray-700"></span> {title}
        </div>
        <div className="mb-2 flex items-center">
          <FontAwesomeIcon
            icon={faMoneyBillWave}
            className="mr-2 text-gray-700"
          />
          <span className="font-semibold text-gray-700"></span> {rent}
        </div>
        <div className="mb-2 flex items-center">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="mr-2 text-gray-700"
          />
          <span className="font-semibold text-gray-700"></span> {location}
        </div>
        <div>
          <button className="text-blue-500 hover:underline mr-4">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="text-red-500 hover:underline">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      {/* image section */}
      <div className="w-1/3">
        <div className="relative w-full h-full">
          {images && images.length > 0 ? (
            <Image
              src={images[0]}
              alt={title}
              layout="fill"
              className="rounded-lg"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyListedCard;
