"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faPlus,
  faMagnifyingGlass,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/slices/authSlice";
import { useState } from "react";
import ShareSpaceModal from "@/components/Modal/ShareSpaceModal/ShareSpaceModal";

const FooterMenuBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-11 bg-white border-b 
     border-teal-100 shadow-xl"
    >
      <div className="flex justify-between items-center py-2 ">
        {/* Flat/Home List */}
        <Link href="/" className="flex-1 text-center">
          <FontAwesomeIcon
            icon={faHome}
            className={`text-lg  mx-auto ${
              pathname === "/" ? "text-teal-600" : "text-gray-500"
            }`}
          />
          <span className="block text-xs mt-1">Home </span>
        </Link>

        <Link href="/allSpacesList" className="flex-1 text-center">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`text-lg mx-auto ${
              pathname === "/allSpacesList" ? "text-teal-600" : "text-gray-500"
            }`}
          />
          <span className="block text-xs mt-1">Find</span>
        </Link>

        {/* Add New Flat/Home */}

        <button onClick={openModal} className="flex-1 text-center">
          <FontAwesomeIcon
            icon={faPlus}
            className={`text-lg mx-auto ${
              pathname === "/postFlat" ? "text-teal-600" : "text-gray-500"
            }`}
          />
          <span className="block text-xs mt-1">Share Space</span>
        </button>

        {!user && (
          <Link href="/login" className="flex-1 text-center">
            <FontAwesomeIcon
              icon={faRightToBracket}
              className={`text-lg mx-auto ${
                pathname === "/login" ? "text-teal-600" : "text-gray-500"
              }`}
            />
            <span className="block text-xs mt-1">Login </span>
          </Link>
        )}

        {user?.role === "user" && (
          <Link href="/myList" className="flex-1 text-center">
            <FontAwesomeIcon
              icon={faList}
              className={`text-lg mx-auto ${
                pathname === "/myList" ? "text-teal-600" : "text-gray-500"
              }`}
            />
            <span className="block text-xs mt-1">My List </span>
          </Link>
        )}

        {user?.role === "admin" && (
          <Link href="/dashboard" className="flex-1 text-center">
            <FontAwesomeIcon
              icon={faList}
              className={`text-lg mx-auto ${
                pathname === "/dasboard" ? "text-teal-600" : "text-gray-500"
              }`}
            />
            <span className="block text-xs mt-1">Dashboard </span>
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

      {/* Share Space Modal */}
      <ShareSpaceModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default FooterMenuBar;
