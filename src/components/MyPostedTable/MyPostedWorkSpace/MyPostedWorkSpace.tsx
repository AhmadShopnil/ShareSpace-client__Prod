"use client";

import React, { useState } from "react";
import MyWorkSpaceTableRow from "./MyWorkSpaceTableRow";
import MyWorkSpaceCard from "./MyWorkSpaceCard";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal/ConfirmDeleteModal";
import { useDeleteWorkSpaceMutation } from "@/redux/api/workSpaceApi";
import { TWorkSpaceInRes } from "@/interfaces";

const MyPostedWorkSpace = ({
  WorkSpaces,
}: {
  WorkSpaces: TWorkSpaceInRes[];
}) => {
  const [deleteWorkSpace, { isError, error }] = useDeleteWorkSpaceMutation();
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

  const handleDelete = async () => {
    await deleteWorkSpace(selectedId);
  };

  // if (isError) {
  //   console.log("delete eere", error);
  // }
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
              <MyWorkSpaceTableRow
                key={index}
                workSpace={workSpace}
                openModal={openModal}
                setSelectedId={setSelectedId}
              ></MyWorkSpaceTableRow>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="sm:hidden space-y-4">
        {WorkSpaces?.map((workSpace, index) => (
          <MyWorkSpaceCard
            key={index}
            workSpace={workSpace}
            openModal={openModal}
            setSelectedId={setSelectedId}
          ></MyWorkSpaceCard>
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

export default MyPostedWorkSpace;
