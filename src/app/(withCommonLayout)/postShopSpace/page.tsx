"use client";
// pages/postFlat.tsx
import React, { useEffect, useState } from "react";

import { TFlatData, TUserData, TTokenData } from "@/interfaces";
import { getUserInfo, saveUserInfo } from "@/services/authServices";
import UserCard from "@/components/Ui/UserCard/UserCard";
import { uploadImageToCLoudinary } from "@/utils/uploadImage";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import SkeletonPostFlat from "@/components/Loading/SkeletonPostFlat";
import ErrorComponent from "@/components/Shared/Error/ErrorComponent";
import { useCreateFlatMutation } from "@/redux/api/flatApi";
import { decodedToken } from "@/utils/jwt";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";

const PostShopSpace = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [isLodaing, setIsloading] = useState(false);
  const [error, setError] = useState();
  const [createFlat] = useCreateFlatMutation();

  // get user info from localStorage by accessToekn
  const loggedInUserData = getUserInfo() as TTokenData;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TFlatData & TUserData>();

  useEffect(() => {
    if (loggedInUserData?.phone) {
      setIsLoggedIn(true);
      setValue("name", loggedInUserData.name);
      setValue("phone", loggedInUserData.phone);
      setValue("password", "");
    } else {
      setIsLoggedIn(false);
    }
  }, [loggedInUserData, setValue]);

  // set image to state form input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const images = Array.from(e.target.files);
      setImages(images);
    }
  };

  // handle submit button
  const onSubmit: SubmitHandler<TFlatData & TUserData> = async (data) => {
    try {
      setIsloading(true);
      let uploadImageUrls = null;

      if (images) {
        uploadImageUrls = await uploadImageToCLoudinary({
          images,
          setUrls,
        });
      }

      const flatData: TFlatData = {
        title: data?.title,
        totalBedrooms: data?.totalBedrooms,
        location: data?.location,
        description: data.description,
        rent: data?.rent,
        advanceAmount: data?.advanceAmount,
        images: uploadImageUrls,
        totalBathrooms: data?.totalBathrooms,
        category: data?.category,
      };
      const userData: TUserData = {
        name: data?.name,
        phone: data?.phone,
        password: data?.password,
      };

      const response = await createFlat({
        flatData,
        userData,
      });
      setIsloading(false);
      const accessToken = response?.data?.accessToken;
      if (accessToken) {
        saveUserInfo({ accessToken });

        const user = decodedToken(accessToken);

        dispatch(setUser({ user, token: accessToken }));
        router.push("/myList");
      }
    } catch (error: any) {
      setError(error?.message);
      setIsloading(false);
      // eslint-disable-next-line no-console
      // console.error("Error posting flat:", error);
    }
  };

  // display userINfo Section conditionally
  let userSection;

  if (isLoggedIn) {
    const userData = {
      name: loggedInUserData?.name,
      phone: loggedInUserData?.phone,
    };

    userSection = (
      <UserCard userData={userData} setIsLoggedIn={setIsLoggedIn} />
    );
  } else {
    userSection = (
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Owner Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              placeholder="Name"
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm text-gray-600 mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", { required: true })}
              placeholder="Phone"
              className="w-full p-2 border rounded"
            />
            {errors.phone && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isLodaing) {
    return <SkeletonPostFlat></SkeletonPostFlat>;
  }
  if (error) {
    return <ErrorComponent error={error} setError={setError}></ErrorComponent>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Post Your Flat</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {userSection}

        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Flat Details</h2>
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
            {/* bedroom input */}
            <div className="flex flex-col">
              <label
                htmlFor="totalBedrooms"
                className="text-sm text-gray-600 mb-1"
              >
                Total Bedrooms
              </label>
              <input
                type="number"
                id="totalBedrooms"
                {...register("totalBedrooms", { required: true })}
                placeholder="Total Bedrooms"
                className="w-full p-2 border rounded"
              />
              {errors.totalBedrooms && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            {/* bathroom input */}
            <div className="flex flex-col">
              <label
                htmlFor="totalBathrooms"
                className="text-sm text-gray-600 mb-1"
              >
                Total Bathrooms
              </label>
              <input
                type="number"
                id="totalBathrooms"
                {...register("totalBathrooms", { required: true })}
                placeholder="Total Bathrooms"
                className="w-full p-2 border rounded"
              />
              {errors.totalBathrooms && (
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
                {...register("advanceAmount", { required: true })}
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
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostShopSpace;
