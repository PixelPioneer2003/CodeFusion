const ExtractUserId = require("../controllers/ExtractUserId");
const addPlatformAndFetchData = async (req, res) => {
  const { platform, username } = req.body;
  let userId = await ExtractUserId();
  if (!platform || !username) {
    return res
      .status(400)
      .json({ message: "Platform and Username are required" });
  }

  try {
    let platformData;

    return res.status(200).json({ data: platformData });
  } catch (error) {
    console.error("Error fetching platform data:", error);
    return res.status(500).json({ message: "Error fetching platform data" });
  }
};

module.exports = {
  addPlatformAndFetchData,
};

// Fetch platform data based on the platform selected
// if (platform === "Leetcode") {
//   platformData = await fetchLeetcodeData(username);
// } else if (platform === "Codechef") {
//   platformData = await fetchCodechefData(username);
// } else if (platform === "Codeforces") {
//   platformData = await fetchCodeforcesData(username);
// } else {
//   return res.status(400).json({ message: "Invalid platform" });
// }
