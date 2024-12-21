"use client";

import { SpaceList } from "@/components/Dashboard/SpaceManagement/SpaceList";
import SkeletonTable from "@/components/Loading/SkeletonTable";
import Pagination from "@/components/Shared/Pagination";
import { useGetAllWorkSpacesByAdminQuery } from "@/redux/api/workSpaceApi";
import { useState } from "react";

const Page = () => {
  const [page, setPage] = useState<number>(1); // Default to page 1
  const queryString = new URLSearchParams({
    page: page.toString(),
    limit: "10",
  }).toString();

  // Fetch data using RTK query
  const { data, isLoading, error } =
    useGetAllWorkSpacesByAdminQuery(queryString);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="mb-4 md:mb-8">
        <h1 className="mb-2 md:mb-4 font-semibold">
          Work / Office Spaces Management:
        </h1>
        {isLoading ? (
          <SkeletonTable />
        ) : error ? (
          <p className="text-red-500">
            Error loading workspaces: Something went wrong! Please try again
            later.
          </p>
        ) : data?.workSpaces?.workSpaces?.length > 0 ? (
          <SpaceList
            spaceType="workSpace"
            data={data?.workSpaces?.workSpaces}
          />
        ) : (
          <p className="text-gray-500">No workspaces listed.</p>
        )}
      </div>

      <Pagination
        currentPage={data?.workSpaces?.meta?.page || 1}
        totalPages={data?.workSpaces?.meta?.totalPage || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;
