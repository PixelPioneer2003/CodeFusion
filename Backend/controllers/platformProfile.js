const LeetCode = require("../models/LeetCode");
const CodeForces = require("../models/CodeForces");
const PlatformProfile = require("../models/platformProfile");
const {
  saveLeetcodeData,
  saveCodeforcesData,
} = require("../utils/platformApiHelpers");

// Create a new platform entry
exports.createPlatform = async (req, res) => {
  const { platform, username, userId } = req.body;
  console.log("req ki body print krte h");
  console.log(req.body);
  console.log(userId);

  if (!platform || !username) {
    return res
      .status(400)
      .json({ message: "Platform and Username are required" });
  }

  if (!userId) {
    return res.status(400).json({ message: "User ID not found" });
  }

  // Check if the same credentials are already associated with the user
  const existingUser = await PlatformProfile.findOne({
    userId,
    username,
    platform,
  });

  if (existingUser) {
    console.log("same user id already present ");
    return res.status(400).json({
      success: false,
      message: `Username "${username}" for platform "${platform}" is already associated with this userId.`,
    });
  }

  try {
    // Create platform profile entry
    const platformPayload = { username, platform, userId };
    await PlatformProfile.create(platformPayload);

    // Now add all details about LeetCode by making a call
    if (platform === "Leetcode") {
      console.log("Leetcode data save point pr aa gaye h");
      const platformResponse = await saveLeetcodeData(username, userId);

      // Check if an error message is returned
      if (platformResponse?.error) {
        return res.status(400).json({
          success: false,
          message: "No such user exists on LeetCode",
        });
      }
    } else if (platform === "Codeforces") {
      console.log("Codeforces data save point pr aa gaye h");
      const platformResponse = await saveCodeforcesData(username, userId);
      // Check if an error message is returned
      if (platformResponse?.error) {
        return res.status(400).json({
          success: false,
          message: "No such user exists on Codeforces",
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Platform profiles added successfully",
    });

    // If platform is not LeetCode, you can handle other platforms here
  } catch (error) {
    console.error("Error fetching platform data:", error);
    return res.status(500).json({ message: "Error fetching platform data" });
  }
};

// Fetch all platform entries
exports.getAllPlatformDetail = async (req, res) => {
  const { userId, platform } = req.params;
  console.log("userID and platform " + userId + "  " + platform);

  try {
    let profileData;

    // Choose the database model based on the platform
    if (platform === "Leetcode") {
      profileData = await LeetCode.find({ userId });
    } else if (platform === "Codeforces") {
      profileData = await CodeForces.find({ userId });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Platform not supported" });
    }

    if (profileData) {
      return res.status(200).json({ success: true, platformData: profileData });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No data found for this platform" });
    }
  } catch (error) {
    console.error("Error fetching platform data:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
