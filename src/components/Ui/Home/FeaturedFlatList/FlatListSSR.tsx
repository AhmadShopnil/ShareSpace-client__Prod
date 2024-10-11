import { TFlat } from "@/components/Shared/FlatCard/FlatCard";
import FlatCardResponsive from "@/components/Shared/FlatCard/FlatCardResponsive";
import React, { useState } from "react";

const FlatListSSR = async () => {
  let flats: TFlat[];

  try {
    const res = await fetch("https://server-flate-share.vercel.app/api/flats");

    const { success, data, message } = await res.json();

    if (!success || !data.flats || data.flats.length === 0) {
      return (
        <div className="text-center text-gray-600">
          {success ? (
            <p>No flats found.</p>
          ) : (
            <p>Failed to retrieve flats: {message}</p>
          )}
        </div>
      );
    }

    flats = data?.flats;
  } catch (error) {
    return (
      <div className="text-center text-red-600">
        <p>Failed to load flats. Error from server, Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
      {flats?.slice(0, 7).map((flat: TFlat, index: number) => (
        <FlatCardResponsive key={index} flat={flat} path={"flatDetails"} />
      ))}
    </div>
  );
};

export default FlatListSSR;
