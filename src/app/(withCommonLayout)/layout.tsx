import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import React from "react";

const CommmonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-2 md:px-6 lg:px-20 mx-auto max-w-screen-2xl flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default CommmonLayout;
