"use client";

import { SpaceList } from "@/components/Dashboard/SpaceManagement/SpaceList";
import SkeletonTable from "@/components/Loading/SkeletonTable";
import Pagination from "@/components/Shared/Pagination";
import { useGetAllShopSpacesByAdminQuery } from "@/redux/api/shopSpaceApi";
import { useState } from "react";

const Page = () => {
  const [page, setPage] = useState<number>(1); // Default to page 1
  const queryString = new URLSearchParams({
    page: page.toString(),
    limit: "10",
  }).toString();
  const { data, isLoading, error } =
    useGetAllShopSpacesByAdminQuery(queryString);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <div className="mb-4 md:mb-8">
        <h1 className="mb-2 md:mb-4 font-semibold">Shop Spaces Management:</h1>
        {isLoading ? (
          <SkeletonTable />
        ) : error ? (
          <p className="text-red-500">
            Error loading flats: Something went wrong! Try again later.
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

      <Pagination
        currentPage={data?.shopSpaces?.meta?.page || 1}
        totalPages={data?.shopSpaces?.meta?.totalPage || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;
