import React, { useState } from 'react';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import register from '../../Api/register.api';
import queryString from 'query-string';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const query = queryString.parse(window.location.search);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true)
    await register({
      username
    }).then(res => {
      if(res.status === 200) {
        navigate("/login?" + getLoginUrl());
        toast.success("Registration successfull!")
      } else {
        handleError(res.message)
      }
    }).catch((err) => {
      handleError("Oops! Register failed")
    })
    return false
  }

  const handleError = (error) => {
    setIsLoading(false)
    setError(true)
    setErrorMessage(error)
    toast.error(error)
  }

  const getLoginUrl = () => {
    return new URLSearchParams(query).toString();
  }

  return(
    <div className={styles.Register} data-testid="Register">
      <form className={styles.Form} onSubmit={handleSubmit}>
        <input className={styles.TextInput} required type="text" name="username" placeholder="Username" onChange={e => setUserName(e.target.value)}/>
        <input className={styles.Input} type="submit" name="submit" value="Submit"/>
        {error && <div><span className={styles.error}>{errorMessage}</span></div>}
        {isLoading && <div><span className={styles.Message}>Processing...</span></div>}
        <Link className={styles.Link} to={"/login?" + getLoginUrl()}>Already Registered? Login</Link>
        <Link className={styles.Link} to="/">&larr; Home</Link>
      </form>
    </div>
  )
};

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
