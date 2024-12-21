"use client";

import { SpaceList } from "@/components/Dashboard/SpaceManagement/SpaceList";
import SkeletonTable from "@/components/Loading/SkeletonTable";
import Pagination from "@/components/Shared/Pagination";
import { useGetAllFlatsByAdminQuery } from "@/redux/api/flatApi";
import { useState } from "react";

const Page = () => {
  const [page, setPage] = useState<number>(1); // Default to the first page
  const queryString = new URLSearchParams({
    page: page.toString(),
    limit: "10",
  }).toString();

  const {
    data: homeSpaces,
    isLoading: isLoadingFlats,
    error: errorFlats,
  } = useGetAllFlatsByAdminQuery(queryString);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      {/* Flats Section */}
      <div className="mb-4 md:mb-8">
        <h1 className="mb-2 md:mb-4 font-semibold">Home Spaces Management</h1>
        {isLoadingFlats ? (
          <SkeletonTable />
        ) : errorFlats ? (
          <p className="text-red-500">
            Error loading flats: Something went wrong! Try again later.
          </p>
        ) : homeSpaces?.flats?.flats?.length > 0 ? (
          <SpaceList spaceType="homeSpace" data={homeSpaces?.flats?.flats} />
        ) : (
          <p className="text-gray-500">No flats listed.</p>
        )}
      </div>

      {/* Pagination Section */}
      <Pagination
        currentPage={homeSpaces?.flats?.meta?.page || 1}
        totalPages={homeSpaces?.flats?.meta?.totalPage || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;
