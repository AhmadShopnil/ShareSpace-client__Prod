"use client";

import { SpaceList } from "@/components/Dashboard/SpaceManagement/SpaceList";
import SkeletonTable from "@/components/Loading/SkeletonTable";
import Pagination from "@/components/Shared/Pagination";
import { useGetAllWorkSpacesByAdminQuery } from "@/redux/api/workSpaceApi";
import { useEffect, useState } from "react";

const Page = () => {
  const [queries, setQueries] = useState({});
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState<number>();

  // fetch data by rtk
  const { data, isLoading, error } =
    useGetAllWorkSpacesByAdminQuery(queryString);

  useEffect(() => {
    const query: { [key: string]: any } = {};
    query.page = page;
    query.limit = 10;
    setQueries(query);
    const originalQuery = new URLSearchParams(queries).toString();
    setQueryString(originalQuery);
  }, [page, queries]);

  // page change
  const handlePageChange = (page: number) => {
    setPage(page);
  };

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

      <Pagination
        currentPage={data?.workSpaces?.meta?.page || 1}
        totalPages={data?.workSpaces?.meta?.totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;
