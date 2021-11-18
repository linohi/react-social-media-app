import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import login from '../../Api/login.api';
import requestToken from '../../Api/request-token.api';
import { setAuth } from '../../SessionHandler/Session';
import { toast } from 'react-toastify';

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUserName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const query = queryString.parse(window.location.search);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true)
    await login({
      username
    }).then(async (res) => {
      if(res.status === 200) {
        await requestToken(res['username'])
          .then(async (resp) => {
            if(resp.status === 200) {
              setAuth(res['username'], resp.data)
              setIsLoading(false);
              startNavigation();
            } else {
              handleError(resp.data)
            }
          }).catch((err) => {
            handleError("Oops! Error Occurred")
          })
      } else {
        handleError(res.message)
      }
    }).catch((err) => {
      console.log(err)
      handleError("Oops! Error Occurred")
    })
    return false
  }

  const handleError = (error) => {
    setIsLoading(false)
    setError(true)
    setErrorMessage(error)
    toast.error(error)
  }

  const startNavigation = () => {
    if('bounce-to' in query) {
      navigate(query['bounce-to'])
    } else {
      navigate('/')
    }
  }

  const isSessionExpired = () => {
    if('session-expired' in query) {
      setError(true)
      setErrorMessage( 'Session expired! Login again!.')
    }
  }

  const getRegisterUrl = () => {
    return new URLSearchParams(query).toString();
  }

  return (
    <div className={styles.Login} data-testid="Login">
      <form className={styles.Form} onSubmit={handleSubmit}>
        <input className={styles.TextInput} type="text" name="username" placeholder="Username" onChange={e => setUserName(e.target.value)}/>
        {/* <input className={styles.TextInput} type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/> */}
        <input className={styles.Input} type="submit" name="submit" value="Submit"/>
        {((error || isSessionExpired()) && !isLoading) && <div><span className={styles.error}>{errorMessage}</span></div>}
        {isLoading && <div><span className={styles.Message}>Processing...</span></div>}
        <Link className={styles.Link} to={'/register?' + getRegisterUrl()}>New User? Register</Link>
        <Link className={styles.Link} to="/">&larr; Home</Link>
      </form>
    </div>
  )
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
