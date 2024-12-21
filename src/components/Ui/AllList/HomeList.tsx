"use client";

import { TFlat } from "@/components/Shared/SpaceCard/SpaceCard";
import SkeletonResFlatList from "@/components/Loading/SkeletonResFlatList";
import NotFoundData from "@/components/Shared/NotFoundData/NotFoundData";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import SpaceCardResponsive from "@/components/Shared/SpaceCard/SpaceCardResponsive";
import Pagination from "@/components/Shared/Pagination";
import { useEffect, useState } from "react";

const HomeList = ({
  queryString,
  setQueries,
}: {
  queryString: any;
  setQueries: any;
}) => {
  const { data, isLoading } = useGetAllFlatsQuery(queryString);

  const [page, setPage] = useState<number>();

  useEffect(() => {
    const query: { [key: string]: any } = {};
    query.page = page;
    query.limit = 10;

    setQueries(query);
  }, [page, setQueries]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) {
    return <SkeletonResFlatList></SkeletonResFlatList>;
  }

  if (data?.flats?.flats?.length <= 0) {
    return <NotFoundData text="No Flat/Home List Found"></NotFoundData>;
  }

  return (
    <div className="mt-2">
      <h1 className="mb-2 text-lg">
        For Home, Total: {data?.flats?.meta?.total}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-4 justify-around">
        {data?.flats?.flats.map((flat: TFlat, index: number) => (
          <SpaceCardResponsive
            key={index}
            space={flat}
            path="spaceDetails/home"
          />
        ))}
      </div>

      <Pagination
        currentPage={data?.flats?.meta?.page || 1}
        totalPages={data?.flats?.meta?.totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomeList;
