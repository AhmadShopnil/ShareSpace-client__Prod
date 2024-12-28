import React from "react";

const SkeletonFlatCardResponsive = () => {
  return (
    <div
      className="rounded-lg p-4 overflow-hidden shadow-lg border
     border-teal-100 hover:border-teal-300
      flex flex-row sm:flex-col gap-6 animate-pulse"
    >
      {/* Image section start */}
      <div className="bg-gray-300 h-24 sm:h-36 w-24 sm:w-full sm:mr-4 rounded-lg overflow-hidden relative flex-shrink-0"></div>
      {/* End image section */}

      {/* Content section start */}
      <div className="py-1 w-full">
        <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
        <div className="pb-2 font-light">
          <div className="flex items-center ">
            <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
            <span className="bg-gray-300 h-4 w-1/2 ml-2 rounded"></span>
          </div>
          <div className="flex items-center mt-2">
            <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
            <span className="bg-gray-300 h-4 w-1/2 ml-2 rounded"></span>
          </div>
        </div>
      </div>
      {/* End content section */}
    </div>
  );
};

const SkeletonResFlatList = () => {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-around">
      {Array.from({ length: 2 }).map((_, index) => (
        <SkeletonFlatCardResponsive key={index} />
      ))}
    </div>
  );
};

export default SkeletonResFlatList;
