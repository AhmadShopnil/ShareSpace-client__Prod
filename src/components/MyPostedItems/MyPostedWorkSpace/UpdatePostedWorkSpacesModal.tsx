/* eslint-disable no-console */
"use client";

import { TFlatDataInRes, TWorkSpaceInRes } from "@/interfaces";
import { useUpdateWorkSpaceMutation } from "@/redux/api/workSpaceApi";
import { uploadImageToCLoudinary } from "@/utils/uploadImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";

interface UpdatePostedWorkSpacesModalProps {
  selectedItem: TFlatDataInRes;
  onClose: () => void;
  isOpen: boolean;
}

export default function UpdatePostedWorkSpacesModal({
  selectedItem,
  onClose,
  isOpen,
}: UpdatePostedWorkSpacesModalProps) {
  const [formData, setFormData] = useState<TWorkSpaceInRes>(selectedItem);
  const [updateWorkSpace, { isLoading }] = useUpdateWorkSpaceMutation();
  const [images, setImages] = useState<any>(selectedItem?.images || []);
  const [previewImages, setPreviewImages] = useState<any>(
    selectedItem?.images || []
  );
  const [newImages, setNewImages] = useState<File[]>([]);

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
      const selectedFiles = Array.from(e.target.files);
      setNewImages([...newImages, ...selectedFiles]);
      setPreviewImages([...previewImages, ...selectedFiles]);
    }
  };

  const handleImageRemove = (index: number) => {
    const updatedPreviewImages = previewImages.filter(
      (item: any, i: number) => i !== index
    );
    setPreviewImages(updatedPreviewImages);

    if (index < images.length) {
      setImages(images.filter((item: any, i: number) => i !== index));
    } else {
      setNewImages(newImages.filter((_, i) => i !== index - images.length));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let uploadedImageUrls = images;
      if (newImages.length > 0) {
        const cloudinaryUrls = await uploadImageToCLoudinary({
          images: newImages,
        });
        uploadedImageUrls = [...images, ...cloudinaryUrls];
      }

      const updatedData = {
        id: selectedItem?._id,
        updatedData: {
          title: formData.title,
          location: formData.location,
          rent: formData.rent,
          advanceAmount: formData.advanceAmount,
          description: formData.description,
          images: uploadedImageUrls,
          postStatus: "pending",
        },
      };

      await updateWorkSpace(updatedData);
      onClose();
    } catch (error) {
      console.error("Failed to update listing:", error);
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
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="advanceAmount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Advance Amount
                      </label>
                      <input
                        type="number"
                        id="advanceAmount"
                        name="advanceAmount"
                        value={formData.advanceAmount}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="rent"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Total Rent
                      </label>
                      <input
                        type="number"
                        id="rent"
                        name="rent"
                        value={formData.rent}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    {/* Custom File Input */}
                    <div className="flex flex-col mt-4">
                      <label
                        htmlFor="images"
                        className="text-sm text-gray-600 mb-1"
                      >
                        Update Images
                      </label>
                      <input
                        type="file"
                        id="images"
                        multiple
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded opacity-0 absolute "
                      />
                      <label
                        htmlFor="images"
                        className="cursor-pointer flex items-center gap-2 mt-2 text-sm text-gray-600 border p-2 rounded"
                      >
                        <FontAwesomeIcon
                          icon={faImage}
                          className="w-8 h-8 text-teal-500"
                        />

                        {images.length > 0
                          ? `${images.length} file(s) selected`
                          : "Choose Photos"}
                      </label>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {previewImages.map((image: any, index: number) => (
                        <div key={index} className="relative">
                          <Image
                            src={
                              typeof image === "string"
                                ? image
                                : URL.createObjectURL(image)
                            }
                            width={80}
                            height={80}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 text-red-500"
                            onClick={() => handleImageRemove(index)}
                          >
                            ✖
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-teal-600 text-white py-2 px-4 rounded"
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Info"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
