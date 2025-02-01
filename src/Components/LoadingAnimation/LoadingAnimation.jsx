import React from "react";
import "./LoadingAnimation.css";

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Scraping data, please wait...</p>
      <p>Expected time : 25 secs.....</p>
    </div>
  );
};

export default LoadingAnimation;
