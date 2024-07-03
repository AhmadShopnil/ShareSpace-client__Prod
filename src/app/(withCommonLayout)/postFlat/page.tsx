"use client";
// pages/postFlat.tsx
import { useState } from "react";

import axios from "axios";
import { TFlatData, TUserData } from "@/interfaces";
import { saveUserInfo } from "@/services/authServices";

const PostFlat = () => {
  const [flatData, setFlatData] = useState<TFlatData>({
    title: "",
    totalBedrooms: 0,
    location: "",
    description: "",
    rent: 0,
    advanceAmount: 0,
  });

  const [userData, setUserData] = useState<TUserData>({
    name: "",
    phone: "",
    password: "",
  });

  const handleFlatDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFlatData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/flats/add", {
        flatData,
        userData,
      });

      const accessToken = response?.data?.data?.accessToken;

      if (accessToken) {
        // log in user by set user token in local storage
        saveUserInfo({ accessToken });
        // router.push("/");
      }

      // Handle successful response
    } catch (error) {
      console.error("Error posting flat:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Post Your Flat</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Flat Details Section */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Flat Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* flat field  start */}
            <div className="flex flex-col">
              <label htmlFor="title" className="text-sm text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={flatData.title}
                onChange={handleFlatDataChange}
                placeholder="Title"
                className="w-full p-2 border rounded"
              />
            </div>
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
                name="totalBedrooms"
                value={flatData.totalBedrooms}
                onChange={handleFlatDataChange}
                placeholder="Total Bedrooms"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="location" className="text-sm text-gray-600 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={flatData.location}
                onChange={handleFlatDataChange}
                placeholder="Location"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rent" className="text-sm text-gray-600 mb-1">
                Rent
              </label>
              <input
                type="number"
                id="rent"
                name="rent"
                value={flatData.rent}
                onChange={handleFlatDataChange}
                placeholder="Rent"
                className="w-full p-2 border rounded"
              />
            </div>
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
                name="advanceAmount"
                value={flatData.advanceAmount}
                onChange={handleFlatDataChange}
                placeholder="Advance Amount"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex flex-col ">
              <label
                htmlFor="description"
                className="text-sm text-gray-600 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={flatData.description}
                onChange={handleFlatDataChange}
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
            </div>
            {/* flat field end */}
          </div>
        </div>

        {/* Owner Data Section */}
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
                name="name"
                value={userData.name}
                onChange={handleUserDataChange}
                placeholder="Name"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm text-gray-600 mb-1">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleUserDataChange}
                placeholder="Phone"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleUserDataChange}
                placeholder="Password"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
        >
          Post Flat
        </button>
      </form>
    </div>
  );
};

export default PostFlat;
