const {
  fetchLeetcodeData,
  fetchCodechefData,
  fetchCodeforcesData,
} = require("../utils/platformApiHelpers");
const AllPlatformDetails = async (platforms) => {
  try {
    const leetcodePlatforms = [];
    const codechefPlatforms = [];
    const codeforcesPlatforms = [];
    // Iterate through the platforms and categorize them based on platform name or identifier
    platforms.forEach((platform) => {
      if (platform.platform === "Leetcode") {
        leetcodePlatforms.push(platform);
      } else if (platform.platform === "Codechef") {
        codechefPlatforms.push(platform);
      } else if (platform.platform === "Codeforces") {
        codeforcesPlatforms.push(platform);
      }
    });
    // Fetch data from each platform
    const leetcodeData = await fetchLeetcodeData(leetcodePlatforms);
    const codechefData = await fetchCodechefData(codechefPlatforms);
    const codeforcesData = await fetchCodeforcesData(codeforcesPlatforms);
    // Combine the data from all platforms
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching LeetCode data" });
  }
};
module.exports = AllPlatformDetails;
