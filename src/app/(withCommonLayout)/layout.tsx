"use client";
import { DashboardNav } from "@/components/Dashboard/DashboardNav";
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
    <div className=" mx-auto max-w-screen-2xl flex flex-col  ">
      <Navbar />

      <div className=" px-4 sm:px-6 md:px-10 ">{children}</div>

      <div className="hidden md:flex justify-center mt-10">
        <Footer />
      </div>
      <div className="lg:hidden mt-20 bg-green-300  ">
        <FooterMenuBar></FooterMenuBar>
      </div>
    </div>
  );
};

export default CommmonLayout;
