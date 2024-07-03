import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/localStorage";

export const saveUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage("accessToken", accessToken);
};

export const getUserInfo = () => {
  const token = getFromLocalStorage("accessToken");

  if (token) {
    const user = decodedToken(token);
    return user;
  }
};

export const removeUser = () => {
  return removeFromLocalStorage("accessToken");
};
