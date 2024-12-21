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
      <UserInfoForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div
        className={`relative ${
          !isLoggedIn ? "blur-sm pointer-events-none" : ""
        } transition duration-300`}
      >
        {!user && (
          <div className="absolute inset-0 bg-gray-200 bg-opacity-25 z-10 flex justify-center items-center">
            <p className="text-gray-700 text-sm font-semibold">
              Please provide your user information to proceed.
            </p>
          </div>
        )}
        <ShopSpaceForm />
      </div>
    </div>
  );
};

export default Page;
