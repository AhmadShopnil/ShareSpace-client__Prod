"use client";

import React, { useState } from "react";
import TableRow from "./TableRow";
import MyListedCard from "./MyListedCard";
import { useDeleteFlatMutation } from "@/redux/api/flatApi";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal/ConfirmDeleteModal";
import { TFlatDataInRes } from "@/interfaces";

const MyPostedList = ({ data }: { data: TFlatDataInRes[] }) => {
  const [deleteFlat] = useDeleteFlatMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  // handle modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // handle delete

  const handleDelete = () => {
    deleteFlat(selectedId);
  };

  return (
    <div className="">
      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto  ">
        <table className="w-full m-auto bg-white border border-gray-200">
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
              <TableRow
                key={index}
                flat={flat}
                openModal={openModal}
                setSelectedId={setSelectedId}
              ></TableRow>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="sm:hidden space-y-4">
        {data?.map((flat, index) => (
          <MyListedCard
            key={index}
            flat={flat}
            openModal={openModal}
            setSelectedId={setSelectedId}
          ></MyListedCard>
        ))}
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        handleDelete={handleDelete}
      ></ConfirmDeleteModal>
    </div>
  );
};

export default MyPostedList;