import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { TWorkSpaceInRes } from "@/interfaces";

const MyWorkSpaceTableRow = ({
  workSpace,
  openModal,
  setSelectedId,
}: {
  workSpace: TWorkSpaceInRes;
  openModal: any;
  setSelectedId: any;
}) => {
  const { title, location, rent, _id } = workSpace;

  const handleDeleteSingleWorkSpace = () => {
    setSelectedId(_id);
    openModal();
  };

  return (
    <tr className="border-t border-gray-200">
      <td className="px-6 py-2">{title}</td>
      <td className="px-6 py-2">{rent}</td>
      <td className="px-6 py-2">{location}</td>
      <td className="px-6 py-2 flex  justify-center gap-4">
        <button className="text-blue-500 hover:underline">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          onClick={handleDeleteSingleWorkSpace}
          className="ml-2 text-red-500 hover:underline"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default MyWorkSpaceTableRow;
