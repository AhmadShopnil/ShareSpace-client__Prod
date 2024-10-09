"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { isLoggedIn, removeUser } from "@/services/authServices";
import { useRouter } from 'next/navigation';
const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserLogged, setIsUserLoggedIn] = useState(false);
  // const loggedInUser = getUserInfo() as TTokenData;
  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn() as boolean);
  }, []);

  const handleLogOut = () => {
    removeUser();
    setIsUserLoggedIn(false);
    router.refresh();
    
  };

  return (
    <nav className="bg-white mb-4 sticky top-0 z-10 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* logo section */}
          <div className="text-2xl font-bold">
            <Link href="/">
              Share
              <span className=" text-teal-500">Space</span>
            </Link>
          </div>
          {/* menuItem section */}
          <div className="hidden md:flex space-x-4 justify-center w-full">
            <Link href="/" className="text-gray-600 hover:text-teal-600">
              Home
            </Link>
            <Link
              href="/allFlatList"
              className="text-gray-600 hover:text-teal-600"
            >
              Listed Home
            </Link>
            {isUserLogged && (
              <Link
                href="/myList"
                className="text-gray-600 hover:text-teal-600"
              >
                My Posted Home
              </Link>
            )}

            <Link
              href="/contactUs"
              className="text-gray-600 hover:text-teal-600"
            >
              Contact Us
            </Link>
          </div>
          {/* for big screen */}
          <div className="hidden   md:block">
            {!isUserLogged ? (
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
              {!isUserLogged ? (
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
                Listed Home
              </Link>
              {isUserLogged && (
                <Link
                  href="/myList"
                  className="block text-gray-600 text-base hover:text-teal-600 transition"
                >
                  My Posted Home
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
