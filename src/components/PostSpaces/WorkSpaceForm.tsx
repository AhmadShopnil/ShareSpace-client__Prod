"use client";
import { useState } from "react";
import { TUserData } from "@/interfaces";
import { uploadImageToCLoudinary } from "@/utils/uploadImage";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import SkeletonPostFlat from "@/components/Loading/SkeletonPostFlat";
import { useCreateWorkSpaceMutation } from "@/redux/api/workSpaceApi";
import { TWorkSpacePayload } from "@/interfaces/workspace";
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

export const WorkSpaceForm = () => {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [uploadingImage, setUpLoadingImage] = useState(false);
  const [createWorkSpace, { isLoading }] = useCreateWorkSpaceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TWorkSpacePayload & TUserData>();

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

  const onSubmit: SubmitHandler<TWorkSpacePayload & TUserData> = async (
    data
  ) => {
    setUpLoadingImage(true);
    try {
      let uploadImageUrls = null;
      if (images.length > 0) {
        uploadImageUrls = await uploadImageToCLoudinary({ images });
      }

      const workSpaceData = {
        title: data.title,
        location: data.location,
        description: data.description,
        rent: data.rent,
        advanceAmount: data.advanceAmount,
        images: uploadImageUrls,
      };

      const response = await createWorkSpace({ workSpaceData });
      setUpLoadingImage(false);

      if (response?.data?.addedSpace) {
        router.push("/myList");
      }
    } catch (error) {
      setUpLoadingImage(false);
    }
  };

  if (isLoading) {
    return <SkeletonPostFlat />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl text-center font-semibold mb-4">
        Office Space / Work Space Details
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
              label="Advance Amount"
              id="advanceAmount"
              register={register}
              type="number"
            />
          </div>

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

          {/* Custom File Input for Image Upload */}
          <div className="flex flex-col mt-4">
            <label htmlFor="images" className="text-sm text-gray-600 mb-1">
              Images
            </label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border rounded opacity-0 absolute"
            />
            <label
              htmlFor="images"
              className="cursor-pointer flex items-center gap-2 mt-2 text-sm text-gray-600 border p-2 rounded"
            >
              <FontAwesomeIcon
                icon={faImage}
                className="w-5 h-5 text-gray-500"
              />
              {images.length > 0
                ? `${images.length} file(s) selected`
                : "Choose Photos"}
            </label>
          </div>

          {/* Image Previews */}
          <div className="mt-4 flex gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={URL.createObjectURL(image)}
                  width={32}
                  height={24}
                  alt="Preview"
                  className="w-32 h-24 object-cover rounded"
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
