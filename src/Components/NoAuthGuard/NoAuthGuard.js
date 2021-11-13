import React from 'react';
import { checkAuth } from '../../SessionHandler/Session'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const NoAuthGuard = ({fromRoute}) => {
  const location = useLocation();
  if (!checkAuth()) {
    return <Outlet />;
  }
  if(fromRoute && fromRoute !== location.pathname)
    return <Navigate to={fromRoute} />;
  else
    return <Navigate to="/" />;
};

NoAuthGuard.propTypes = {};

NoAuthGuard.defaultProps = {};

export default NoAuthGuard;
