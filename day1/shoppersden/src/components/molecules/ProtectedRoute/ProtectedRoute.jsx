import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider.jsx';
import './ProtectedRoute.css';

function ProtectedRoute({children }) {
   const location = useLocation();
   const { isAuthenticated, loading } = useAuth();
   console.log("ProtectedRoute - isAuthenticated:", isAuthenticated, " loading:", loading);

  if (loading) return null; // or loader

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  

  return children;
} 



export default ProtectedRoute;
