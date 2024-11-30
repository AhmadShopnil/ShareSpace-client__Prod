"use client";

import { TFlat } from "@/components/Shared/SpaceCard/SpaceCard";

import SkeletonResFlatList from "@/components/Loading/SkeletonResFlatList";
import NotFoundData from "@/components/Shared/NotFoundData/NotFoundData";

import { useGetAllWorkSpacesQuery } from "@/redux/api/workSpaceApi";
import SpaceCardResponsive from "@/components/Shared/SpaceCard/SpaceCardResponsive";

const WorkSpaceList = ({ queryString }: { queryString: any }) => {
  //  have to work on  this part
  // const cleandedQueryString = cleanQueryParams(queryString);

  // console.log("from ofices space", cleandedQueryString);
  const { data, isLoading } = useGetAllWorkSpacesQuery(queryString);

  if (isLoading) {
    return <SkeletonResFlatList></SkeletonResFlatList>;
  }

  if (data?.workSpaces?.workSpaces?.length <= 0) {
    return <NotFoundData text="No Ofice Space Found"></NotFoundData>;
  }

  return (
    <div className="mt-2">
      <h1 className="mb-2 text-lg">
        For Office, Total: {data?.workSpaces?.meta?.total}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
        {data?.workSpaces?.workSpaces.map((flat: TFlat, index: number) => (
          <SpaceCardResponsive
            key={index}
            space={flat}
            path={"workSpaceDetails"}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkSpaceList;
