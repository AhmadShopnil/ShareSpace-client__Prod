import { removeUser } from "@/services/authServices";
import React from "react";

interface UserCardProps {
  userData: {
    name: string;
    phone: string;
  };
  setIsLoggedIn: any;
}

const UserCard: React.FC<UserCardProps> = ({ userData, setIsLoggedIn }) => {
  const { name, phone } = userData;

  const handleRemoveUser = () => {
    removeUser();
    setIsLoggedIn(false);
  };

  return (
    <div className="border p-4 rounded-lg flex flex-col sm:flex-row justify-around items-center">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          User Name: {name}
        </h2>
        <p className="mt-2 text-gray-600">Phone No: {phone}</p>
      </div>
      <div>
        <button
          onClick={handleRemoveUser}
          className="bg-teal-500 text-white text-xs sm:text-sm px-4 py-2 rounded mr-4"
        >
         Change Owner Info
        </button>
      </div>
    </div>
  );
};

export default UserCard;
