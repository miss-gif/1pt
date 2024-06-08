import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const users = JSON.parse(sessionStorage.getItem("users")) || [];
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser && users.some((user) => user.username === loggedInUser)) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username) => {
    sessionStorage.setItem("loggedInUser", username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("loggedInUser");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
