import React from "react";

const SkeletonFlatCard = () => {
  return (
    <div className="rounded-lg p-4 overflow-hidden shadow-lg border border-teal-100 hover:border-teal-300 animate-pulse">
      <div className="max-w-sm max-h-80">
        {/* image section start */}
        <div className="bg-gray-200 h-36 rounded-lg overflow-hidden relative">
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="bg-gray-300 h-full w-full"></div>
          </div>
        </div>
        {/* end image section */}
        {/* content section  start*/}
        <div className="py-4">
          <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
        </div>
        <div className="pb-2 font-light">
          <div className="flex items-center">
            <div className="bg-gray-300 h-4 w-1/4"></div>
            <span className="bg-gray-300 h-4 w-1/2 ml-2"></span>
          </div>
          <div className="flex items-center mt-2">
            <div className="bg-gray-300 h-4 w-1/4"></div>
            <span className="bg-gray-300 h-4 w-1/2 ml-2"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonFlatList = () => {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonFlatCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonFlatList;
