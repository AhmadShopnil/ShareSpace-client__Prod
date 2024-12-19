"use client";

import { SpaceList } from "@/components/Dashboard/SpaceManagement/SpaceList";
import SkeletonTable from "@/components/Loading/SkeletonTable";

import { useGetAllWorkSpacesByAdminQuery } from "@/redux/api/workSpaceApi";

const Page = () => {
  const { data, isLoading, error } = useGetAllWorkSpacesByAdminQuery("");

  return (
    <div>
      <div className="mb-4 md:mb-8">
        <h1 className="mb-2 md:mb-4 font-semibold">
          Work /Office Spaces Management:
        </h1>
        {isLoading ? (
          <SkeletonTable />
        ) : error ? (
          <p className="text-red-500">
            Error loading flats: Somthing Went Wrong ! Try later
          </p>
        ) : data?.workSpaces?.workSpaces?.length > 0 ? (
          <SpaceList
            spaceType="workSpace"
            data={data?.workSpaces?.workSpaces}
          />
        ) : (
          <p className="text-gray-500">No flats listed.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
