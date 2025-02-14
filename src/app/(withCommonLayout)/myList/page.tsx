"use client";

import SkeletonResFlatList from "@/components/Loading/SkeletonResFlatList";
import SkeletonTable from "@/components/Loading/SkeletonTable";
import MyPostedList from "@/components/MyPostedItems/MyPostedHomeList/MyPostedHome";
import MyPostedShopSpace from "@/components/MyPostedItems/MyPostedShopSpace/MyPostedShopSpace";
import MyPostedWorkSpace from "@/components/MyPostedItems/MyPostedWorkSpace/MyPostedWorkSpace";
import { useGetMyAllFlatsQuery } from "@/redux/api/flatApi";
import { useGetMyAllShopSpacesQuery } from "@/redux/api/shopSpaceApi";
import { useGetMyAllWorkSpacesQuery } from "@/redux/api/workSpaceApi";
import { getUserInfo } from "@/services/authServices";
import { useRouter } from "next/navigation";

const MyList = () => {
  const {
    data: flatData,
    isLoading: isLoadingFlats,
    error: errorFlats,
  } = useGetMyAllFlatsQuery("");
  // const user: any = getUserInfo();
  // const router = useRouter();

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

  // if (user?.role !== "admin") {
  //   return router.push("/login");
  // }

  return (
    <div className="w-full pt-5">
      <div className="bg-gray-200 p-4">
        <h3 className="text-center text-teal-600">
          ভাড়া হয়ে গেলে পোস্ট ডিলেট করে দিবেন, ধন্যবাদ।
        </h3>
      </div>

      {/* Flats Section */}
      <div className="mb-4 md:mb-8 mt-4">
        <h1 className="mb-2 md:mb-4 font-semibold">My Listed Home:</h1>
        {isLoadingFlats ? (
          <>
            <div className="hidden md:block">
              <SkeletonTable />
            </div>
            <div className="md:hidden">
              <SkeletonResFlatList />
            </div>
          </>
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
          <>
            <div className="hidden md:block">
              <SkeletonTable />
            </div>
            <div className="md:hidden">
              <SkeletonResFlatList />
            </div>
          </>
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
          <>
            <div className="hidden md:block">
              <SkeletonTable />
            </div>
            <div className="md:hidden">
              <SkeletonResFlatList />
            </div>
          </>
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
