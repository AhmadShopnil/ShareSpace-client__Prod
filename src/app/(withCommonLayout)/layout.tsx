"use client";
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { getUserInfo } from "@/services/authServices";
import { getFromLocalStorage } from "@/utils/localStorage";
import React, { useEffect } from "react";

const CommmonLayout = ({ children }: { children: React.ReactNode }) => {

  const dispatch=useAppDispatch()

  const token = getFromLocalStorage("accessToken");
  const user=getUserInfo()

  useEffect(()=>{
    dispatch(setUser({user,token}))
  })

  

  return (
    <div className="px-2 md:px-6 lg:px-20 mx-auto max-w-screen-2xl flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default CommmonLayout;
