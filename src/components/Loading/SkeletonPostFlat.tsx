// components/Ui/Skeleton/SkeletonPostFlat.tsx
import React from "react";

const SkeletonPostFlat = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <h1 className="text-3xl font-semibold mb-12  h-8 w-1/3 rounded">
        Uploading information
      </h1>
      <div className="space-y-4">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 bg-gray-300 h-6 md:w-1/4 rounded"></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <div className="text-sm text-gray-600 bg-gray-300 h-4 md:w-1/2 rounded"></div>
                <div className="bg-gray-300 h-10 rounded"></div>
              </div>
            ))}
          </div>
          <div className="flex flex-col mt-4 space-y-2">
            <div className="text-sm text-gray-600 bg-gray-300 h-4 md:w-1/2 rounded"></div>
            <div className="bg-gray-300 h-10 rounded"></div>
          </div>
        </div>
        <div className="bg-teal-600 h-10 w-32 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonPostFlat;
