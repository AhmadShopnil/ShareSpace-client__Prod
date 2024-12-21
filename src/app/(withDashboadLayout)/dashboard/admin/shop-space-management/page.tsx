"use client";

import { SpaceList } from "@/components/Dashboard/SpaceManagement/SpaceList";
import SkeletonTable from "@/components/Loading/SkeletonTable";
import Pagination from "@/components/Shared/Pagination";
import { useGetAllShopSpacesByAdminQuery } from "@/redux/api/shopSpaceApi";
import { useEffect, useState } from "react";

const Page = () => {
  const [queries, setQueries] = useState({});
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState<number>();
  const { data, isLoading, error } =
    useGetAllShopSpacesByAdminQuery(queryString);

  useEffect(() => {
    const query: { [key: string]: any } = {};
    query.page = page;
    query.limit = 10;

    setQueries(query);

    const originalQuery = new URLSearchParams(queries).toString();
    setQueryString(originalQuery);
  }, [page, queries]);

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

      <Pagination
        currentPage={data?.shopSpaces?.meta?.page || 1}
        totalPages={data?.shopSpaces?.meta?.totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;
