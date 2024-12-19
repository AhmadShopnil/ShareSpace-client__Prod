"use client";

import { SpaceList } from "@/components/Dashboard/SpaceManagement/SpaceList";
import SkeletonTable from "@/components/Loading/SkeletonTable";
import { useGetAllFlatsByAdminQuery } from "@/redux/api/flatApi";

const Page = () => {
  const {
    data: homeSpaces,
    isLoading: isLoadingFlats,
    error: errorFlats,
  } = useGetAllFlatsByAdminQuery("");

  return (
    <div>
      {/* Flats Section */}
      <div className="mb-4 md:mb-8">
        <h1 className="mb-2 md:mb-4 font-semibold">Home Spaces Management</h1>
        {isLoadingFlats ? (
          <SkeletonTable />
        ) : errorFlats ? (
          <p className="text-red-500">
            Error loading flats: Somthing Went Wrong ! Try later
          </p>
        ) : homeSpaces?.flats?.flats?.length > 0 ? (
          <SpaceList spaceType="homeSpace" data={homeSpaces?.flats?.flats} />
        ) : (
          <p className="text-gray-500">No flats listed.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
