import { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { generateRandomKey } from "../Utils/RandomIdGenerator";

const useUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadType, setUploadType] = useState('post');

  const handleChangeImage = (e) => {
    console.log(e)
    if(!e) {
      document.getElementById('uploader').value = '';
      return setImage(null)
    }
    setImage(e.target.files[0]);
  };

  const handleChangeUploadType = (type) => {
    setUploadType(type);
  };

  const handleCroppedImage = (croppedImage) => {
    setImage(croppedImage)
  }

  const isValidFileFormat = (format) => {
    let validFormats = ['png', 'jpg', 'jpeg'];
    return validFormats.includes(format)
  }

  const handleUploadImage = async () => {
    try {
      if(!image) {
        return {
          status: 204,
          imageName: null
        }
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("type", uploadType);
      let fileParts = String(image.name).split(".");
      const fileFormat = fileParts[fileParts.length - 1];
      if(!isValidFileFormat(fileFormat)) {
        return {
          status: 400,
          message: "Inavlid file format!"
        }
      }
      const fileRandomName = `${generateRandomKey()}.${fileFormat}`;
      const storage = getStorage();
      const storageRef = ref(storage, `/images/post/${fileRandomName}`);
      return await uploadBytes(storageRef, image).then(async (snapshot) => {
        return {
          status: 200,
          imageName: fileRandomName
        };
      }).catch((err) => {
        return {
          status: 500,
          message: "File upload error!"
        };
      })
    } catch (error) {
      throw new Error(error)
    } finally {
      setImage(null);
      setLoading(false);
    }
  };

  return {
    image,
    uploadedImage,
    loading,
    handleChangeImage,
    handleUploadImage,
    handleChangeUploadType,
    handleCroppedImage
  };
};

export default useUpload;


