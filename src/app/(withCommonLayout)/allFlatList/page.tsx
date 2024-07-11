import FlatCard, { TFlat } from "@/components/Shared/FlatCard/FlatCard";
import { TFlatData } from "@/interfaces";
import axios from "axios";

const AllFlatListPage = async () => {
  const res = await fetch("https://server-flate-share.vercel.app/api/flats");

  const { data: flats }: { data: TFlat[] } = await res.json();

  return (
    <div className="">
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
        {flats?.map((flat, index) => (
          <FlatCard key={index} flat={flat} />
        ))}
      </div>
    </div>
  );
};

export default AllFlatListPage;
