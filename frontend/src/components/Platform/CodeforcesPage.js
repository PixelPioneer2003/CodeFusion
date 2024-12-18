import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllProfiles } from "../../api/platformApi"; // Assume this function fetches Codeforces-specific data from your backend

const CodeforcesPage = () => {
  const { userId } = useParams();
  const [profiles, setProfiles] = useState([]); // Change to store multiple profiles
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCodeforcesProfiles = async () => {
      try {
        const platform = "Codeforces";
        const data = await fetchAllProfiles(userId, platform); // Fetch Codeforces profiles associated with userId
        console.log("Codeforces data received:", data);
        setProfiles(data); // Store multiple profiles in the state
      } catch (err) {
        setError(err.message); // Set error state if any error occurs
      }
    };

    getCodeforcesProfiles(); // Call the function to fetch the Codeforces profiles
  }, [userId]); // Dependency on userId to refetch when userId changes

  useEffect(() => {
    console.log("Updated profiles:", profiles); // Log profiles after the state has been updated
  }, [profiles]); // This will run whenever profiles state changes

  return (
    <div className="profile-page">
      <h2>Codeforces Profiles</h2>
      {error && <p className="error">{error}</p>}{" "}
      {/* Show error message if there is one */}
      {profiles.length === 0 ? (
        <p>Loading Codeforces profiles...</p> // Show loading state if data is still being fetched
      ) : (
        profiles.map((profile, index) => (
          <div className="profile-card" key={index}>
            <h3>{profile.platform} Profile</h3> {/* Platform Name */}
            <p>
              <strong>Username:</strong> {profile.handle || "N/A"}
            </p>
            <p>
              <strong>Name:</strong> {profile.name || "N/A"}
            </p>
            <p>
              <strong>Rank:</strong> {profile.rank || "N/A"}
            </p>
            <p>
              <strong>Max Rank:</strong> {profile.maxRank || "N/A"}
            </p>
            <p>
              <strong>Rating:</strong> {profile.rating || "N/A"}
            </p>
            <p>
              <strong>Max Rating:</strong> {profile.maxRating || "N/A"}
            </p>
            <p>
              <strong>Contributions:</strong> {profile.contribution}
            </p>
            <p>
              <strong>Friends Count:</strong> {profile.friendOfCount}
            </p>
            <p>
              <strong>Registration Date:</strong>{" "}
              {profile.registrationDate || "N/A"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CodeforcesPage;
