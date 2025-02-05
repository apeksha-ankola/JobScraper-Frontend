import React, { useState } from "react";
import "./JobCards.css";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FcDocument } from "react-icons/fc";

const JobCards = ({ jobs, handleGenerateCoverLetter, handleGenerateResume }) => {
  const [loadingJobIndex, setLoadingJobIndex] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleClick = (job, type) => {
    if (disabled) return;
    setDisabled(true);
    setLoadingJobIndex(job);
    
    if (type === "coverLetter") {
      handleGenerateCoverLetter(job);
    } else {
      handleGenerateResume(job);
    }

    setTimeout(() => {
      setDisabled(false);
      setLoadingJobIndex(null);
    }, 3000);
  };

  return (
    <div className="job-cards-grid">
      {jobs.map((job, index) => (
        <div key={index} className="job-card">
          <h3>{job.title}</h3>
          <p>
            <strong>Company:</strong> {job.company}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <a href={job.link} target="_blank" rel="noopener noreferrer" className="apply-link">
            Link to Apply
          </a>
          <div className="icon-container">
            {loadingJobIndex === job ? (
              <div className="spinner"></div>
            ) : (
              <>
                <SlEnvolopeLetter
                  size={32}
                  className="icon-btn"
                  onClick={() => handleClick(job, "coverLetter")}
                  title="Generate Cover Letter"
                  disabled={disabled}
                />
                <FcDocument
                  size={32}
                  className="icon-btn"
                  onClick={() => handleClick(job, "resume")}
                  title="Generate Resume"
                  disabled={disabled}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCards;
