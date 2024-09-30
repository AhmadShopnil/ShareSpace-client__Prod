"use client";

import SkeletonTable from "@/components/Loading/SkeletonTable";
import MyPostedList from "@/components/MyPostedTable/MyPostedLIst";

import { TFlatData } from "@/interfaces";
import { useGetMyAllFlatsQuery } from "@/redux/api/flatApi";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

const MyList = () => {
  const {data,isLoading,error}=useGetMyAllFlatsQuery('')

  if (error) {
    return <div>Error: <span>Something went wrong</span></div>; // Render error message if there's an error
  }
  if (isLoading) {
    return <SkeletonTable></SkeletonTable>;
  }

  return (
    <div className=" w-full">
      {data?.flats.length  > 0 ? (
        <MyPostedList data={data?.flats  }></MyPostedList>
      ) : (
        <div className="mx-auto w-3/4 md:w-1/3 p-4  mt-14 bg-teal-50">
          <h1 className="text-center">You Do not Post Any Flat/House </h1>
        </div>
      )}
    </div>
  );
};

export default MyList;
