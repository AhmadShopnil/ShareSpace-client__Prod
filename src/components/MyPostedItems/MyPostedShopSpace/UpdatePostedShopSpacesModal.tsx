/* eslint-disable no-console */
"use client";

import { TFlatDataInRes, TWorkSpaceInRes } from "@/interfaces";
import { useUpdateShopSpaceMutation } from "@/redux/api/shopSpaceApi";
import { useState } from "react";

interface UpdatePostedWorkSpacesModalProps {
  selectedItem: TFlatDataInRes;
  onClose: () => void;
  isOpen: boolean;
}

export default function UpdatePostedShopSpacesModal({
  selectedItem,
  onClose,
  isOpen,
}: UpdatePostedWorkSpacesModalProps) {
  const [formData, setFormData] = useState<TWorkSpaceInRes>(selectedItem);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [updateShopSpace, { isLoading }] = useUpdateShopSpaceMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages([...selectedImages, ...files]);
      setPreviewImages([
        ...previewImages,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const uploadedImages = await Promise.all(
      selectedImages.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        return data.imageUrl;
      })
    );

    const data = {
      id: selectedItem?._id,
      updatedData: {
        title: formData?.title,
        location: formData?.location,
        rent: formData?.rent,
        advanceAmount: formData?.advanceAmount,
        description: formData?.description,
        images: [...formData.images, ...uploadedImages],
      },
    };

    try {
      await updateShopSpace(data);
      onClose();
    } catch (error) {
      console.log("Failed to update shop space:", error);
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
                    <label className="block text-sm font-medium text-gray-700">
                      Images
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {formData?.images?.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={img}
                            alt="Shop"
                            className="w-24 h-24 rounded-md object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {previewImages.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={img}
                            alt="Preview"
                            className="w-24 h-24 rounded-md object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-2"
                    />
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Info"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
