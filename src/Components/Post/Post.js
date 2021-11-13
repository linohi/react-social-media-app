import './Post.scss';
import React, { useEffect, useState } from 'react';
import { IconContext } from "react-icons";
import { AiFillHeart, AiOutlineHeart, AiOutlineLink, AiOutlineShareAlt } from "react-icons/ai";
import { HiOutlineBookmark } from "react-icons/hi";
import { IoBookmark } from "react-icons/io5";
import updatePost from '../../Api/update-post.api';
import verifyToken from '../../Api/token-verify.api';
import { getUser, logout } from '../../SessionHandler/Session';
import { useNavigate } from 'react-router';

function Post({username, title, content, id, createdAt, likes, isLiked, isSaved, postImage, post}) {
  const [likedByUser, setLikedByUser] = useState(isLiked)
  const [savedByUser, setSavedByUser] = useState(isSaved)
  const [image, setImage] = useState(postImage)
  let [noOfLikes, setNoOfLikes] = useState(likes)
  const navigate = useNavigate();
  const shareData = {
    title: title,
    text: 'Check this out on Coastagram!',
    url: 'https://coastagram-app.pages.dev'
  }

  useEffect(() => {
    if(isLiked) {
      setLikedByUser(isLiked)
    }
    if(isSaved) {
      setSavedByUser(isSaved)
    }
    if(likes) {
      setNoOfLikes(likes)
    }
    if(id) {
      shareData['url'] = 'https://coastagram-app.pages.dev/post/' + id
    }
    if(postImage) {
      setImage(`${process.env.REACT_APP_BACKEND_URL}/images/post/${postImage}`)
    }
  }, [isLiked, isSaved, likes, id, postImage, title])

  const doPostUpdate = async (collection) => {
    await verifyToken()
    .then(async (res) => {
      if(res.status === 200) {
        await updatePost({
          id,
          username: getUser(),
          collection
        }).then((res) => {
          if(res.status === 200) {
            console.log("success")
            if(collection === 'liked') {
              setLikedByUser(res.newValue)
              setNoOfLikes(res.newCount)
            } else {
              setSavedByUser(res.newValue)
            }
          } else {
            // handleError(res.message)
          }
        }).catch((err) => {
          console.log(err)
          // handleError("Oops! Error Occurred")
        })
      } else {
        logout();
        navigate('/login?session-expired');
      }
    }).catch((err) => {
      // handleError("Oops! Error Occurred")
    })
  }

  let shareApiAvailable = () => {
    if(navigator.share)
      return true;
    return false;
  }

  const share = async (link) => {
    try {
      await navigator.share(shareData)
    } catch(err) {
      try {
        navigator.clipboard.writeText(link)
      } catch(err) {
      }
    } 
  }

  return (
    <div className="Post">
      <div className="PostHeader">
        <div className="ProfileImage">
          <img src="/images/profile/dp.jpg"></img>
        </div>
        <div className="PostDetails">
          <span className="Username">{username}</span>
          <span className="PostDate">{createdAt}</span>
        </div>
      </div>
      <div className="PostBody">
        <p>{content}</p>
        {image && (<img src={image} alt={title} className='PostImage'/>)}
      </div>
      <hr/>
      <div className="PostFooter">
        <IconContext.Provider value={{ color: likedByUser ? 'red' : 'black', size: "30px", style: { cursor: "pointer" }}}>
          {likedByUser ? <AiFillHeart onClick={doPostUpdate.bind(this, 'liked')} />
                        : <AiOutlineHeart onClick={doPostUpdate.bind(this, 'liked')} />}
        </IconContext.Provider>
        <IconContext.Provider value={{ color: savedByUser ? 'black' : 'black', size: "29px", style: { cursor: "pointer" }}}>
          {savedByUser ? <IoBookmark onClick={doPostUpdate.bind(this, 'saved')} />
                        : <HiOutlineBookmark onClick={doPostUpdate.bind(this, 'saved')} />}
        </IconContext.Provider>
        <IconContext.Provider value={{ color: savedByUser ? 'black' : 'black', size: "29px", style: { cursor: "pointer" }}}>
          {shareApiAvailable() ? <AiOutlineShareAlt onClick={share.bind(this, 'https://coastagram-app.pages.dev/post/' + id)}/>
                        : <AiOutlineLink onClick={share.bind(this, 'https://coastagram-app.pages.dev/post/' + id)}/>}
        </IconContext.Provider>
        {noOfLikes > 0 ? 
          <div className="PostDetails">
            <span>{noOfLikes} { noOfLikes === 1 ? 'Like' : 'Likes'}</span>
          </div> : ''
        }
      </div>
    </div>
  )
}

export default Post;
