"use client";

import { TFlat } from "@/components/Shared/SpaceCard/SpaceCard";

import SkeletonResFlatList from "@/components/Loading/SkeletonResFlatList";
import NotFoundData from "@/components/Shared/NotFoundData/NotFoundData";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import SpaceCardResponsive from "@/components/Shared/SpaceCard/SpaceCardResponsive";

const HomeList = ({ queryString }: { queryString: any }) => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 justify-around">
        {data?.flats?.flats.map((flat: TFlat, index: number) => (
          <SpaceCardResponsive
            key={index}
            space={flat}
            path="spaceDetails/home"
          />
        ))}
      </div>
    </div>
  );
};

export default HomeList;
