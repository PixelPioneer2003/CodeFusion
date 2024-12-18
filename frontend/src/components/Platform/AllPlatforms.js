import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllProfiles } from "../../api/platformApi"; // Assume this function fetches data from your backend
import LeetCodePage from "./LeetCodePage";
import CodeforcesPage from "./CodeforcesPage";

const ProfileList = () => {
  return (
    <div className="profile-list">
      <h2>All Added Profiles</h2>
      <LeetCodePage />
      <CodeforcesPage />
    </div>
  );
};

export default ProfileList;
