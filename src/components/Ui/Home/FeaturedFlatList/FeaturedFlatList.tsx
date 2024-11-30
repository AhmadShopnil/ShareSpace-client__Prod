// pages/featured-flats.tsx

import FlatCardResponsive from "@/components/Shared/SpaceCard/SpaceCardResponsive";
import { TFlatDataInRes } from "@/interfaces";
import { TApiResponse, TResponseFlat } from "@/interfaces/common";
import React from "react";

type Props = {
  flatData: TApiResponse<TResponseFlat>;
};

const FeaturedFlatList = ({ flatData }: Props) => {
  // console.log("flat data", flatData);
  const { success, message, data } = flatData;
  const flats = data?.flats || [];

  if (!success || flats.length === 0) {
    return (
      <div className="text-center text-gray-600">
        {success ? (
          <p>No flats found.</p>
        ) : (
          <p>Something Went Wrong!! Failed to retrieve House</p>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Update heading level to <h2> or ensure it's logically following an <h1>/<h2> */}
      <h2 className="text-sm sm:text-lg md:text-xl mb-4">Best Home For You</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-around"
      >
        {flats.slice(0, 9).map((flat: TFlatDataInRes, index: number) => (
          <FlatCardResponsive key={index} space={flat} path="flatDetails" />
        ))}
      </div>
    </div>
  );
};

export default FeaturedFlatList;
