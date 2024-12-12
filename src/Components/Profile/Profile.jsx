import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Apeksha D Ankola",
    phone: "+91 1234567891",
    location: "Bengaluru Karnataka",
    github: "https://github.com/apeksha-ankola",
    linkedin: "https://www.linkedin.com/in/apeksha-d-ankola/",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log("Saved Profile Data:", profileData);
  };

  return (
    <div className="profile-container">
      {/* Header Section */}
      <header className="profile-header">
        <h1>Welcome, {profileData.name}</h1>
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
          {/* <h2>{profileData.name}</h2> */}
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
          {["name", "phone", "location","github", "linkedin" ].map(
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
