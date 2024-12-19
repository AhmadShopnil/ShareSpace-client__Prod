"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export const ListedTableRow = ({
  spaceInfo,
  openModal,
  setSelectedId,
  setSelectedItem,
  setUpdateModalOpen,
}: {
  spaceInfo: any;
  openModal: any;
  setSelectedId: any;
  setSelectedItem: any;
  setUpdateModalOpen: any;
}) => {
  const { title, location, availability, _id, isDeleted, postStatus } =
    spaceInfo;

  const handleUpdateSingleSpace = () => {
    setSelectedItem(spaceInfo);
    setUpdateModalOpen(true);
  };

  const handleDeleteSingleSpace = () => {
    setSelectedId(_id);
    openModal();
  };

  return (
    <tr className="border-t border-gray-200">
      <td className="px-6 py-2">{title}</td>
      <td className="px-6 py-2">{location}</td>
      <td className="px-6 py-2">
        {availability ? (
          <span className="text-blue-500"> Available</span>
        ) : (
          <span className="text-red-500">Not Available</span>
        )}
      </td>
      <td className="px-6 py-2">
        {isDeleted ? (
          <span className="text-red-500">Deleted</span>
        ) : (
          <span className="text-green-500">Published</span>
        )}
      </td>
      <td
        className={`px-6 py-2 ${
          postStatus === "approved"
            ? "text-green-500"
            : postStatus === "rejected"
            ? "text-red-500"
            : "text-yellow-500"
        }`}
      >
        {postStatus}
      </td>

      <td className="px-6 py-2 flex  justify-center gap-4">
        <button
          onClick={handleUpdateSingleSpace}
          className="text-blue-500 hover:underline"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          onClick={handleDeleteSingleSpace}
          className="ml-2 text-red-500 hover:underline"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};
