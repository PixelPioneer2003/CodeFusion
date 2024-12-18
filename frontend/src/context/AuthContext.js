import React, { createContext, useContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook for accessing the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthContext Provider Component
export const AuthContextProvider = ({ children }) => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to store user details
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
  });

  // Function to update the user's details
  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  // Function to log out the user
  const logout = () => {
    setIsLoggedIn(false); // Set isLoggedIn to false
    setUser({ name: "", email: "", userId: "" }); // Clear user data
  };

  // Function to log in the user and update the state
  const login = (userData) => {
    setIsLoggedIn(true); // Set isLoggedIn to true
    updateUser(userData); // Update the user data
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, updateUser, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};
