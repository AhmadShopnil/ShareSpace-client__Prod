"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faPlus,
  faMagnifyingGlass,
  faRightToBracket,
  faQuestion,
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
      className="fixed bottom-0 left-0 right-0 z-10 bg-teal-500 text-white border-b 
     border-teal-100 shadow-xl "
    >
      <div className="flex justify-between items-center py-2 ">
        {/* Flat/Home List */}
        <Link href="/" className="flex-1 text-center">
          <FontAwesomeIcon
            icon={faHome}
            className={`text-lg  mx-auto ${
              pathname === "/" ? "text-teal-900" : "text-white"
            }`}
          />
          <span
            className={`block text-xs  ${
              pathname === "/" ? "text-teal-900" : "text-white"
            }`}
          >
            Home{" "}
          </span>
          {/* <span className="block text-xs mt-1">Home </span> */}
        </Link>

        <Link href="/allSpacesList" className="flex-1 text-center">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`text-lg mx-auto ${
              pathname === "/allSpacesList" ? "text-teal-900" : "text-white"
            }`}
          />
          <span
            className={`block text-xs ${
              pathname === "/allSpacesList" ? "text-teal-900" : "text-white"
            }`}
          >
            Find
          </span>
        </Link>

        {/* Add New Flat/Home */}

        <button onClick={openModal} className="flex-1 text-center">
          <FontAwesomeIcon
            icon={faPlus}
            className={`text-lg mx-auto ${
              pathname === "/postFlat" ? "text-teal-900" : "text-white"
            }`}
          />
          <span
            className={`block text-xs ${
              pathname === "/postFlat" ? "text-teal-900" : "text-white"
            }`}
          >
            Post
          </span>
        </button>

        {user?.role === "user" && (
          <Link href="/myList" className="flex-1 text-center">
            <FontAwesomeIcon
              icon={faList}
              className={`text-lg mx-auto ${
                pathname === "/myList" ? "text-teal-900" : "text-white"
              }`}
            />
            <span
              className={`block text-xs ${
                pathname === "/myList" ? "text-teal-900" : "text-white"
              }`}
            >
              My List{" "}
            </span>
          </Link>
        )}

        {user?.role === "admin" && (
          <Link href="/dashboard" className="flex-1 text-center">
            <FontAwesomeIcon
              icon={faList}
              className={`text-lg mx-auto ${
                pathname === "/dasboard" ? "text-teal-900" : "text-white"
              }`}
            />
            <span
              className={`block text-xs ${
                pathname === "/dasboard" ? "text-teal-900" : "text-white"
              }`}
            >
              Dashboard{" "}
            </span>
          </Link>
        )}

        {/* Contact Us */}
        <Link href="/contactUs" className="flex-1 text-center">
          <FontAwesomeIcon
            icon={faQuestion}
            className={`text-lg mx-auto ${
              pathname === "/contactUs" ? "text-teal-900" : "text-white"
            }`}
          />
          <span
            className={`block text-xs ${
              pathname === "/contactUs" ? "text-teal-900" : "text-white"
            }`}
          >
            Help
          </span>
        </Link>

        {!user && (
          <Link href="/login" className="flex-1 text-center">
            <FontAwesomeIcon
              icon={faRightToBracket}
              className={`text-lg mx-auto ${
                pathname === "/login" ? "text-teal-900" : "text-white"
              }`}
            />
            <span
              className={`block text-xs ${
                pathname === "/login" ? "text-teal-900" : "text-white"
              }`}
            >
              Login{" "}
            </span>
          </Link>
        )}
      </div>

      {/* Share Space Modal */}
      <ShareSpaceModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default FooterMenuBar;
