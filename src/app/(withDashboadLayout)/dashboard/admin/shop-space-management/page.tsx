"use client";

import { SpaceList } from "@/components/Dashboard/SpaceManagement/SpaceList";
import SkeletonTable from "@/components/Loading/SkeletonTable";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import {
  useGetAllShopSpacesByAdminQuery,
  useGetAllShopSpacesQuery,
} from "@/redux/api/shopSpaceApi";

const Page = () => {
  const { data, isLoading, error } = useGetAllShopSpacesByAdminQuery("");

  return (
    <div>
      <div className="mb-4 md:mb-8">
        <h1 className="mb-2 md:mb-4 font-semibold">Shop Spaces Management:</h1>
        {isLoading ? (
          <SkeletonTable />
        ) : error ? (
          <p className="text-red-500">
            Error loading flats: Somthing Went Wrong ! Try later
          </p>
        ) : data?.shopSpaces?.shopSpaces?.length > 0 ? (
          <SpaceList
            spaceType="shopSpace"
            data={data?.shopSpaces?.shopSpaces}
          />
        ) : (
          <p className="text-gray-500">No flats listed.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
