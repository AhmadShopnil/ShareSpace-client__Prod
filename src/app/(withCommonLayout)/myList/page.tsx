"use client";

import SkeletonTable from "@/components/Loading/SkeletonTable";
import MyPostedList from "@/components/MyPostedTable/MyPostedLIst";

import { useGetMyAllFlatsQuery } from "@/redux/api/flatApi";
import { useGetAllWorkSpacesQuery } from "@/redux/api/shopSpaceApi";

import { useState, useEffect } from "react";

const MyList = () => {
  // const [myAllPostedList, setMyAllPostedList] = useState([{}]);

  const {
    data: FlatData,
    isLoading: isLoadingFlats,
    error: errorFlats,
  } = useGetMyAllFlatsQuery("");
  const {
    data: WorkSpaceData,
    isLoading: isLoadingWorkSpaces,
    error: errorWorkSpaces,
  } = useGetAllWorkSpacesQuery("");

  // useEffect(() => {
  //   if (FlatData?.flats && WorkSpaceData?.workSpaces) {
  //     // Combine flats and workspaces data
  //     const combinedData = [...FlatData.flats, ...WorkSpaceData.workSpaces];
  //     setMyAllPostedList(combinedData);
  //   }
  // }, [FlatData, WorkSpaceData]);

  if (errorFlats || errorWorkSpaces) {
    return (
      <div>
        Error: <span>Something went wrong</span>
      </div>
    ); // Render error message if there's an error
  }

  if (isLoadingFlats || isLoadingWorkSpaces) {
    return <SkeletonTable></SkeletonTable>;
  }

  return (
    <div className="w-full">
      {FlatData?.flats?.length > 0 ? (
        <MyPostedList data={FlatData?.flats}></MyPostedList>
      ) : (
        <div className="mx-auto w-3/4 md:w-1/3 p-4 mt-14 bg-teal-50">
          <h1 className="text-center">
            You Do not Post Any Flat/House or Workspace
          </h1>
        </div>
      )}
    </div>
  );
};

export default MyList;
