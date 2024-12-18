import React from "react";
import "./ProfileCard.css"; // Import the CSS file here

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card">
      <h2>{profile.name}</h2>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phoneNumber || "N/A"}</p>
      <p>Gender: {profile.gender || "N/A"}</p>
      <p>City: {profile.city || "N/A"}</p>
      <p>State: {profile.state || "N/A"}</p>
      <p>Bio: {profile.bio || "N/A"}</p>
      <p>
        Resume:{" "}
        <a
          href={profile.resume || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
      </p>
    </div>
  );
};

export default ProfileCard;
