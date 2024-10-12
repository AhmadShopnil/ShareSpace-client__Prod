import { TFlat } from "@/components/Shared/FlatCard/FlatCard";
import FlatCardResponsive from "@/components/Shared/FlatCard/FlatCardResponsive";
import { TWorkSpace } from "@/interfaces";
import React, { useState } from "react";

const FeaturedWorkSpaceListSSR = async () => {
  let workSpaces: TWorkSpace[];

  try {
    const res = await fetch(
      "https://server-flate-share.vercel.app/api/workSpaces"
    );

    const { success, data, message } = await res.json();

    if (!success || !data.workSpaces || data.workSpaces.length === 0) {
      return (
        <div className="text-center text-gray-600">
          {success ? (
            <p>No Work/Office Spaces found.</p>
          ) : (
            <p>Failed to retrieve Work/Office Spaces: {message}</p>
          )}
        </div>
      );
    }

    workSpaces = data?.workSpaces;
  } catch (error) {
    return (
      <div className="text-center text-red-600">
        <p>Failed to load flats. Error from server, Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm sm:text-lg  md:text-xl mb-4">
        Best Work/Office Space For You-
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
        {workSpaces?.slice(0, 7).map((workSpace: TWorkSpace, index: number) => (
          <FlatCardResponsive
            key={index}
            space={workSpace}
            path={"workSpaceDetails"}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedWorkSpaceListSSR;
