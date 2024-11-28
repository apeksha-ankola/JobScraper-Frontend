import React from "react";
import "./LoadingAnimation.css";

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Scraping data, please wait...</p>
    </div>
  );
};

export default LoadingAnimation;
