import React, { use } from 'react';

import './ProtectedRoute.css';
import { useLocation,Navigate } from 'react-router-dom';

function ProtectedRoute({isLoggedIn, children}) {
  const location = useLocation();
 
  
  return (
    <div className="ProtectedRoute">
      {isLoggedIn ? children : <Navigate to="/login" replace state={{ from: location }} />}
    </div>
  );
}


export default ProtectedRoute;
