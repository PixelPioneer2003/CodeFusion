// src/components/Navbar/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          CODEFUSION
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/profile">
          <img
            src="/path/to/profile-icon.png" // Replace with your actual profile icon path
            alt="Profile"
            className="profile-icon"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
