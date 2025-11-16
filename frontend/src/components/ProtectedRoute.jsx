import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();


  if(loading){
    return (        <div className="flex justify-center h-30 items-center">
          <h1 className="text-blue-500">Loading data...</h1>
        </div>)
  }

  return user ? <Outlet /> : <Navigate to="/login" /> 
};

export default ProtectedRoute;
