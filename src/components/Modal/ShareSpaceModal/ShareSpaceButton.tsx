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
    <>
      <button
        onClick={openModal}
        className="text-sm sm:text-base px-4 py-2 sm:px-6 bg-teal-500 text-white rounded z-10"
      >
        Post For Rent
      </button>

      {/* Share Space Modal */}
      <ShareSpaceModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ShareSpaceButton;
