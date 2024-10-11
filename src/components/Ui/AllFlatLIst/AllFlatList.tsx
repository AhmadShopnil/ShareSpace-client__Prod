"use client";

import { TFlat } from "@/components/Shared/FlatCard/FlatCard";

import SkeletonFlatList from "@/components/Loading/SkeletonFlaList";
import FlatCardResponsive from "@/components/Shared/FlatCard/FlatCardResponsive";
import SkeletonResFlatList from "@/components/Loading/SkeletonResFlatList";
import NotFoundData from "@/components/Shared/NotFoundData/NotFoundData";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";

const AllFlatList = ({ queryString }: { queryString: any }) => {
  const { data, isLoading } = useGetAllFlatsQuery(queryString);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
        {data?.flats?.flats.map((flat: TFlat, index: number) => (
          <FlatCardResponsive key={index} flat={flat} path={"flatDetails"} />
        ))}
      </div>
    </div>
  );
};

export default AllFlatList;
