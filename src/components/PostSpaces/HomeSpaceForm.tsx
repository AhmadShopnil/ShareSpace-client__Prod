"use client";

import { useState } from "react";
import { TUserData } from "@/interfaces";
import { uploadImageToCLoudinary } from "@/utils/uploadImage";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import SkeletonPostFlat from "../Loading/SkeletonPostFlat";
import { useCreateFlatMutation } from "@/redux/api/flatApi";
import { TFlatPyload } from "@/interfaces/flat";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

// FormInput Component for reusable form fields
const FormInput: React.FC<{
  label: string;
  id: string;
  register: any;
  type?: string;
  required?: boolean;
}> = ({ label, id, register, required = false, type = "text" }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-gray-600 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      {...register(id, { required })}
      placeholder={label}
      className="w-full p-2 border rounded"
    />
    {required && <span className="text-red-600">This field is required</span>}
  </div>
);

export const HomeSpaceForm = () => {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [uploadingImage, setUpLoadingImage] = useState(false);
  const [createFlat, { isLoading }] = useCreateFlatMutation();
  const [homeSpaceType, setHomeSpaceType] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFlatPyload & TUserData>();

  // handle image input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...selectedImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<TFlatPyload & TUserData> = async (data) => {
    setUpLoadingImage(true);
    try {
      let uploadImageUrls = null;
      if (images.length > 0) {
        uploadImageUrls = await uploadImageToCLoudinary({ images });
      }

      const flatData = {
        title: data.title,
        totalBedrooms: data.totalBedrooms,
        location: data.location,
        description: data.description,
        rent: data.rent,
        isLineGas: data.isLineGas, // include isLineGas field
        advanceAmount: data.advanceAmount,
        images: uploadImageUrls,
        totalBathrooms: data.totalBathrooms,
        category: data.category,
        homeSpaceType: data.homeSpaceType,
        subletGender: data.subletGender,
      };

      const response = await createFlat({ flatData });
      setUpLoadingImage(false);

      if (response?.data?.addedSpace) {
        router.push("/myList");
      }
    } catch (error) {
      setUpLoadingImage(false);
    }
  };

  if (isLoading || uploadingImage) {
    return <SkeletonPostFlat />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl text-center font-semibold mb-4">
        Home Space Details
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="border p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Title" id="title" register={register} required />
            <FormInput
              label="Location"
              id="location"
              register={register}
              required
            />
            <FormInput
              label="Rent"
              id="rent"
              register={register}
              required
              type="number"
            />
            <FormInput
              label="Advance Amount (Optional)"
              id="advanceAmount"
              register={register}
            />
            <FormInput
              label="Total Bedrooms"
              id="totalBedrooms"
              register={register}
              required
              type="number"
            />
            <FormInput
              label="Total Bathrooms"
              id="totalBathrooms"
              register={register}
              required
              type="number"
            />

            {/* Line Gas Input */}
            <div className="flex flex-col">
              <label htmlFor="isLineGas" className="text-sm text-gray-600 mb-1">
                Line Gas
              </label>
              <select
                id="isLineGas"
                {...register("isLineGas", { required: true })}
                className="w-full p-2 border rounded"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.isLineGas && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            {/* Category & Sublet */}
            <div className="flex flex-col">
              <label
                htmlFor="homeSpaceType"
                className="text-sm text-gray-600 mb-1"
              >
                Home Space Type
              </label>
              <select
                id="homeSpaceType"
                {...register("homeSpaceType", { required: true })}
                value={homeSpaceType}
                onChange={(e) => setHomeSpaceType(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="Family">Family</option>
                <option value="Sublet">Sublet / Bachelor</option>
                <option value="Any">Any</option>
              </select>
              {errors.homeSpaceType && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>

            {/* Sublet Gender Preference */}
            {homeSpaceType === "Sublet" && (
              <div className="flex flex-col">
                <label
                  htmlFor="subletGender"
                  className="text-sm text-gray-600 mb-1"
                >
                  Sublet Gender Preference
                </label>
                <select
                  id="subletGender"
                  {...register("subletGender", { required: true })}
                  className="w-full p-2 border rounded"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Any">Any</option>
                </select>
                {errors.subletGender && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
            )}
          </div>

          {/* Description Input */}
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

          {/* Custom File Input */}
          <div className="mt-4">
            <div className="flex flex-col">
              <input
                type="file"
                id="images"
                multiple
                onChange={handleImageChange}
                className="w-full  border rounded opacity-0 hidden "
              />
              <label htmlFor="images" className="text-sm text-gray-600 ">
                Images
              </label>
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
            {/* Image Previews */}
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(image)}
                    width={80}
                    height={80}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
          disabled={uploadingImage}
        >
          {uploadingImage ? "Processing..." : "Post"}
        </button>
      </form>
    </div>
  );
};
