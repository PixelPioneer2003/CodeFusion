import React, { useState } from "react";
import { updateProfile } from "../../api/profileApi";
import "./ProfileForm.css"; // Import the CSS file
import { useAuth } from "../../context/AuthContext";
const ProfileForm = ({ initialProfile }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(initialProfile);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("handle submit of profile form main present h");
      const response = await updateProfile(user.userId, profile);
      alert(response.message || "Profile updated successfully!");
    } catch (error) {
      alert(error.message || "Failed to update profile");
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>Update Profile</h2>
      <label>Phone Number:</label>
      <input
        type="text"
        name="phoneNumber"
        value={profile.phoneNumber || ""}
        onChange={handleChange}
      />

      <label>Gender:</label>
      <select
        name="gender"
        value={profile.gender || ""}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label>State:</label>
      <input
        type="text"
        name="state"
        value={profile.state || ""}
        onChange={handleChange}
      />

      <label>City:</label>
      <input
        type="text"
        name="city"
        value={profile.city || ""}
        onChange={handleChange}
        disabled={!profile.state} // Disable city if state is not selected
      />

      <label>Bio:</label>
      <textarea name="bio" value={profile.bio || ""} onChange={handleChange} />

      <label>Resume URL:</label>
      <input
        type="text"
        name="resume"
        value={profile.resume || ""}
        onChange={handleChange}
      />

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
