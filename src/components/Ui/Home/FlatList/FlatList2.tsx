// import FlatCard, { TFlat } from "@/components/Shared/FlatCard/FlatCard";
// import React from "react";

// const FlatListServer = async () => {
//   const res = await fetch("https://server-flate-share.vercel.app/api/flats");

//   const { data } = await res.json();
//   const flats: TFlat[] = data.flats;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
//       {flats.slice(3, 11).map((flat, index) => (
//         <FlatCard key={index} flat={flat} />
//       ))}
//     </div>
//   );
// };

// export default FlatListServer;
