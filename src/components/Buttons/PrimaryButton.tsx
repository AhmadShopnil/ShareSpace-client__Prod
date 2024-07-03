import React from "react";

const PrimaryButton = ({ title }: { title: string }) => {
  return (
    <button className="bg-teal-500 text-white px-6 py-2 rounded mr-4">
      {title}
    </button>
  );
};

export default PrimaryButton;
