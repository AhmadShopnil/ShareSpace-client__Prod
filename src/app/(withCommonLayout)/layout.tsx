"use client";
import Footer from "@/components/Shared/Footer/Footer";
import FooterMenuBar from "@/components/Shared/FooterMenuBar/FooterMenuBar";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { getUserInfo } from "@/services/authServices";
import { getFromLocalStorage } from "@/utils/localStorage";
import React, { useEffect } from "react";

const CommmonLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const token = getFromLocalStorage("accessToken");
  const user = getUserInfo();

  useEffect(() => {
    dispatch(setUser({ user, token }));
  });

  return (
    <div className=" mx-auto max-w-screen-2xl flex flex-col min-h-screen  ">
      <div className="px-4 sm:px-6 md:px-10">
        <Navbar />
        <div className="flex-grow 0">{children}</div>
      </div>
      <Footer />
      <div className="lg:hidden  ">
        <FooterMenuBar></FooterMenuBar>
      </div>
    </div>
  );
};

export default CommmonLayout;
