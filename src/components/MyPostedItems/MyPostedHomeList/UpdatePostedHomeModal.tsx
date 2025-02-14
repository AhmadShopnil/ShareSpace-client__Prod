"use client";

import { TFlatDataInRes } from "@/interfaces";
import { useUpdateFlatMutation } from "@/redux/api/flatApi";
import { uploadImageToCLoudinary } from "@/utils/uploadImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Image from "next/image";

interface UpdatePostedHomeModalProps {
  selectedItem: TFlatDataInRes;
  onClose: () => void;
  isOpen: boolean;
}

export default function UpdatePostedHomeModal({
  selectedItem,
  onClose,
  isOpen,
}: UpdatePostedHomeModalProps) {
  const [formData, setFormData] = useState<TFlatDataInRes>(selectedItem);
  const [updateFlat, { isLoading }] = useUpdateFlatMutation(); // Hook for updating bike
  const [images, setImages] = useState<any>(selectedItem?.images || []);
  const [previewImages, setPreviewImages] = useState<any>(
    selectedItem?.images || []
  );
  const [newImages, setNewImages] = useState<File[]>([]);

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
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

      const data = {
        id: selectedItem?._id,
        updatedData: {
          title: formData?.title,
          location: formData?.location,
          rent: formData?.rent,
          advanceAmount: formData?.advanceAmount,
          // category: formData?.category,
          homeSpaceType: formData?.homeSpaceType, // add the homeSpaceType here
          subletGender: formData?.subletGender, // add subletGender here if it's a sublet
          isLineGas: formData?.isLineGas,
          totalBedrooms: formData?.totalBedrooms,
          totalBathrooms: formData?.totalBathrooms,
          description: formData?.description,
          images: uploadedImageUrls,
          postStatus: "pending",
        },
      };

      await updateFlat(data);
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
                      htmlFor="isLineGas"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Line Gas
                    </label>
                    <select
                      id="isLineGas"
                      name="isLineGas"
                      value={formData.isLineGas}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {/* Home Space Type */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="homeSpaceType"
                      className="text-sm text-gray-600 mb-1"
                    >
                      Category
                    </label>
                    <select
                      id="homeSpaceType"
                      name="homeSpaceType"
                      value={formData.homeSpaceType}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="Family">Family</option>
                      <option value="Sublet">Sublet / Bachelor</option>
                      <option value="Any">Any</option>
                    </select>
                  </div>

                  {/* Sublet Gender Preference */}
                  {formData.homeSpaceType === "Sublet" && (
                    <div className="flex flex-col">
                      <label
                        htmlFor="subletGender"
                        className="text-sm text-gray-600 mb-1"
                      >
                        Sublet Gender Preference
                      </label>
                      <select
                        id="subletGender"
                        name="subletGender"
                        value={formData.subletGender}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Any">Any</option>
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="totalBathrooms"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Total Bathrooms
                      </label>
                      <input
                        type="number"
                        id="totalBathrooms"
                        name="totalBathrooms"
                        value={formData.totalBathrooms}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="totalBedrooms"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Total Bedrooms
                      </label>
                      <input
                        type="number"
                        id="totalBedrooms"
                        name="totalBedrooms"
                        value={formData.totalBedrooms}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>
                  {/* address field */}
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
                  {/* Description field */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    ></textarea>
                  </div>
                  {/* Custom File Input */}
                  <div>
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
                </form>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit}
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
          </div>
        </div>
      </div>
    </div>
  );
}
