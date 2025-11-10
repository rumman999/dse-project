import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  function login() {
    // i donot know what to set the token  to here
  }

  function logout() {
    setToken("");
    localStorage.setItem("token", "");
  }
};
