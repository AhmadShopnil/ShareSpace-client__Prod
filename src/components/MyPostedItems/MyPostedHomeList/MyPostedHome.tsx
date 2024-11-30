"use client";

import React, { useState } from "react";
import { useDeleteFlatMutation } from "@/redux/api/flatApi";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal/ConfirmDeleteModal";
import { TFlatDataInRes } from "@/interfaces";
import UpdatePostedHomeModal from "./UpdatePostedHomeModal";
import MyListedTableRow from "../MyListedTableRow";
import MyListedCard from "../MyListedCard";

const MyPostedList = ({ data }: { data: TFlatDataInRes[] }) => {
  const [selectedItem, setSelectedItem] = useState<TFlatDataInRes | null>(null);
  const [deleteFlat] = useDeleteFlatMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

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

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedItem(null);
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
              <MyListedTableRow
                key={index}
                spaceInfo={flat}
                openModal={openModal}
                setSelectedId={setSelectedId}
                setUpdateModalOpen={setUpdateModalOpen}
                setSelectedItem={setSelectedItem}
              ></MyListedTableRow>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="sm:hidden space-y-4">
        {data?.map((flat, index) => (
          <MyListedCard
            key={index}
            spaceInfo={flat}
            openModal={openModal}
            setSelectedId={setSelectedId}
            setUpdateModalOpen={setUpdateModalOpen}
            setSelectedItem={setSelectedItem}
          ></MyListedCard>
        ))}
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        handleDelete={handleDelete}
      ></ConfirmDeleteModal>

      {/* Update Bike Modal */}
      {selectedItem && (
        <UpdatePostedHomeModal
          selectedItem={selectedItem}
          onClose={handleCloseUpdateModal}
          isOpen={isUpdateModalOpen}
        />
      )}
    </div>
  );
};

export default MyPostedList;
