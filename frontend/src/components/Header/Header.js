import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "./Header.css"; // Import the CSS file
import { useAuth } from "../../context/AuthContext";
const Header = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const { login, logout, isLoggedIn } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
  };
  const handleLoginClick = () => {
    const fetchedUserData = {
      name: "",
      email: "",
      userId: "",
    };
    login(fetchedUserData);
    navigate("/login"); // Navigate to the login page
  };

  const handleSignupClick = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src="/path-to-logo.png" alt="Logo" className="logo" />
      </div>

      <nav className="nav-links">
        {isLoggedIn ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button className="login-button" onClick={handleLoginClick}>
              Login
            </button>
            <button className="signup-button" onClick={handleSignupClick}>
              Signup
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
