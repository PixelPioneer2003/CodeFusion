const User = require("../models/User");
const PersonalProfile = require("../models/personalProfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const validator = require("validator");
exports.sendOtp = async (req, res) => {
  try {
    // Get the email from the request body
    const { email } = req.body;

    // Check if the email already exists in the User collection
    const UserExist = await User.findOne({ email });
    console.log("reached check pint 1");
    if (UserExist) {
      console.log("User already exists");
      return res.status(400).json({
        success: false,
        message: "User already exists. Please log in instead.",
      });
    }

    // Generate a 6-digit OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Ensure the OTP is unique
    let checkUnique = await OTP.findOne({ otp: otp });
    while (checkUnique) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      checkUnique = await OTP.findOne({ otp: otp });
    }
    console.log("unique otp is " + otp);
    // Prepare OTP payload and save it to the OTP collection
    const otppayload = { email, otp };
    await OTP.create(otppayload);

    // Return a successful response with the OTP sent message
    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
      otp, // You may want to remove this in production for security reasons
    });
  } catch (error) {
    console.error("Error while sending OTP:", error);
    return res.status(500).json({
      success: false,
      message: "OTP was not sent. An error occurred.",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("name , email , passoword " + name + email + password);

    // Check if required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required fields.",
      });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    // Create an empty personal profile for the user
    const newProfile = new PersonalProfile({
      userId: user._id, // Link the profile to the new user's ID
      phoneNumber: "",
      gender: "",
      city: "",
      state: "",
      bio: "",
      resume: "",
    });

    await newProfile.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing email or password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    // Verify the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    // Ensure JWT_SECRET exists in environment variables
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from environment variables.");
      return res.status(500).json({
        success: false,
        message: "Internal server error. Please contact support.",
      });
    }

    // Create JWT token
    const payload = { email: user.email, id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "23h",
    });

    // Save the token to the user document (optional)
    user.token = token;
    await user.save();

    // Set secure cookie options
    const options = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    // Remove password from the response
    user.password = undefined;
    // Send response with cookie
    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Logged in successfully",
    });
  } catch (error) {
    // Handle errors and prevent duplicate responses
    console.error("Login error:", error);
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "User unable to login.",
        error: error.message,
      });
    }
  }
};
