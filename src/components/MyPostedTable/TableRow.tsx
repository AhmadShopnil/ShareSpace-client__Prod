import { TFlatData } from "@/interfaces";
import React from "react";

const TableRow = ({
  flat,
  deleteSingleFlat,
}: {
  flat: TFlatData;
  deleteSingleFlat: any;
}) => {
  const { title, location, rent, description, images } = flat;

  const handleDeleteSingleFalt = () => {
    deleteSingleFlat(flat?._id);
  };

  return (
    <tr className="border-t border-gray-200">
      <td className="px-4 py-2">{title}</td>
      <td className="px-4 py-2">{rent}</td>
      <td className="px-4 py-2">{location}</td>
      <td className="px-4 py-2">
        <button className="text-blue-500 hover:underline">Edit</button>
        <button
          onClick={handleDeleteSingleFalt}
          className="ml-2 text-red-500 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
