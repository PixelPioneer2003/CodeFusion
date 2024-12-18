const express = require("express");
// route cretae karna hai toh router ki help se
const router = express.Router();

// import the routes
const {
  updatePersonalProfile,
  getPersonalProfile,
} = require("../controllers/personalProfile");
const {
  createPlatform,
  getAllPlatformDetail,
} = require("../controllers/platformProfile");
const { login, signup, sendOtp } = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
const { verifyOtp } = require("../controllers/verify-otp");
const { saveLeetcodeData } = require("../utils/platformApiHelpers");
//Mapping create
router.post("/saveLeetcodeData", saveLeetcodeData);
router.post("/createPlatform", createPlatform);
router.get("/platformDetail/:userId/:platform", getAllPlatformDetail);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/personalProfile/:userId", getPersonalProfile);
// Update the personal profile by userId
router.put("/personalProfile/:userId", updatePersonalProfile);
router.post("/signup", signup);
router.post("/login", login);
module.exports = router;
