"use client";

import { useState } from "react";
import ShareSpaceModal from "./ShareSpaceModal";

const ShareSpaceButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <button
        onClick={openModal}
        className="text-xs sm:text-base px-3 py-2 sm:px-4  bg-teal-500 text-white  rounded "
        // className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
      >
        Post For Rent
      </button>

      {/* Share Space Modal */}
      <ShareSpaceModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ShareSpaceButton;
