"use client";

import React, { useState } from "react";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal/ConfirmDeleteModal";
import { useDeleteWorkSpaceMutation } from "@/redux/api/workSpaceApi";
import { TFlatDataInRes, TWorkSpaceInRes } from "@/interfaces";
import UpdatePostedWorkSpacesModal from "./UpdatePostedWorkSpacesModal";
import MyListedTableRow from "../MyListedTableRow";
import MyListedCard from "../MyListedCard";

const MyPostedWorkSpace = ({
  WorkSpaces,
}: {
  WorkSpaces: TWorkSpaceInRes[];
}) => {
  const [deleteWorkSpace, { isError, error }] = useDeleteWorkSpaceMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TFlatDataInRes | null>(null);

  // handle modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // handle delete
  const handleDelete = async () => {
    await deleteWorkSpace(selectedId);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="">
      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className=" w-full m-auto bg-white border border-gray-200">
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
            {WorkSpaces?.map((workSpace: TWorkSpaceInRes, index) => (
              <MyListedTableRow
                key={index}
                spaceInfo={workSpace}
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
      <div className="sm:hidden space-y-2 md:space-y-3">
        {WorkSpaces?.map((workSpace, index) => (
          <MyListedCard
            key={index}
            spaceInfo={workSpace}
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
        <UpdatePostedWorkSpacesModal
          selectedItem={selectedItem}
          onClose={handleCloseUpdateModal}
          isOpen={isUpdateModalOpen}
        />
      )}
    </div>
  );
};

export default MyPostedWorkSpace;
