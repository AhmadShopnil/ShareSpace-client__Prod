"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { removeUser } from "@/services/authServices";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);

  const handleLogOut = () => {
    removeUser();
    dispatch(logout());
    router.push("/");
  };

  return (
    <nav className="bg-white sticky top-0  z-20 px-4 sm:px-6 md:px-10   ">
      <div className="flex justify-between items-center py-3 ">
        {/* logo section */}
        <div className="text-xl   sm:text-3xl  font-bold">
          <Link href="/" className="flex">
            Tangail
            <span className=" text-teal-500">Space</span>
            <span className="text-xs ml-2 text-red-500 "> -Beta version</span>
          </Link>
        </div>

        {/* for big screen */}

        {/* menuItem section */}
        <div
          className="hidden lg:flex
           space-x-6 lg:space-x-8
            justify-center
             text-md lg:text-base "
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
            href="/allSpacesList"
            className={`text-gray-600 hover:text-teal-600 ${
              pathname === "/allSpacesList" ? "text-teal-600" : "text-gray-500"
            }`}
          >
            Find
          </Link>
          {user && (
            <Link
              href="/myList"
              className={`text-gray-600 hover:text-teal-600 ${
                pathname === "/myList" ? "text-teal-600" : "text-gray-500"
              }`}
            >
              My List
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

        {user?.role === "admin" && (
          <Link
            href="/dashboard"
            className="hidden md:flex border border-teal-500
            text-teal-500 px-3 py-1 rounded hover:bg-teal-500
             hover:text-white whitespace-nowrap mr-2"
          >
            Dashboard
          </Link>
        )}

        <div className="hidden md:block">
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
                SignUp
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
          {user && (
            <button onClick={handleLogOut} className="flex-1 text-center">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className={`text-xl mx-auto text-teal-500`}
              />
              {/* <span className="block text-xs mt-1">LogOut </span> */}
            </button>
          )}

          {!user && (
            <Link
              href="/signUp"
              className=" text-sm border border-teal-500
              text-teal-500 px-3 py-1 rounded
               hover:bg-teal-500
               hover:text-white whitespace-nowrap"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
