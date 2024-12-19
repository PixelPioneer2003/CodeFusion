import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Import the CSS file
import Header from "../Header/Header";
import { useAuth } from "../../context/AuthContext";
const Dashboard = () => {
  const { user } = useAuth();
  console.log("inside dashboard printing user detail");
  console.log(user);
  return (
    <div className="dashboard-container">
      <Header />
      <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/profile" className="dashboard-link">
          Go to Profile
        </Link>
        <Link to={`/addPlatform/${user.userId}`} className="dashboard-link">
          Add Platform
        </Link>
        <Link to={`/allPlatform/${user.userId}`} className="dashboard-link">
          All Platform
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
