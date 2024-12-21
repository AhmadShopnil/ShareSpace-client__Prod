"use client";

import { SpaceList } from "@/components/Dashboard/SpaceManagement/SpaceList";
import SkeletonTable from "@/components/Loading/SkeletonTable";
import Pagination from "@/components/Shared/Pagination";
import { useGetAllFlatsByAdminQuery } from "@/redux/api/flatApi";
import { useEffect, useState } from "react";

const Page = () => {
  const [queries, setQueries] = useState({});
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState<number>();

  const {
    data: homeSpaces,
    isLoading: isLoadingFlats,
    error: errorFlats,
  } = useGetAllFlatsByAdminQuery(queryString);

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

      <Pagination
        currentPage={homeSpaces?.flats?.meta?.page || 1}
        totalPages={homeSpaces?.flats?.meta?.totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;
