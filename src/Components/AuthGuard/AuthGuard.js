import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { checkAuth } from '../../SessionHandler/Session'

const AuthGuard = () => {
  if (!checkAuth()) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

AuthGuard.propTypes = {};

AuthGuard.defaultProps = {};

export default AuthGuard;
