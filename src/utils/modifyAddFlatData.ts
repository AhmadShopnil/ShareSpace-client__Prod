import { TFlatData, TUserData } from "@/interfaces";

type TModifyPostFlatPayload = {
  flatData: TFlatData;
  userData: TUserData;
  image: any;
};

export const modifyPostFlatData = ({
  flatData,
  userData,
  image,
}: TModifyPostFlatPayload) => {
  const dataOFFlat = JSON.stringify(flatData);
  const dataOFUser = JSON.stringify(userData);
  const formData = new FormData();

  formData.append("flatData", dataOFFlat);
  formData.append("userData", dataOFUser);
  if (image) {
    formData.append("file", image);
  }
  return formData;
};
