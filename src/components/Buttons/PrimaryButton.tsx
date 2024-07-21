import React from "react";

const PrimaryButton = ({ title, action }: { title: string; action: any }) => {
  return (
    <button
      onClick={action}
      // className="bg-teal-500 text-white px-6 py-2 rounded mr-4"
      className="text-xs sm:text-lg px-4 py-2 sm:px-6 
       bg-teal-500 text-white  rounded mr-4"
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
