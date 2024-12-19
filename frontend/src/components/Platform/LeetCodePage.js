import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllProfiles } from "../../api/platformApi"; // Assume this function fetches data from your backend
import { useAuth } from "../../context/AuthContext";

const LeetCodePage = () => {
  const { BASE_URL } = useAuth();
  const { userId } = useParams();
  const [profiles, setProfiles] = useState([]); // Store multiple profiles
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLeetCodeProfiles = async () => {
      try {
        console.log("frontend of leetcode");
        const platform = "Leetcode";
        const data = await fetchAllProfiles(userId, platform, BASE_URL); // Fetch LeetCode profiles associated with userId
        console.log("LeetCode data received:", data);
        setProfiles(data); // Set all profiles from the response
      } catch (err) {
        setError(err.message); // Set error state if any error occurs
      }
    };

    getLeetCodeProfiles(); // Call the function to fetch LeetCode profiles
  }, [userId]); // Dependency on userId to refetch when userId changes

  return (
    <div className="profile-page">
      <h2>LeetCode Profiles</h2>
      {error && <p className="error">{error}</p>}{" "}
      {/* Show error message if there is one */}
      {profiles.length === 0 ? (
        <p>Loading LeetCode profiles...</p> // Show loading state if data is still being fetched
      ) : (
        profiles.map(
          (
            profile,
            index // Iterate over the profiles array
          ) => (
            <div className="profile-card" key={index}>
              <h3>{profile.platform} Profile</h3> {/* Platform Name */}
              <p>
                <strong>Username:</strong> {profile.username || "N/A"}
              </p>
              <p>
                <strong>Name:</strong> {profile.name || "N/A"}
              </p>
              <p>
                <strong>Ranking:</strong> {profile.ranking || "N/A"}
              </p>
              <p>
                <strong>Reputation:</strong> {profile.reputation || "N/A"}
              </p>
              <p>
                <strong>Country:</strong> {profile.country || "N/A"}
              </p>
              {profile.skillTags && profile.skillTags.length > 0 && (
                <p>
                  <strong>Skills:</strong> {profile.skillTags.join(", ")}
                </p>
              )}
              <p>
                <strong>About:</strong>{" "}
                {profile.about || "No information provided"}
              </p>
              <p>
                <strong>Contests Attended:</strong>{" "}
                {profile.contestAttend || "N/A"}
              </p>
              <p>
                <strong>Contest Rating:</strong>{" "}
                {profile.contestRating || "N/A"}
              </p>
              <p>
                <strong>Global Ranking:</strong>{" "}
                {profile.contestGlobalRanking || "N/A"}
              </p>
              <p>
                <strong>LinkedIn:</strong>
                {profile.linkedIN ? (
                  <a
                    href={profile.linkedIN}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.linkedIN}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
              <img
                src={profile.avatar || "default-avatar.jpg"} // Default avatar if not provided
                alt={`${profile.username} Avatar`}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          )
        )
      )}
    </div>
  );
};

export default LeetCodePage;
