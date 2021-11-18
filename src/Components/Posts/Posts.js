import React, { useEffect, useState } from 'react';
import styles from './Posts.module.scss';
import Post from '../Post/Post';
import { checkAuth, getUser, logout } from '../../SessionHandler/Session';
import verifyToken from '../../Api/token-verify.api';
import { useNavigate } from 'react-router';

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let body = []


  useEffect(() => {
    const mainUrl = `${process.env.REACT_APP_WORKER_URL}/posts`;
    const initFetchPosts = async () => {
      let url = mainUrl;
      setIsLoaded(false);
      if(checkAuth()) {
        url += "?username=" + getUser();
        await verifyToken()
          .then((res) => {
            if(res.status === 200) {
              fetchPosts(url);
            } else {
              logout();
              navigate("/login?session-expired");
            }
          })
      } else {
        fetchPosts(url);
      }
    };

    const fetchPosts = async (url) => {
      await fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          if(result.status === 200) {
            setPosts(result['postsData']);
          } else {
            setError(result.message);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }

    initFetchPosts();
  }, []);


  if (error) {
    body =  <div className={styles.Message}><span>Error: {error.message}</span></div>;
  } else if (!isLoaded) {
    body = <div className={styles.Message}><span>Loading...</span></div>;
  } else {
    body = [];
    posts.map((post, i) => {
      body.push(
        <div key={i} id={post.id} >
          <Post htmlId={post.id}
                id={post.id} 
                title={post.postname}
                username={post.username || "NA"} 
                content={post.contents} 
                createdAt={post.createdAt || "Past"}
                likes={post.liked || 0}
                isLiked={post.isLiked}
                isSaved={post.isSaved}
                postImage={post.image || null}
          />
        </div>
      )
    })
  }
  return (
    <div className={styles.Posts} data-testid="Posts" id="PostsContainer">
      {body}
    </div>
  )
};

Posts.propTypes = {};

Posts.defaultProps = {};

export default Posts;
