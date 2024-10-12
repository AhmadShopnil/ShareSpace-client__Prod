"use client";

import { TFlatData } from "@/interfaces";
import React, { useState } from "react";
import TableRow from "./TableRow";
import MyListedCard from "./MyListedCard";

const MyPostedWorkSpace = ({ data }: { data: TFlatData[] }) => {
  return (
    <div className="container mx-auto p-4">
      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="m-auto bg-white border border-gray-200">
          <thead className="bg-teal-50">
            <tr>
              <th className="w-1/4 px-5 py-2 text-left text-gray-600">Title</th>
              <th className="w-1/4 px-5 py-2 text-left text-gray-600">Rent</th>
              <th className="w-1/4 px-5 py-2 text-left text-gray-600">
                Location
              </th>
              <th className="w-1/4 px-5 py-2  text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((flat, index) => (
              <TableRow key={index} flat={flat}></TableRow>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="sm:hidden space-y-4">
        {/* <div>
<h1>All My Posted Home :</h1>

</div> */}

        {data?.map((flat, index) => (
          <MyListedCard key={index} flat={flat}></MyListedCard>
        ))}
      </div>
    </div>
  );
};

export default MyPostedWorkSpace;
