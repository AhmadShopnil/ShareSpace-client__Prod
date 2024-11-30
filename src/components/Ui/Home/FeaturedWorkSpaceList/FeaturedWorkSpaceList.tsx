import FlatCardResponsive from "@/components/Shared/SpaceCard/SpaceCardResponsive";
import { TWorkSpaceInRes } from "@/interfaces";
import { TApiResponse, TResponseWokSpace } from "@/interfaces/common";

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
      <h3 className="text-sm sm:text-lg md:text-xl mb-4">
        Best Work/Office Spaces For You
      </h3>
      <div
        className="grid grid-cols-1 sm:grid-cols-3 
      lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-around"
      >
        {workSpaces.slice(0, 9).map((workSpace: TWorkSpaceInRes, index) => (
          <FlatCardResponsive
            key={index}
            space={workSpace} // Passing workspace data to FlatCardResponsive
            path="workSpaceDetails"
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedWorkSpaceList;
