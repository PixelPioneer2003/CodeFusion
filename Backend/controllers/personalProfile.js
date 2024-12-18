const PersonalProfile = require("../models/personalProfile");

// Update Personal Profile
exports.updatePersonalProfile = async (req, res) => {
  const { userId } = req.params;
  const { phoneNumber, gender, city, state, bio, resume } = req.body;

  try {
    // Ensure 'city' can only be added if 'state' is provided
    if (city && !state) {
      return res.status(400).json({
        success: false,
        message: "State must be selected before adding a city.",
      });
    }

    // Find the profile by userId and update it
    const updatedProfile = await PersonalProfile.findOneAndUpdate(
      { userId },
      {
        phoneNumber,
        gender,
        city,
        state,
        bio,
        resume,
      },
      { new: true, upsert: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Personal Profile not found" });
    }

    res.status(200).json({
      personalProfile: updatedProfile,
      success: true,
      message: "Personal Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error at personal profile update controller",
      error: error.message,
    });
  }
};

exports.getPersonalProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("User ID:", userId);

    // Fetch personal profile from PersonalProfile model
    const profile = await PersonalProfile.findOne({ userId });
    console.log("printing the profile " + profile);
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, personalProfile: profile });
  } catch (error) {
    console.error("Error fetching personal profile:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error while fetching profile" });
  }
};
