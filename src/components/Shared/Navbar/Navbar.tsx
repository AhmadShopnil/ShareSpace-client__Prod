"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getUserInfo } from "@/services/authServices";
import { TTokenData } from "@/interfaces";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [loggedInUser, setLoggedInUser] = useState<TTokenData>();
  const loggedInUser = getUserInfo() as TTokenData;

  // useEffect(() => {
  //   setLoggedInUser(userData);
  // }, [userData]);

  return (
    <nav className="bg-white mb-4 ">
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
            {loggedInUser?.phone && (
              <Link
                href="/myList"
                className="text-gray-600 hover:text-teal-600"
              >
                My Posted Home
              </Link>
            )}

            <Link href="/" className="text-gray-600 hover:text-teal-600">
              Contact Us
            </Link>
          </div>
          <div className="hidden   md:block">
            {!loggedInUser?.phone ? (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="border border-teal-500
                   text-teal-500 px-4 py-2 rounded hover:bg-teal-500
                    hover:text-white whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  href="#"
                  className="border border-teal-500
                   text-teal-500 px-4 py-2 rounded
                    hover:bg-teal-500
                    hover:text-white whitespace-nowrap"
                >
                  Sign In
                </Link>
              </div>
            ) : (
              <button
                className="border
               border-teal-500 text-teal-500 px-4 
               py-2 rounded hover:bg-teal-500
                hover:text-white whitespace-nowrap"
              >
                Logout
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon
                icon={isOpen ? faTimes : faBars}
                className="h-6 w-6 text-gray-600"
              />
            </button>
          </div>
        </div>

        {/* for mobile */}
        {isOpen && (
          <div className="md:hidden text-center">
            <Link
              href="/"
              className="block text-gray-600 hover:text-teal-600 py-2"
            >
              Home
            </Link>
            <Link
              href="/allFlatList"
              className="block text-gray-600 hover:text-teal-600 py-2"
            >
              Listed Home
            </Link>
            {loggedInUser && (
              <Link
                href="/myList"
                className="block text-gray-600 hover:text-teal-600 py-2"
              >
                My Posted Home
              </Link>
            )}
            <Link
              href="#"
              className="block text-gray-600 hover:text-teal-600 py-2"
            >
              Contact Us
            </Link>
            <Link
              href="#"
              className="block border border-teal-500 text-teal-500 px-4 py-2 rounded mt-4 hover:bg-blue-500 hover:text-white"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
