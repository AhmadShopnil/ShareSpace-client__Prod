"use client";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faPlus,
  faPhone,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/slices/authSlice";

const FooterMenuBar = () => {
  const user = useAppSelector(selectCurrentUser);

  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-11 bg-white border-b  border-teal-100 shadow-xl">
      <div className="flex justify-between items-center py-2 ">
        {/* Flat/Home List */}
        <Link href="/" className="flex-1 text-center">
          <FontAwesomeIcon
            icon={faHome}
            className={`text-xl  mx-auto ${
              pathname === "/" ? "text-teal-600" : "text-gray-500"
            }`}
          />
          <span className="block text-xs mt-1">Home </span>
        </Link>

        <Link href="/allFlatList" className="flex-1 text-center">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`text-xl mx-auto ${
              pathname === "/allFlatList" ? "text-teal-600" : "text-gray-500"
            }`}
          />
          <span className="block text-xs mt-1">Find Home</span>
        </Link>

        {/* Add New Flat/Home */}
        <Link href="/postFlat" className="flex-1 text-center">
          <FontAwesomeIcon
            icon={faPlus}
            className={`text-xl mx-auto ${
              pathname === "/postFlat" ? "text-teal-600" : "text-gray-500"
            }`}
          />
          <span className="block text-xs mt-1">Share Flat</span>
        </Link>

        {user && (
          <Link href="/myList" className="flex-1 text-center">
            <FontAwesomeIcon
              icon={faList}
              className={`text-xl mx-auto ${
                pathname === "/myList" ? "text-teal-600" : "text-gray-500"
              }`}
            />
            <span className="block text-xs mt-1">My List </span>
          </Link>
        )}

        {/* Contact Us */}
        {/* <Link href="/contactUs" className="flex-1 text-center">
        <FontAwesomeIcon
          icon={faPhone}
          className={`text-2xl mx-auto ${
            pathname === "/contact" ? "text-teal-600" : "text-gray-500"
          }`}
        />
        <span className="block text-xs mt-1">Contact Us</span>
      </Link> */}
      </div>
    </div>
  );
};

export default FooterMenuBar;
