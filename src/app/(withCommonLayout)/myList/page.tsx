"use client";

import SkeletonTable from "@/components/Loading/SkeletonTable";
import MyPostedList from "@/components/MyPostedItems/MyPostedHomeList/MyPostedHome";
import MyPostedShopSpace from "@/components/MyPostedItems/MyPostedShopSpace/MyPostedShopSpace";
import MyPostedWorkSpace from "@/components/MyPostedItems/MyPostedWorkSpace/MyPostedWorkSpace";

import { useGetMyAllFlatsQuery } from "@/redux/api/flatApi";
import {
  useGetAllShopSpacesQuery,
  useGetMyAllShopSpacesQuery,
} from "@/redux/api/shopSpaceApi";
import { useGetMyAllWorkSpacesQuery } from "@/redux/api/workSpaceApi";

const MyList = () => {
  const {
    data: flatData,
    isLoading: isLoadingFlats,
    error: errorFlats,
  } = useGetMyAllFlatsQuery("");

  const {
    data: workSpaceData,
    isLoading: isLoadingWorkSpaces,
    error: errorWorkSpaces,
  } = useGetMyAllWorkSpacesQuery("");

  const {
    data: shopSpaceData,
    isLoading: isLoadingShopSpaces,
    error: errorShopSpaces,
  } = useGetMyAllShopSpacesQuery("");

  return (
    <div className="w-full pt-5">
      {/* Flats Section */}
      <div className="mb-4 md:mb-8">
        <h1 className="mb-2 md:mb-4 font-semibold">My Listed Home:</h1>
        {isLoadingFlats ? (
          <SkeletonTable />
        ) : errorFlats ? (
          <p className="text-red-500">
            Error loading flats: Somthing Went Wrong ! Try later
          </p>
        ) : flatData?.flats?.length > 0 ? (
          <MyPostedList data={flatData?.flats} />
        ) : (
          <p className="text-gray-500">No flats listed.</p>
        )}
      </div>

      {/* Workspaces Section */}
      <div className="mb-4 md:mb-8">
        <h1 className="mb-2 md:mb-4 font-semibold">
          My Listed Work/Office Spaces:
        </h1>
        {isLoadingWorkSpaces ? (
          <SkeletonTable />
        ) : errorWorkSpaces ? (
          <p className="text-red-500">
            Error loading workspaces: Somthing Went Wrong ! Try later
          </p>
        ) : workSpaceData?.workSpaces?.length > 0 ? (
          <MyPostedWorkSpace WorkSpaces={workSpaceData?.workSpaces} />
        ) : (
          <p className="text-gray-500">No workspaces listed.</p>
        )}
      </div>

      {/* Shop Spaces Section */}
      <div>
        <h1 className="mb-2 md:mb-4 font-semibold">My Listed Shop Spaces:</h1>
        {isLoadingShopSpaces ? (
          <SkeletonTable />
        ) : errorShopSpaces ? (
          <p className="text-red-500">
            Error loading shop spaces: Somthing Went Wrong ! Try later
          </p>
        ) : shopSpaceData?.shopSpaces?.length > 0 ? (
          <MyPostedShopSpace shopSpaces={shopSpaceData?.shopSpaces} />
        ) : (
          <p className="text-gray-500">No shop spaces listed.</p>
        )}
      </div>

      {/* Message if all sections are empty */}
      {!(flatData?.flats?.length > 0) &&
        !(workSpaceData?.workSpaces?.length > 0) &&
        !(shopSpaceData?.shopSpaces?.length > 0) &&
        !isLoadingFlats &&
        !isLoadingWorkSpaces &&
        !isLoadingShopSpaces && (
          <div className="mx-auto w-3/4 md:w-1/3 p-4 mt-14 bg-teal-50">
            <h1 className="text-center">
              You do not have any listed Flats/Houses, Workspaces, or Shop
              Spaces.
            </h1>
          </div>
        )}
    </div>
  );
};

export default MyList;
