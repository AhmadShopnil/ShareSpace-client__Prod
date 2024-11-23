// pages/featured-flats.tsx

import FlatCardResponsive from "@/components/Shared/FlatCard/FlatCardResponsive";
import { TFlatDataInRes } from "@/interfaces";
import { TApiResponse, TResponseFlat } from "@/interfaces/common";
import React from "react";

type Props = {
  flatData: TApiResponse<TResponseFlat>;
};

const FeaturedFlatList = ({ flatData }: Props) => {
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
      <h3 className="text-sm sm:text-lg md:text-xl mb-4">Best Home For You</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
        {flats.slice(0, 7).map((flat: TFlatDataInRes, index: number) => (
          <FlatCardResponsive key={index} space={flat} path="flatDetails" />
        ))}
      </div>
    </div>
  );
};

export default FeaturedFlatList;
