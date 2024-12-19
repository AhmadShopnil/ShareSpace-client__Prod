"use client";

import { TFlatDataInRes } from "@/interfaces";
import { useUpdateFlatMutation } from "@/redux/api/flatApi";
import { useUpdateShopSpaceMutation } from "@/redux/api/shopSpaceApi";
import { useUpdateWorkSpaceMutation } from "@/redux/api/workSpaceApi";
import { useState } from "react";

interface UpdateSpaceModalProps {
  selectedItem: TFlatDataInRes;
  onClose: () => void;
  isOpen: boolean;
  spaceType: string;
}

export default function UpdateSpaceModal({
  selectedItem,
  onClose,
  isOpen,
  spaceType,
}: UpdateSpaceModalProps) {
  const [formData, setFormData] = useState({
    availability: selectedItem.availability,
    isDeleted: selectedItem.isDeleted,
    postStatus: selectedItem.postStatus,
  });

  const [updateFlat, { isLoading: isUpdateHomeSpaceLoading }] =
    useUpdateFlatMutation();
  const [updateShopSpace, { isLoading: isUpdateShopSpaceLoading }] =
    useUpdateShopSpaceMutation();
  const [updateWorkSpace, { isLoading: isUpdateWorkSpaceLoading }] =
    useUpdateWorkSpaceMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  const data = {
    id: selectedItem?._id,
    updatedData: formData,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (spaceType === "homeSpace") {
        await updateFlat(data);
      }
      if (spaceType === "workSpace") {
        await updateWorkSpace(data);
      }
      if (spaceType === "shopSpace") {
        await updateShopSpace(data);
      }

      onClose();
    } catch (error) {
      console.error("Failed to update flat:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-2xl font-bold text-teal-700 mb-4">
                  Update Listing
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="availability"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Availability
                    </label>
                    <input
                      type="checkbox"
                      id="availability"
                      name="availability"
                      checked={formData.availability}
                      onChange={handleChange}
                      className="mt-1 h-5 w-5 text-teal-600 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="isDeleted"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mark as Deleted
                    </label>
                    <input
                      type="checkbox"
                      id="isDeleted"
                      name="isDeleted"
                      checked={formData.isDeleted}
                      onChange={handleChange}
                      className="mt-1 h-5 w-5 text-teal-600 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postStatus"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Post Status
                    </label>
                    <select
                      id="postStatus"
                      name="postStatus"
                      value={formData.postStatus}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit}
              disabled={
                isUpdateHomeSpaceLoading ||
                isUpdateShopSpaceLoading ||
                isUpdateWorkSpaceLoading
              }
            >
              {isUpdateHomeSpaceLoading ||
              isUpdateShopSpaceLoading ||
              isUpdateWorkSpaceLoading
                ? "Updating..."
                : "Update Info"}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
