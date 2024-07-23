"use client";

import { TFlatData } from "@/interfaces";
import React, { useState } from "react";
import TableRow from "./TableRow";
import MyListedCard from "./MyListedCard";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";

const MyPostedList = ({
  data,
  setRefresh,
}: {
  data: TFlatData[];
  setRefresh: any;
}) => {
  // handle delete flat function
  const deleteSingleFlat = async (flatId: string) => {
    const DeleteConfirm = window.confirm("Are you sure want to delete ?");

    if (DeleteConfirm) {
      try {
        const response = await axiosInstance.delete(`/flats/${flatId}`);

        if (response.data.success) {
          setRefresh(true);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-teal-50">
            <tr>
              <th className="w-1/4 px-4 py-2 text-left text-gray-600">Title</th>
              <th className="w-1/4 px-4 py-2 text-left text-gray-600">Rent</th>
              <th className="w-1/4 px-4 py-2 text-left text-gray-600">
                Location
              </th>
              <th className="w-1/4 px-4 py-2 text-left text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((flat, index) => (
              <TableRow
                key={index}
                flat={flat}
                deleteSingleFlat={deleteSingleFlat}
              ></TableRow>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="sm:hidden space-y-4">
        {data?.map((flat, index) => (
          <MyListedCard key={index} flat={flat}></MyListedCard>
        ))}
      </div>
    </div>
  );
};

export default MyPostedList;
