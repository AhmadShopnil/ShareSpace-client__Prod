"use client";
import SkeletonResFlatList from "@/components/Loading/SkeletonResFlatList";

import FlatCardResponsive from "@/components/Shared/FlatCard/FlatCardResponsive";
import NotFoundData from "@/components/Shared/NotFoundData/NotFoundData";
import { TFlatDataInRes } from "@/interfaces";

import { useGetAllFlatsQuery } from "@/redux/api/flatApi";

const FlatList = () => {
  const { data, isLoading, error } = useGetAllFlatsQuery("");

  if (error) {
    return (
      <div>
        <h1>SomeThing Wrong!</h1>
      </div>
    ); // Render error message if there's an error
  }
  if (isLoading) {
    return <SkeletonResFlatList></SkeletonResFlatList>;
  }
  if (data?.flats?.flats?.length <= 0) {
    return <NotFoundData text="No Flat/Home List Found"></NotFoundData>;
  }

  return (
    <div>
      <h3 className="text-sm sm:text-lg  md:text-xl mb-4">Best For You- </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
        {data?.flats?.flats
          .slice(0, 7)
          .map((flat: TFlatDataInRes, index: number) => (
            // <FlatCard key={index} flat={flat} />

            <FlatCardResponsive key={index} space={flat} path={"flatDetails"} />
          ))}
      </div>
    </div>
  );
};

export default FlatList;
