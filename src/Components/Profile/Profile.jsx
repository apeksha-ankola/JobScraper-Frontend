import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const storedUsername = sessionStorage.getItem("username");
  const storedName = sessionStorage.getItem("Name");
  const storedPhone = sessionStorage.getItem("Phone");
  const storedGithub = sessionStorage.getItem("Github");
  const storedLinkedin = sessionStorage.getItem("LinkedIn");
  const storedLocation = sessionStorage.getItem("Location");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: storedName || "Name",
    phone: storedPhone || "+91 1234567891",
    location: storedLocation || "City Name",
    github: storedGithub || "Github Account URL",
    linkedin: storedLinkedin || "LinkedIn Profile URL",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!storedUsername) {
      setMessage("Username not found in local storage. Please log in.");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    if (name === "fullName") {
      sessionStorage.setItem("Name", value);
    } else if (name === "phone") {
      sessionStorage.setItem("Phone", value);
    } else if (name === "github") {
      sessionStorage.setItem("Github", value);
    } else if (name === "linkedin") {
      sessionStorage.setItem("LinkedIn", value);
    } else if (name === "location") {
      sessionStorage.setItem("Location", value);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setMessage("");
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    if (!storedUsername) {
      setMessage("Username not found in local storage. Cannot update profile.");
      return;
    }

    try {
      const formData = {
        username: storedUsername,
        ...profileData,
      };

      const response = await axios.post("http://127.0.0.1:5000/profile", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Welcome, {profileData.fullName}</h1>
        <p>Your personalized job-matching assistant</p>
      </header>

      <section className="profile-details">
        <div className="profile-card">
          {!isEditing && (
            <div className="button-group">
              <button className="edit-profile-btn" onClick={handleEditClick}>
                Edit Profile
              </button>
              <button className="edit-profile-btn" onClick={handleBackClick}>
                Back
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="personal-info">
        <h2>Personal Information</h2>
        <div className="info-list">
          {["fullName", "phone", "location", "github", "linkedin"].map((field) => (
            <div className="info-item" key={field}>
              <span>{field.replace(/^\w/, (c) => c.toUpperCase())}:</span>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={profileData[field]}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData[field]}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {isEditing && (
        <div className="button-group">
          <button className="update-info-btn" onClick={handleSaveClick}>
            Save Changes
          </button>
          <button className="update-info-btn" onClick={handleBackClick}>
            Back
          </button>
        </div>
      )}

      {message && <p className="update-message">{message}</p>}
    </div>
  );
};

export default Profile;
