"use client";

import React, { useState } from "react";
import { TUserData } from "@/interfaces";
import { uploadImageToCLoudinary } from "@/utils/uploadImage";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import SkeletonPostFlat from "@/components/Loading/SkeletonPostFlat";
import { TFlatPyload } from "@/interfaces/flat";
import { useCreateShopSpaceMutation } from "@/redux/api/shopSpaceApi";

export const ShopSpaceForm = () => {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [uploadingImage, setUpLoadingImage] = useState(false);
  const [createShopSpace, { isLoading }] = useCreateShopSpaceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFlatPyload & TUserData>();

  // set image to state form input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const images = Array.from(e.target.files);
      setImages(images);
    }
  };

  // handle post space submit button
  const onSubmit: SubmitHandler<TFlatPyload & TUserData> = async (data) => {
    setUpLoadingImage(true);
    try {
      let uploadImageUrls = null;
      if (images) {
        uploadImageUrls = await uploadImageToCLoudinary({
          images,
          setUrls,
        });
      }
      const shopSpaceData: any = {
        title: data?.title,
        location: data?.location,
        description: data.description,
        rent: data?.rent,
        advanceAmount: data?.advanceAmount,
        images: uploadImageUrls,
        category: data?.category,
      };

      const response = await createShopSpace({
        shopSpaceData,
      });

      setUpLoadingImage(false);

      const addedSpace = response?.data?.addedSpace;
      if (addedSpace) {
        router.push("/myList");
      }
    } catch (error: any) {
      setUpLoadingImage(false);
    }
  };

  if (isLoading) {
    return <SkeletonPostFlat></SkeletonPostFlat>;
  }
  //   if (error) {
  //     return <ErrorComponent error={error} setError={setError}></ErrorComponent>;
  //   }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Post Shop Space</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Space Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-sm text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: true })}
                placeholder="Title"
                className="w-full p-2 border rounded"
              />
              {errors.title && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            {/* location input */}
            <div className="flex flex-col">
              <label htmlFor="location" className="text-sm text-gray-600 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                {...register("location", { required: true })}
                placeholder="Location"
                className="w-full p-2 border rounded"
              />
              {errors.location && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            {/* rent input */}
            <div className="flex flex-col">
              <label htmlFor="rent" className="text-sm text-gray-600 mb-1">
                Rent
              </label>
              <input
                type="number"
                id="rent"
                {...register("rent", { required: true })}
                placeholder="Rent"
                className="w-full p-2 border rounded"
              />
              {errors.rent && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            {/* advance input */}
            <div className="flex flex-col">
              <label
                htmlFor="advanceAmount"
                className="text-sm text-gray-600 mb-1"
              >
                Advance Amount
              </label>
              <input
                type="number"
                id="advanceAmount"
                {...register("advanceAmount")}
                placeholder="Advance Amount"
                className="w-full p-2 border rounded"
              />
              {errors.advanceAmount && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            {/* category input */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm text-gray-600 mb-1">
                Category
              </label>
              <select
                id="category"
                {...register("category", { required: true })}
                className="w-full p-2 border rounded"
              >
                <option value="Flat">Flat</option>
                <option value="Tin-Shade">Tin-Shade</option>
                <option value="Tiner-ghor">Tiner-ghor</option>
              </select>
              {errors.category && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>
          {/* description input */}
          <div className="flex flex-col mt-4">
            <label htmlFor="description" className="text-sm text-gray-600 mb-1">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: true })}
              placeholder="Description"
              className="w-full p-2 border rounded"
            />
            {errors.description && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          {/* image upload input */}
          <div className="flex flex-col mt-4">
            <label htmlFor="images" className="text-sm text-gray-600 mb-1">
              Images
            </label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
          disabled={uploadingImage}
        >
          {uploadingImage ? "Uploading Image..." : "Post"}
        </button>
      </form>
    </div>
  );
};
