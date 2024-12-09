import React from "react";
import "./JobCards.css";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FcDocument } from "react-icons/fc";

const JobCards = ({ jobs, handleGenerateCoverLetter, handleGenerateResume }) => {
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
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="apply-link"
          >
            Link to Apply
          </a>
          <div className="icon-container">
            <SlEnvolopeLetter
              size={32}
              className="icon-btn"
              onClick={() => handleGenerateCoverLetter(job)}
              title="Generate Cover Letter"
            />
            <FcDocument
              size={32}
              className="icon-btn"
              onClick={() => handleGenerateResume(job)}
              title="Generate Resume"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCards;