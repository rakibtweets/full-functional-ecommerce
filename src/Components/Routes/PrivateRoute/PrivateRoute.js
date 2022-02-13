import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  console.log('~ loading', loading);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
