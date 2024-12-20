"use client";

import React, { useState } from "react";
import { useDeleteFlatMutation } from "@/redux/api/flatApi";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal/ConfirmDeleteModal";
import { TFlatDataInRes } from "@/interfaces";
import { ListedCard } from "./ListedCard";
import { ListedTableRow } from "./ListedTableRow";
import UpdateSpaceModal from "./UpdateSpaceModal";
import { useDeleteShopSpaceMutation } from "@/redux/api/shopSpaceApi";
import { useDeleteWorkSpaceMutation } from "@/redux/api/workSpaceApi";

export const SpaceList = ({
  data,
  spaceType,
}: {
  data: TFlatDataInRes[];
  spaceType: string;
}) => {
  const [selectedItem, setSelectedItem] = useState<TFlatDataInRes | null>(null);
  const [deleteFlat] = useDeleteFlatMutation();
  const [deleteShopSpace] = useDeleteShopSpaceMutation();
  const [deleteWorkSpace] = useDeleteWorkSpaceMutation();
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
    if (spaceType === "homeSpace") {
      deleteFlat(selectedId);
    }
    if (spaceType === "workSpace") {
      deleteWorkSpace(selectedId);
    }
    if (spaceType === "shopSpace") {
      deleteShopSpace(selectedId);
    }
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
              <th className="w-1/4 px-5 py-2 text-left text-gray-600">
                Location
              </th>
              <th className="w-1/4 px-5 py-2 text-left text-gray-600">
                Availability
              </th>
              <th className="w-1/4 px-5 py-2 text-left text-gray-600">
                IsDeleted
              </th>
              <th className="w-1/4 px-5 py-2 text-left text-gray-600">
                Status
              </th>
              <th className="w-1/4 px-5 py-2  text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((flat: any, index) => (
              <ListedTableRow
                key={index}
                spaceInfo={flat}
                openModal={openModal}
                setSelectedId={setSelectedId}
                setUpdateModalOpen={setUpdateModalOpen}
                setSelectedItem={setSelectedItem}
              ></ListedTableRow>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="sm:hidden space-y-2 md:space-y-3">
        {data?.map((flat, index) => (
          <ListedCard
            key={index}
            spaceInfo={flat}
            openModal={openModal}
            setSelectedId={setSelectedId}
            setUpdateModalOpen={setUpdateModalOpen}
            setSelectedItem={setSelectedItem}
          ></ListedCard>
        ))}
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        handleDelete={handleDelete}
      ></ConfirmDeleteModal>

      {/* Update Bike Modal */}
      {selectedItem && (
        <UpdateSpaceModal
          spaceType={spaceType}
          selectedItem={selectedItem}
          onClose={handleCloseUpdateModal}
          isOpen={isUpdateModalOpen}
        />
      )}
    </div>
  );
};
