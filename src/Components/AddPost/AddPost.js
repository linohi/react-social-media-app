import React, { useState } from 'react';
import styles from './AddPost.module.scss';
import { Link, useNavigate } from 'react-router-dom'
import verifyToken from '../../Api/token-verify.api';
import createPost from '../../Api/create-post.api';
import { getUser, logout } from '../../SessionHandler/Session';
import { IconContext } from "react-icons";
import { AiOutlineCloudUpload, AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import useUpload from '../../Hooks/useUpload';
import 'react-image-crop/dist/ReactCrop.css';
import Cropper from 'react-easy-crop';
import {  getCroppedImg } from '../../Utils/Cropper';

const AddPost = () => {
  const navigate = useNavigate();
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [postname, setPostName] = useState('');
  const [contents, setContents] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isCropped, setIsCropped] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const { image, handleChangeImage, handleCroppedImage, handleChangeUploadType, handleUploadImage } = useUpload()

  const onCropComplete = async (_, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(
      URL.createObjectURL(image),
      croppedAreaPixels
    )
    var file = new File([croppedImage], image.name);
    setCroppedImage(file);
  }

  const finishCropping = () => {
    setIsCropped(true)
    handleChangeUploadType("post")
    handleCroppedImage(croppedImage)
  }

  const discardCropping = () => {
    handleChangeImage(null)
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true)
    await verifyToken()
    .then(async (res) => {
      if(res.status === 200) {
        await handleUploadImage()
          .then(async(res) => {
            if(res.data.status === 200 || res.data.status === 204) {
              console.log(res)
              console.log(res.data)
              console.log(res.data.imageName)
              await createPost({
                postname,
                contents,
                username: getUser(),
                image: res.data.data.imageName
              }).then(async (res) => {
                if(res.status === 200) {
                  setIsLoading(false);
                  setSuccess(true);
                  setSuccessMessage("Post Added!");
                } else {
                  handleError(res.message)
                }
              }).catch((err) => {
                handleError("Oops! Error Occurred")
              })
            } else {
              handleError(res.message)
            }
          }).catch((err) => {
            handleError("Oops! Error Occurred")
          })
      } else {
        logout();
        navigate("/login?session-expired&bounce-to=/add-post")
      }
    }).catch((err) => {
      handleError("Oops! Error Occurred")
    })
    return false
  }

  const handleError = (error) => {
    setError(true)
    setErrorMessage(error || error.message)
    setIsLoading(false)
  }

  return (<div className={styles.AddPost} data-testid="AddPost">
    <form className={styles.Form} onSubmit={handleSubmit}>
        <input className={styles.TextInput} type="text" name="title" placeholder="Title" onChange={e => setPostName(e.target.value)} required/>
        <textarea  rows="10" cols="50" className={styles.TextInput} type="text" name="contents" placeholder="Contents" onChange={e => setContents(e.target.value)} required/>
        <div className={styles.FileInputContainer}>
          <label className={styles.FileInputLabel} htmlFor="uploader">
            <div className={styles.LabelContainer}>
              <div className={styles.LabelUploadButton}>
                <IconContext.Provider value={{ color: 'black', size: "20px", style: { cursor: "pointer" }}}>
                  <AiOutlineCloudUpload />
                </IconContext.Provider>
                <span>Upload File</span>
              </div>
              {image &&
                (<span className={styles.FileName}>{image.name}</span>) 
              }
            </div>
          </label>

          {(image && !isCropped) &&
                // (<ReactCrop src={URL.createObjectURL(image)} crop={crop} onChange={newCrop => setCrop(newCrop)} />)
                (<div className={styles.cropper}> 
                    <Cropper
                        style={{containerStyle: {background: 'white'}}}
                        image={URL.createObjectURL(image)}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        cropSize={{width: 400, height: 400}}
                    />
                    <IconContext.Provider value={{ color: 'black', size: "40px", style: { cursor: "pointer", right:  '50px' }, className: 'CropContainerIcon'}}>
                      <AiFillCheckCircle onClick={finishCropping} />
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: 'black', size: "40px", style: { cursor: "pointer", right: '10px' }, className: 'CropContainerIcon'}}>
                      <AiFillCloseCircle onClick={discardCropping} />
                    </IconContext.Provider>
                </div>)
              }
          <input className={styles.FileInput} type="file" id="uploader" name="uploader" onChange={handleChangeImage}/>
        </div>
        {/* <input className={styles.TextInput} type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/> */}
        <input className={styles.Input} type="submit" name="submit" value="Submit"/>
        {error && <div><span className={styles.error}>{errorMessage}</span></div>}
        {success && <div><span className={styles.success}>{successMessage}</span></div>}
        {isLoading && <div><span className={styles.Message}>Processing...</span></div>}
        <Link className={styles.Link} to="/">&larr; Home</Link>
      </form>
  </div>);
};

AddPost.propTypes = {};

AddPost.defaultProps = {};

export default AddPost;
