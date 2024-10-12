"use client";

import SkeletonTable from "@/components/Loading/SkeletonTable";
import MyPostedList from "@/components/MyPostedTable/MyPostedHomeList/MyPostedHome";
import MyPostedWorkSpace from "@/components/MyPostedTable/MyPostedWorkSpace/MyPostedWorkSpace";

import { useGetMyAllFlatsQuery } from "@/redux/api/flatApi";

import { useGetMyAllWorkSpacesQuery } from "@/redux/api/workSpaceApi";

const MyList = () => {
  const {
    data: flatData,
    isLoading: isLoadingFlats,
    error: errorFlats,
  } = useGetMyAllFlatsQuery("");
  const {
    data: workSpaceData,
    isLoading: isLoadingWorkSpaces,
    error: errorWorkSpaces,
  } = useGetMyAllWorkSpacesQuery("");

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
      {flatData?.flats?.length > 0 || workSpaceData?.workSpaces?.length > 0 ? (
        <div className="px-4">
          <div className="mb-8">
            <h1 className="mb-2 font-semibold">My Listed Home :</h1>
            <MyPostedList data={flatData?.flats}></MyPostedList>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">
              My Listed Work/Office Spaces :
            </h1>
            <MyPostedWorkSpace
              WorkSpaces={workSpaceData?.workSpaces}
            ></MyPostedWorkSpace>
          </div>
        </div>
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
