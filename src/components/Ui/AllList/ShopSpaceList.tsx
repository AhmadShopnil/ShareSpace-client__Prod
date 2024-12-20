"use client";

import SkeletonResFlatList from "@/components/Loading/SkeletonResFlatList";
import NotFoundData from "@/components/Shared/NotFoundData/NotFoundData";
import { useGetAllShopSpacesQuery } from "@/redux/api/shopSpaceApi";
import SpaceCardResponsive from "@/components/Shared/SpaceCard/SpaceCardResponsive";
import Pagination from "@/components/Shared/Pagination";
import { useEffect, useState } from "react";

const ShopSpaceList = ({
  queryString,
  setQueries,
}: {
  queryString: any;
  setQueries: any;
}) => {
  //  have to work on  this part
  // const cleandedQueryString = cleanQueryParams(queryString);
  // console.log("from ofices space", cleandedQueryString);
  const { data, isLoading } = useGetAllShopSpacesQuery(queryString);
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

  if (data?.shopSpaces?.shopSpaces?.length <= 0) {
    return <NotFoundData text="No Ofice Space Found"></NotFoundData>;
  }

  return (
    <div className="mt-2">
      <h1 className="mb-2 text-lg">
        For shop, Total: {data?.shopSpaces?.meta?.total}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-4 justify-around">
        {data?.shopSpaces?.shopSpaces?.map((shopSpace: any, index: number) => (
          <SpaceCardResponsive
            key={index}
            space={shopSpace}
            path="spaceDetails/shopSpace"
          />
        ))}
      </div>
      <Pagination
        currentPage={data?.shopSpaces?.meta?.page || 1}
        totalPages={data?.shopSpaces?.meta?.totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ShopSpaceList;
