import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const login = (token) => {
    localStorage.setItem('token', token)
    setAuthToken(token)
  }

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  }

  const value ={
    token: authToken,
    login,
    logout
  }

  return <AuthContext.Provider value={ value }>{children}</AuthContext.Provider>
};


export const useAuth = () => {
  return useContext(AuthContext)
}