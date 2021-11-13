import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import Sidebar from '../Sidebar/Sidebar';
import Posts from '../Posts/Posts';
import Post from '../Post/Post';
import { useParams } from 'react-router-dom';
import getPost from '../../Api/fetch-post.api';

const Home = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [isError, setIsError] = useState(false);  
  const [error, setError] = useState();   
  let body;

  useEffect(() => {
    const initFetchPost = async(postId) => {
      if(postId) {
        fetchPost(postId)
      } else {
        body = <Posts />
      }
    }


    const fetchPost = async (postId) => {
      setIsLoaded(false);
      await getPost(postId)
        .then((res) => {
          setIsLoaded(true);
          if(res.status === 200) {
            setPost(res.postData);
          } else {
            handleError(res.message)
          }
        }).catch((err) => {
          handleError(err)
        })
    }

    const handleError = (error) => {
      setIsLoaded(true);
      setIsError(true)
      setError(error)
    }

    initFetchPost(postId);
  }, [])

  if(isError) {
    body = <div className={styles.Message}><span>Error: {error}</span></div>;
  } else if (!isLoaded) {
    body = <div className={styles.Message}><span>Loading...</span></div>;
  } else if (postId) {
    body =
        <Post
          username={post.username}
          title={post.postname}
          id={post.id}
          content={post.contents} 
          createdAt={post.createdAt}
          likes={post.liked}
          isLiked={post.isLiked}
          isSaved={post.isSaved}
          postImage={post.image || null} 
          post={post}/>
  } else {
    body = <Posts />
  }

  return (<div className={styles.Home} data-testid="Home">
    <div className={styles.row}>
      <Sidebar />
      {postId ? 
        <div className={styles.Post_192}>
          {body}
        </div>
        :
        body
      }
    </div>
  </div>)
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
