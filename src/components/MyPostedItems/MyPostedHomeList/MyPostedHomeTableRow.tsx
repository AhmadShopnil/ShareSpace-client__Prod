"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { TFlatDataInRes } from "@/interfaces";

const MyPostedHomeTableRow = ({
  flat,
  openModal,
  setSelectedId,
  setSelectedItem,
  setUpdateModalOpen,
}: {
  flat: TFlatDataInRes;
  openModal: any;
  setSelectedId: any;
  setSelectedItem: any;
  setUpdateModalOpen: any;
}) => {
  const { title, location, rent, _id } = flat;

  const handleUpdateSingleFalt = () => {
    setSelectedItem(flat);
    setUpdateModalOpen(true);
  };

  const handleDeleteSingleFalt = () => {
    setSelectedId(_id);
    openModal();
  };

  return (
    <tr className="border-t border-gray-200">
      <td className="px-6 py-2">{title}</td>
      <td className="px-6 py-2">{rent}</td>
      <td className="px-6 py-2">{location}</td>
      <td className="px-6 py-2 flex  justify-center gap-4">
        <button
          onClick={handleUpdateSingleFalt}
          className="text-blue-500 hover:underline"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          onClick={handleDeleteSingleFalt}
          className="ml-2 text-red-500 hover:underline"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default MyPostedHomeTableRow;
