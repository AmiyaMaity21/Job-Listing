import React from 'react'
import { Navigate } from 'react-router-dom';
function ProtectedRoutes({Component}) {
    const token = localStorage.getItem("token");
  return (
    <div>
        {token? <Component /> : <Navigate to="/login" />}
    </div>
  )
}

export default ProtectedRoutes