const axios = require("axios");
const LeetCode = require("../models/LeetCode");
const Codeforces = require("../models/CodeForces"); // Assuming this is the path to the Codeforces model

// Fetch general profile data from LeetCode API
const fetchLeetcodeData = async (username) => {
  console.log("Fetching general LeetCode profile data...");
  const url = `https://alfa-leetcode-api.onrender.com/${username}`;
  try {
    const response = await axios.get(url);
    console.log("General profile data fetched successfully:", response.data);
    return response.data; // Return the general profile data
  } catch (error) {
    console.error("Error fetching general LeetCode data:", error.message);
    throw new Error("Failed to fetch general profile data from LeetCode");
  }
};

// Fetch contest-specific data from LeetCode contest API
const fetchLeetcodeContestData = async (username) => {
  console.log("Fetching LeetCode contest data...");
  const url = `https://alfa-leetcode-api.onrender.com/${username}/contest`;
  try {
    const response = await axios.get(url);
    console.log("Contest data fetched successfully:", response.data);
    return response.data; // Return the contest-specific data
  } catch (error) {
    console.error("Error fetching LeetCode contest data:", error.message);
    throw new Error("Failed to fetch contest data from LeetCode");
  }
};

// Save LeetCode data (general + contest) into the database
const saveLeetcodeData = async (username, userId) => {
  try {
    // Fetch general profile data
    const leetCodeDetails = await fetchLeetcodeData(username);
    if (leetCodeDetails?.error) {
      return { error: leetCodeDetails.error }; // Return error to indicate invalid username
    }
    // Fetch contest-specific data
    const contestData = await fetchLeetcodeContestData(username);

    // Create a new entry for the LeetCode profile in the database
    const newLeetCodeProfile = new LeetCode({
      userId,
      username: leetCodeDetails.username,
      name: leetCodeDetails.name || "",
      ranking: leetCodeDetails.ranking || 0,
      reputation: leetCodeDetails.reputation || 0,
      country: leetCodeDetails.country || "",
      skillTags: leetCodeDetails.skillTags || [],
      about: leetCodeDetails.about || "",
      contestAttend: contestData.contestAttend || 0, // From contest data
      contestRating: contestData.contestRating || 0, // From contest data
      contestGlobalRanking: contestData.contestGlobalRanking || 0, // From contest data
    });

    // Save to the database
    const savedProfile = await newLeetCodeProfile.save();
    console.log("LeetCode profile saved successfully:", savedProfile);

    return savedProfile;
  } catch (error) {
    console.error("Error saving LeetCode profile:", error.message);
    throw new Error("Failed to save LeetCode profile");
  }
};

const fetchCodeforcesData = async (username) => {
  const url = `https://codeforces.com/api/user.info?handles=${username}`;
  try {
    const response = await axios.get(url);

    // Check if the API returned a valid result
    if (response.data.status === "OK" && response.data.result.length > 0) {
      const userInfo = response.data.result[0]; // Extract user data from the result array
      return userInfo;
    } else {
      throw new Error("Error: Unable to fetch user info or invalid username.");
    }
  } catch (error) {
    console.error("Error fetching data from Codeforces:", error.message);
    throw new Error("Failed to fetch data from Codeforces");
  }
};

// Save Codeforces data to the database
const saveCodeforcesData = async (username, userId) => {
  try {
    // Fetch general user data from Codeforces API
    const codeforcesDetails = await fetchCodeforcesData(username); // Fetch user data

    // Validate the response data
    if (!codeforcesDetails || codeforcesDetails.status === "FAILED") {
      return { error: "Invalid username or data not found" }; // Return error if user not found or API failed
    }

    // Extract user data from the response
    const user = codeforcesDetails;

    // Create a new entry for the Codeforces profile in the database
    const newCodeforcesProfile = new Codeforces({
      userId,
      handle: user.handle,
      contribution: user.contribution || 0,
      rating: user.rating || 0,
      friendOfCount: user.friendOfCount || 0,
      rank: user.rank || "newbie", // Default to 'newbie' if not available
      maxRank: user.maxRank || "newbie", // Default to 'newbie' if not available
      maxRating: user.maxRating || 0,
      registrationDate: new Date(user.registrationTimeSeconds * 1000),
    });

    // Save the profile to the database
    const savedProfile = await newCodeforcesProfile.save();
    console.log("Codeforces profile saved successfully:", savedProfile);

    return savedProfile;
  } catch (error) {
    console.error("Error saving Codeforces profile:", error.message);
    throw new Error("Failed to save Codeforces profile");
  }
};

// Export helper functions
module.exports = {
  fetchLeetcodeData,
  fetchLeetcodeContestData,
  saveLeetcodeData,
  fetchCodeforcesData,
  saveCodeforcesData,
};
