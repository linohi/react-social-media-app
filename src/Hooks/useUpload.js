import { useState } from "react";
import axios from "axios";
// import { useToast } from "@chakra-ui/react";

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

  const handleUploadImage = async () => {
    try {
        if(!image) {
            return {
                data: {
                    status: 204,
                    data: {
                        imageName: null
                    }
                }
            }
        }
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("type", uploadType);
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData);
      if (res.data.data) {
        setUploadedImage(res.data.data);
      }
      return res;
    } catch (error) {
      console.log(error);
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


