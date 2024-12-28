import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { removeUser } from "@/services/authServices";
import React from "react";

const UserCard = ({
  userData,
  setIsLoggedIn,
}: {
  userData: any;
  setIsLoggedIn: any;
}) => {
  const dispatch = useAppDispatch();
  // const { name, phone } = userData;

  const handleRemoveUser = () => {
    removeUser();
    dispatch(logout());
    setIsLoggedIn(false);
  };

  return (
    <div className="border p-4 rounded-lg flex flex-col sm:flex-row justify-around items-center">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          User Name: {userData?.name}
        </h2>
        <p className="mt-2 text-gray-600">Phone No: {userData?.phone}</p>
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
