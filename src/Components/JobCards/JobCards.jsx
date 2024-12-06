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
            className="link"
          >
            Link to Apply
          </a>
          <div className="icon-cover-letter-container">
            <SlEnvolopeLetter
              size={24}
              className="icon-cover-letter-btn"
              onClick={() => handleGenerateCoverLetter(job)}
              title="Generate Cover Letter"
            />
          </div>

          <div className="icon-cover-letter-container">
            <FcDocument
              size={24}
              className="icon-cover-letter-btn"
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
