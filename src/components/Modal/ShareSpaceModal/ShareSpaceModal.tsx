import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const ShareSpaceModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  const handleOptionClick = (type: string) => {
    // Navigate to the relevant form page based on the type
    if (type === "home") {
      router.push("/postFlat");
    } else if (type === "office") {
      router.push("/postWorkSpace");
    } else if (type === "shop") {
      router.push("/postShopSpace");
    }
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-8">
      <div className="relative bg-white p-6 sm:p-8 rounded shadow-lg w-full max-w-xs sm:max-w-md lg:max-w-lg">
        {/* Close (Cancel) Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <FontAwesomeIcon icon={faTimes} size="xl" color="teal" />
        </button>

        <h2 className="text-lg font-bold mb-6 text-center">
          What Do You Want To Rent ?
        </h2>

        {/* Options */}
        <div className="space-y-4">
          <button
            className="w-full bg-teal-100 text-teal-600 py-2 rounded hover:bg-teal-600 hover:text-white"
            onClick={() => handleOptionClick("home")}
          >
            Home
          </button>
          <button
            className="w-full bg-teal-100 text-teal-600 py-2 rounded hover:bg-teal-600 hover:text-white"
            onClick={() => handleOptionClick("office")}
          >
            Office
          </button>
          <button
            className="w-full bg-teal-100 text-teal-600 py-2 rounded hover:bg-teal-600 hover:text-white"
            onClick={() => handleOptionClick("shop")}
          >
            Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareSpaceModal;
