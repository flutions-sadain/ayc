import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ Component, category, ...rest }) => {
  const { authToken, user } = useAuth();

  if (!authToken || !user) {
    return <Navigate to="/login" />;
  }

  if (user.category !== category) {
    return <Navigate to="/" />;
  }

  // const ProtectedRoute = ({ Component, ...rest }) => {
    //const { isAuthenticated } = useAuth(); // Replace with your authentication logic

    // const userToken = localStorage.getItem('userToken')

//     return authToken ? <Component {...rest} /> : <Navigate to="/login" />;
// };

  return <Component {...rest} />;
};

export default ProtectedRoute;
