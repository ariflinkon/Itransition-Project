import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import auth from '../../services/authService';

const PrivateRoute = () => {
  try {
    return auth.isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
  } catch (error) {
    console.error("Error during authentication check:", error);
    // Optionally, you can navigate to an error page or show an error message
    return <Navigate to="/error" replace />;
  }
};

export default PrivateRoute;