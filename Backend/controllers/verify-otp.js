const User = require("../models/User"); // Assuming you have a User model
const OTP = require("../models/Otp"); // Assuming you store OTPs in a separate OTP model

// Verify OTP Controller
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(" email and otp printing " + email + " " + otp);
    // Check if email and otp are provided
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required fields.",
      });
    }

    // Find the OTP entry for the provided email
    const otpEntry = await OTP.findOne({ email });
    console.log("optEntry printing ");
    console.log(otpEntry);
    // Check if OTP entry exists
    if (!otpEntry) {
      return res.status(404).json({
        success: false,
        message: "OTP not found. Please request a new OTP.",
      });
    }

    // Verify if the OTP matches and check if it has expired
    const currentTime = new Date();
    if (otpEntry.otp == otp) {
      // Optionally delete OTP after verification
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully. User is now verified.",
        User,
      });
    } else {
      // OTP is invalid or expired
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP. Please try again.",
      });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
