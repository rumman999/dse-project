import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(null)


  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token')

      if(!token){
        setLoading(false)
        return;
      }

      try{
        const response = await axios.get('/api/v1/auth/verify', {
          headers: { Authorization: `Bearer ${token}`}
        })
        setUser(response.data)

      } catch(error){
        console.error("Token verification failed:", error);
        localStorage.removeItem('token');
        setUser(null);
      } finally{
        setLoading(false)
      }
    }

    verifyUser()
  }, [])

  const login = (userData, token) => {
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null)
  }

  const value ={
    user,
    loading,
    login,
    logout
  }

  return <AuthContext.Provider value={ value }>{!loading && children}</AuthContext.Provider>
};


export const useAuth = () => {
  return useContext(AuthContext)
}