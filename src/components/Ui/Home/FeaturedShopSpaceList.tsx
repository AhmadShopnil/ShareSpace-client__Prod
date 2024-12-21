import FlatCardResponsive from "@/components/Shared/SpaceCard/SpaceCardResponsive";
import { TWorkSpaceInRes } from "@/interfaces";
import { TApiResponse, TResponseWokSpace } from "@/interfaces/common";
import Link from "next/link";

type Props = {
  shopSpacesData: TApiResponse<any>; // API response type with workSpaces
};

const FeaturedShopSpaceList = ({ shopSpacesData }: Props) => {
  const { success, message, data } = shopSpacesData;

  const shopSpaces = data?.shopSpaces || []; // Extract workSpaces from the API response

  if (!success || shopSpaces.length === 0) {
    return (
      <div className="text-center text-gray-600">
        {success ? (
          <p>No Shop Spaces found.</p>
        ) : (
          <p>
            Something Went Wrong!! Failed to retrieve-- Shop Spaces / Workspaces
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <span className="text-sm sm:text-lg md:text-xl mb-4">
          Best Shop Spaces
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
        {shopSpaces
          .slice(0, 9)
          .map((shopSpace: TWorkSpaceInRes, index: number) => (
            <FlatCardResponsive
              key={index}
              space={shopSpace} // Passing workspace data to FlatCardResponsive
              path="spaceDetails/shopSpace"
            />
          ))}
      </div>
    </div>
  );
};

export default FeaturedShopSpaceList;
