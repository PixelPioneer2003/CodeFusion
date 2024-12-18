// client/src/api/platformApi.js
import axios from "axios";

// Function to add a new platform with the username
export const addPlatform = async (platformData) => {
  try {
    console.log("frontend call ho gya h addPlatform se");
    const response = await axios.post(
      "http://localhost:3000/api/v1/createPlatform",
      platformData
    );
    console.log("ye rha response bhai  " + response.data);
    return response;
  } catch (error) {
    throw new Error("Error adding platform data");
  }
};
export const fetchAllProfiles = async (userId, platform) => {
  try {
    // Pass platform as part of the URL parameter
    const response = await axios.get(
      `http://localhost:3000/api/v1/platformDetail/${userId}/${platform}`
    );

    // Check if the response is successful
    if (response.data.success) {
      console.log("Platforms:", response.data.platformData); // Log the platforms data
      return response.data.platformData; // Return the platform data
    } else {
      console.error("Error: No platforms found for this user");
      return []; // Return an empty array if no data is found
    }
  } catch (error) {
    console.error("Failed to fetch profiles:", error.message); // Log the error
    throw new Error("Failed to fetch profiles");
  }
};
