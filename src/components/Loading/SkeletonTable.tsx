// components/SkeletonTable.js
import React from "react";

const SkeletonTable = () => {
  return (
    <div className="animate-pulse">
      {[...Array(5)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex mb-4">
          <div className="h-4 bg-gray-300 rounded w-1/5 mr-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mr-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mr-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
