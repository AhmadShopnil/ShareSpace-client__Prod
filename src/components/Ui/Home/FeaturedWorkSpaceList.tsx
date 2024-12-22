import FlatCardResponsive from "@/components/Shared/SpaceCard/SpaceCardResponsive";
import { TWorkSpaceInRes } from "@/interfaces";
import { TApiResponse, TResponseWokSpace } from "@/interfaces/common";
import Link from "next/link";

type Props = {
  workspacesData: TApiResponse<TResponseWokSpace>; // API response type with workSpaces
};

const FeaturedWorkSpaceList = ({ workspacesData }: Props) => {
  const { success, message, data } = workspacesData;
  const workSpaces = data?.workSpaces || []; // Extract workSpaces from the API response

  if (!success || workSpaces.length === 0) {
    return (
      <div className="text-center text-gray-600">
        {success ? (
          <p>No Work/Office Spaces found.</p>
        ) : (
          <p>
            Something Went Wrong!! Failed to retrieve-- Office Spaces /
            Workspaces
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <span className="text-sm sm:text-lg md:text-xl mb-4">
          Best Work/Shop Spaces
        </span>
        <Link
          href="/allSpacesList"
          className="text-teal-500 text-sm sm:text-lg"
        >
          See More
        </Link>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-3 
      lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 justify-around"
      >
        {workSpaces.slice(0, 9).map((workSpace: TWorkSpaceInRes, index) => (
          <FlatCardResponsive
            key={index}
            space={workSpace} // Passing workspace data to FlatCardResponsive
            path="spaceDetails/workSpace"
          />
        ))}
      </div>
      <div className=" mt-3 flex justify-center">
        <Link
          href="/allSpacesList"
          className="text-center bg-teal-500 text-white px-3 py-1 rounded-md text-xs sm:text-sm"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default FeaturedWorkSpaceList;
