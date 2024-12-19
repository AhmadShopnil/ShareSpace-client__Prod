"use client";

import { getUserInfo, isLoggedIn } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { DashboardNav } from "@/components/Dashboard/DashboardNav";
import { useAppDispatch } from "@/redux/hooks";
import { getFromLocalStorage } from "@/utils/localStorage";
import { setUser } from "@/redux/slices/authSlice";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch: any = useAppDispatch();

  const token = getFromLocalStorage("accessToken");
  const user = getUserInfo();

  useEffect(() => {
    dispatch(setUser({ user, token }));
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close sidebar if click happens outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false); // Close the sidebar when clicked outside
      }
    };

    if (!isLoggedIn()) {
      return router.push("/login");
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex ">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`${
            isSidebarOpen ? "w-64" : "w-0"
          } transition-all duration-300 fixed top-0 left-0 h-full bg-gray-800 z-50
         overflow-hidden lg:w-64`}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 ml-0 transition-all duration-300 ">
          <DashboardNav />
          {/* <Navbar /> */}

          {/* Toggle Button */}
          <button onClick={toggleSidebar} className="lg:hidden p-4 ">
            {isSidebarOpen ? <MoveLeft size={22} /> : <MoveRight size={22} />}{" "}
          </button>

          <div className="p-4  h-full ml-0 lg:ml-64 transition-all duration-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
