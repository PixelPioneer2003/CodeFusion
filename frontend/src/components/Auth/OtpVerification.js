import React, { useState } from "react";
import axios from "axios";
import "./OtpVerification.css";
import { useNavigate, useLocation } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state; // Retrieve formData from state
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Step 2: Verify OTP and complete signup
  const handleOtpVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/verify-otp",
        { email: formData.email, otp } // Use email from formData
      );

      if (response.data.success) {
        alert("OTP verified successfully!");
        await handleSignup();
      }
    } catch (error) {
      setErrorMessage(error.response.data.message || "OTP Verification Error.");
    }
  };

  // Signup function that saves user details after OTP is verified
  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/signup", {
        ...formData,
      });

      if (response.data.success) {
        navigate("/"); // Navigate to the home or welcome page
      } else {
        setErrorMessage("Signup Error. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message || "Signup Error.");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <h2>OTP Verification</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button onClick={handleOtpVerification}>Verify OTP</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default OtpVerification;
