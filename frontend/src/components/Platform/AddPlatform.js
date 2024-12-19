import React, { useState } from "react";
import { addPlatform } from "../../api/platformApi";
import { useParams } from "react-router-dom";
import "./AddPlatform.css"; // Import the CSS file
import { useAuth } from "../../context/AuthContext";

const AddPlatform = () => {
  const { BASE_URL } = useAuth();
  const [platform, setPlatform] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { userId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!platform || !username) {
      setError("Both platform and username are required.");
      return;
    }
    const platformData = { platform, username, userId };
    try {
      const response = await addPlatform(platformData, BASE_URL);
      if (response && response.data.success) {
        setSuccess(true);
        setError(null);
      } else {
        setError("Failed to add platform.");
      }
    } catch (err) {
      setError(err.message || "Error adding platform.");
    }
  };

  return (
    <div className="add-platform-form-container">
      <h2 className="form-title">Add New Platform</h2>
      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">Platform added successfully!</p>}
      <form className="add-platform-form" onSubmit={handleSubmit}>
        <label htmlFor="platform" className="form-label">
          Platform
        </label>
        <select
          id="platform"
          name="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="form-select"
        >
          <option value="">Select Platform</option>
          <option value="Leetcode">Leetcode</option>
          <option value="Codechef">Codechef</option>
          <option value="Codeforces">Codeforces</option>
        </select>

        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />

        <button type="submit" className="form-button">
          Add Platform
        </button>
      </form>
    </div>
  );
};

export default AddPlatform;
