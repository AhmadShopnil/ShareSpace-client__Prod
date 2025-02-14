import axios from "axios";

// Define the type for the props
type TUploadImageProps = {
  images: File[];
  // setUrls: React.Dispatch<React.SetStateAction<string[]>>;
};

export const uploadImageToCLoudinary = async ({
  images,
}: // setUrls,
TUploadImageProps) => {
  const uploadPreset = "hyokj2ii";
  const cloudName = "dcw08wkw7";
  const newImagUrls: string[] = [];
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  if (images) {
    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", uploadPreset);
      //   formData.append("cloud_name", cloudName);

      const response = await axios.post(url, formData);
      const singleImageUrl = response?.data?.secure_url;
      newImagUrls.push(singleImageUrl);
    }

    // setUrls(newImagUrls);
  }

  return newImagUrls;
};
