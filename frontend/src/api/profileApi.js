// src/api/profileApi.js
import axios from "axios";
export const getProfile = async (userId, BASE_URL) => {
  try {
    console.log("printing base url is " + BASE_URL);
    const response = await axios.get(
      `${BASE_URL}/api/v1/personalProfile/${userId}`
    );
    console.log(response.data);
    return response.data.personalProfile;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw new Error("Failed to fetch profile. Please try again later.");
  }
};

export const updateProfile = async (userId, profile, BASE_URL) => {
  console.log("printing base url");
  console.log(BASE_URL);
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/personalProfile/${userId}`,
      profile
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response.data.message || error.message
    );
    throw new Error("Failed to update profile. Please try again later.");
  }
};
