"use client";

import { ShopSpaceForm } from "@/components/PostSpaces/ShopSpaceForm";
import UserInfoForm from "@/components/PostSpaces/UserInfoFrom";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/slices/authSlice";
import React, { useState } from "react";

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const user = useAppSelector(selectCurrentUser);

  return (
    <div>
      {!user && (
        <div className=" p-4 mb-4 mt-2 bg-gray-200  flex justify-center items-center">
          <p className="text-gray-700 text-sm font-semibold">
            Please provide owner information to proceed.
          </p>
        </div>
      )}

      <UserInfoForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div
        className={`relative ${
          !isLoggedIn ? "blur-sm pointer-events-none" : ""
        } transition duration-300`}
      >
        <ShopSpaceForm />
      </div>
    </div>
  );
};

export default Page;
