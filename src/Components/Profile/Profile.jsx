import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from 'axios';

const Profile = () => {
  const storedUsername = sessionStorage.getItem("username");
  const storedName = sessionStorage.getItem("Name")
  const storedPhone = sessionStorage.getItem("Phone")
  const storedGithub = sessionStorage.getItem("Github")
  const storedLinkedin = sessionStorage.getItem("LinkedIn")
  const storedLocation = sessionStorage.getItem("Location")
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: storedName || "Name",
    phone: storedPhone || "+91 1234567891",
    location: storedLocation || "City Name",
    github: storedGithub || "Github Account URL",
    linkedin: storedLinkedin || "LinkedIn Profile URL",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Set username from localStorage if it exists
    // const storedUsername = sessionStorage.getItem("username");
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
  
      // Correct axios POST request
      const response = await axios.post("http://127.0.0.1:5000/profile", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Handle success or error
      if (response.data.success) {
        setMessage(response.data.message);
        // console.log(response.data.user)
      } else {
        setMessage(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div className="profile-container">
      {/* Header Section */}
      <header className="profile-header">
        <h1>Welcome, {profileData.fullName}</h1>
        <p>Your personalized job-matching assistant</p>
      </header>

      {/* Profile Details Section */}
      <section className="profile-details">
        <div className="profile-card">
          {/* <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-image"
          /> */}
          {/* <h2>{profileData.fullName}</h2> */}
          {!isEditing && (
            <button className="edit-profile-btn" onClick={handleEditClick}>
              Edit Profile
            </button>
          )}
        </div>
      </section>

      {/* Personal Information Section */}
      <section className="personal-info">
        <h2>Personal Information</h2>
        <div className="info-list">
          {["fullName", "phone", "location", "github", "linkedin"].map(
            (field) => (
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
            )
          )}
        </div>
      </section>

      {/* Save Button */}
      {isEditing && (
        <button className="update-info-btn" onClick={handleSaveClick}>
          Save Changes
        </button>
      )}

      {/* Message Section */}
      {message && <p className="update-message">{message}</p>}

      {/* Resume Upload Section */}
      {/* <section className="profile-resume">
        <h2>Resume</h2>
        <div className="resume-upload">
          <p>Upload your latest resume to improve job matching.</p>
          <input type="file" className="resume-input" />
          <button className="upload-resume-btn">Upload</button>
        </div>
      </section> */}
    </div>
  );
};

export default Profile;
