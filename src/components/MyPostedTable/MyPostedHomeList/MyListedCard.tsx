import { TFlatData } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faMapMarkerAlt,
  faHome,
  faBangladeshiTakaSign,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const MyListedCard = ({
  flat,
  openModal,
  setSelectedId,
}: {
  flat: TFlatData;
  openModal: any;
  setSelectedId: any;
}) => {
  const { title, location, rent, images, _id } = flat;

  const handleDeleteSingleFalt = () => {
    setSelectedId(_id);
    openModal();
  };

  return (
    <div className="bg-white p-4   rounded-lg shadow-md flex justify-between ">
      {/* details section */}
      <div className="w-2/3 text-xs text-gray-600">
        <div className="mb-2 flex items-center">
          <span className="font-bold text-sm">{title}</span>
        </div>
        <div className="mb-2 flex items-center">
          <FontAwesomeIcon
            icon={faBangladeshiTakaSign}
            className="mr-2 text-gray-700"
          />
          <span className="font-semibold "></span> {rent}{" "}
          <span className="text-[9px]"> /per month</span>
        </div>
        <div className="mb-2 flex items-center">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="mr-2 text-gray-700"
          />
          <span className="font-semibold "></span> {location}
        </div>
      </div>
      {/* image section */}
      <div className="w-1/3 flex gap-4">
        <div className="relative w-[80%] h-full">
          {images && images.length > 0 ? (
            <Image
              src={images[0]}
              alt={title}
              fill
              className="rounded-lg"
              sizes={"20"}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        {/* action buttons */}
        <div className="  flex flex-col justify-between">
          <button className="text-blue-500 hover:underline ">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            onClick={handleDeleteSingleFalt}
            className="text-red-500 hover:underline"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyListedCard;
