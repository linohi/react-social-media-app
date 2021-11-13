import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './Page.module.scss';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import AddPost from '../AddPost/AddPost';
import Me from '../Me/Me';
import AuthGuard from '../AuthGuard/AuthGuard';
import NoAuthGuard from '../NoAuthGuard/NoAuthGuard';

const Page = () => {
  const location = window.location.pathname;//useLocation();

  return (<div className={styles.Page} data-testid="Page">
    <Router >
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/post/:postId' element={<Home />}></Route>
        <Route element={<NoAuthGuard fromRoute={location}/>}>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register/>}></Route>
        </Route>
        <Route element={<AuthGuard />}>
          <Route path="/me" element={<Me />} />
          <Route exact path='/add-post' element={<AddPost />}></Route>
        </Route>
        <Route exact path='*' element={<NotFound />}></Route>
      </Routes>
    </Router>
  </div>)
};

Page.propTypes = {};

Page.defaultProps = {};

export default Page;
