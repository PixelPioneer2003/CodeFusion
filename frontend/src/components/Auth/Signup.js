import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) =>
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));

  // Step 1: Send OTP to the email
  const handleSendOtp = async () => {
    try {
      const otpResponse = await axios.post(
        "http://localhost:3000/api/v1/send-otp",
        { email: formData.email }
      );

      if (otpResponse.data.success) {
        alert("OTP sent to your email.");
        navigate("/verify-otp", { state: { formData } });
      }
    } catch (error) {
      setErrorMessage(
        error.response.data.message || "Error sending OTP. Please try again."
      );
    }
  };

  // Redirect to the login page
  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
        />
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
        <button onClick={handleSendOtp}>Verify OTP & Sign Up</button>
        {errorMessage && <p className="error">{errorMessage}</p>}

        {/* Link to Login Page if user already has an account */}
        <p>
          Already have an account?{" "}
          <span
            onClick={handleGoToLogin}
            style={{ color: "#007bff", cursor: "pointer" }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
