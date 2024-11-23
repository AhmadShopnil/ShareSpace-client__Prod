"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { removeUser } from "@/services/authServices";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/slices/authSlice";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);

  // const role = user?.role;

  const handleLogOut = () => {
    removeUser();
    dispatch(logout());
  };

  return (
    <nav className="bg-white mb-4 lg:sticky top-0  lg:z-10  ">
      <div>
        <div className="flex justify-between items-center py-4">
          {/* logo section */}
          <div className="text-2xl sm:text-3xl font-bold">
            <Link href="/">
              Share
              <span className=" text-teal-500">Space</span>
            </Link>
          </div>

          {/* for big screen */}

          {/* menuItem section */}
          <div
            className="hidden lg:flex
           space-x-6 lg:space-x-10
            justify-center
            w-full text-md lg:text-base"
          >
            <Link
              href="/"
              className={`text-gray-600 hover:text-teal-600 ${
                pathname === "/" ? "text-teal-600" : "text-gray-500"
              }`}
            >
              Home
            </Link>
            <Link
              href="/allFlatList"
              className={`text-gray-600 hover:text-teal-600 ${
                pathname === "/allFlatList" ? "text-teal-600" : "text-gray-500"
              }`}
            >
              Listed Sapces
            </Link>
            {user && (
              <Link
                href="/myList"
                className={`text-gray-600 hover:text-teal-600 ${
                  pathname === "/myList" ? "text-teal-600" : "text-gray-500"
                }`}
              >
                My Posted Sapces
              </Link>
            )}

            <Link
              href="/contactUs"
              className={`text-gray-600 hover:text-teal-600 ${
                pathname === "/contactUs" ? "text-teal-600" : "text-gray-500"
              }`}
            >
              Contact Us
            </Link>
          </div>

          <div className="hidden   md:block">
            {!user ? (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="border border-teal-500
                   text-teal-500 px-3 py-1 rounded hover:bg-teal-500
                    hover:text-white whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  href="/signUp"
                  className="border border-teal-500
                   text-teal-500 px-3 py-1 rounded
                    hover:bg-teal-500
                    hover:text-white whitespace-nowrap"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogOut}
                className="border
               border-teal-500 text-teal-500 px-3 
               py-1 rounded hover:bg-teal-500
                hover:text-white whitespace-nowrap"
              >
                Logout
              </button>
            )}
          </div>

          {/* for mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon
                icon={isOpen ? faTimes : faBars}
                className="h-6 w-6 text-gray-600"
              />
            </button>
          </div>
        </div>

        {/* menu items */}
        {isOpen && (
          <div className="md:hidden py-6 px-4 bg-teal-50 shadow-lg ">
            <div className="flex flex-col gap-4">
              {/* Auth Buttons */}
              {!user ? (
                <div className="flex gap-2 justify-between">
                  <Link
                    href="/login"
                    className="block border border-teal-500 text-teal-500 px-4 py-2 rounded-lg text-center hover:bg-teal-500 hover:text-white transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signUp"
                    className="block border border-teal-500 text-teal-500 px-4 py-2 rounded-lg text-center hover:bg-teal-500 hover:text-white transition"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogOut}
                  className="border border-teal-500 text-teal-500 text-sm px-4 py-2 rounded-lg hover:bg-teal-500 hover:text-white transition"
                >
                  Logout
                </button>
              )}

              {/* Mobile Menu Links */}
              <Link
                href="/"
                className="block text-gray-600 text-base hover:text-teal-600  transition"
              >
                Home
              </Link>
              <Link
                href="/allFlatList"
                className="block text-gray-600 text-base hover:text-teal-600  transition"
              >
                Listed Sapces
              </Link>
              {user && (
                <Link
                  href="/myList"
                  className="block text-gray-600 text-base hover:text-teal-600 transition"
                >
                  My Posted Sapces
                </Link>
              )}
              <Link
                href="/contactUs"
                className="block text-gray-600 text-base hover:text-teal-600  transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
