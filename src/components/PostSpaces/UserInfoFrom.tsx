"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, setUser } from "@/redux/slices/authSlice";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserCard from "../Ui/UserCard/UserCard";
import axios from "axios";
import { saveUserInfo } from "@/services/authServices";
import { decodedToken } from "@/utils/jwt";

const UserInfoForm = ({ isLoggedIn, setIsLoggedIn }: any) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data: any) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://server-flate-share.vercel.app/api/user/register",
        // "http://localhost:5000/api/user/register",
        data
      );
      const accessToken = response?.data?.data?.accessToken;
      if (accessToken) {
        saveUserInfo({ accessToken });
        setIsError(false);
        setIsLoading(false);
        setError("");
        const user = decodedToken(accessToken);
        dispatch(setUser({ user, token: accessToken }));

        // setIsLoggedIn(true);
      }
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setIsError(true);
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="border p-4 rounded-lg flex flex-col sm:flex-row justify-around items-center animate-pulse">
        <div className="p-6">
          <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
        <div>
          <div className="h-8 bg-teal-300 rounded w-36"></div>
        </div>
      </div>
    );
  }

  if (isLoggedIn) {
    return <UserCard userData={user} setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="border p-4 rounded-lg"
    >
      <h2 className="text-xl font-semibold mb-2">Owner Data</h2>
      {error && (
        <p className="text-center text-xs text-red-500 mt-2">{error}</p>
      )}
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

      <button
        type="submit"
        className="w-full py-3 mt-4 bg-teal-600 text-white font-semibold rounded-md 
                shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
      >
        Next
      </button>
    </form>
  );
};

export default UserInfoForm;
