// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import ProfileForm from "../components/Profile/ProfileForm";
import ProfileCard from "../components/Profile/ProfileCard";
import { getProfile } from "../api/profileApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user.userId) {
      // If the userId is empty, redirect to the login page
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      console.log("right now we are in fetchProfile");
      console.log(user);
      console.log("userid is " + " " + user.userId);

      try {
        const data = await getProfile(user.userId);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Profile Page</h1>
        {/* Button to navigate to Dashboard */}
        <Link to="/dashboard" style={styles.button}>
          Go to Dashboard
        </Link>
      </div>
      {profile ? (
        <>
          <ProfileCard profile={profile} />
          <ProfileForm initialProfile={profile} />
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    textAlign: "center",
    marginTop: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  button: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#007bff",
    padding: "10px 15px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export default ProfilePage;
