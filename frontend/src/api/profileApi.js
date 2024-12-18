// src/api/profileApi.js
import axios from "axios";

export const getProfile = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/personalProfile/${userId}`
    );
    console.log(response.data);
    return response.data.personalProfile;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw new Error("Failed to fetch profile. Please try again later.");
  }
};

export const updateProfile = async (userId, profile) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/v1/personalProfile/${userId}`,
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
