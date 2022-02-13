import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const PrivateRoute = ({ children, ...rest }) => {
  const location = useLocation();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
