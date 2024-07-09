import FlatCard, { TFlat } from "@/components/Shared/FlatCard/FlatCard";

const AllFlatListPage = async () => {
  const res = await fetch("https://server-flate-share.vercel.app/api/flats");
  const { data }: { data: TFlat[] } = await res.json();

  return (
    <div className="">
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
        {data.map((flat, index) => (
          <FlatCard key={index} flat={flat} />
        ))}
      </div>
    </div>
  );
};

export default AllFlatListPage;
