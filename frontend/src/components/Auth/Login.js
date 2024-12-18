import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { updateUser, user, login, logout, isLoggedIn } = useAuth();

  console.log("login page pr user deatil print krte hue");
  console.log(user.name);
  console.log(user.email);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        formData
      );
      console.log("Login Response:", response.data);

      if (response.data.success) {
        alert("Logged in successfully");
        document.cookie = `token=${response.data.token}; path=/`;
        console.log("Cookie:", document.cookie);
        const userDetail = response.data.user;
        // Store userDetail in localStorage
        localStorage.setItem("user", JSON.stringify(userDetail));
        console.log("User Details:", userDetail);
        console.log("passing and saving the data using authContext");
        const fetchedUserData = {
          name: userDetail.name,
          email: userDetail.email,
          userId: userDetail._id,
        };
        login(fetchedUserData);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data?.message || error.message
      );
      logout();
      setError(
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleLogin}>Log In</button>
        <div className="signup-link">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#007bff" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
