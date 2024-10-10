import { TFlatData } from "@/interfaces";
import { useDeleteFlatMutation } from "@/redux/api/flatApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const TableRow = ({
  flat,

}: {
  flat: TFlatData;
 
}) => {
  const { title, location, rent, description, images } = flat;

const [deleteFlat]=useDeleteFlatMutation()



  const handleDeleteSingleFalt = () => {
 
    deleteFlat(flat?._id)
  };

  return (
    <tr className="border-t border-gray-200">
      <td className="px-6 py-2">{title}</td>
      <td className="px-6 py-2">{rent}</td>
      <td className="px-6 py-2">{location}</td>
      <td className="px-6 py-2 flex  justify-center gap-4">
        <button className="text-blue-500 hover:underline"><FontAwesomeIcon icon={faEdit} /></button>
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

export default TableRow;
