import React from "react";
import "./JobCards.css";

const JobCards = ({ jobs }) => {
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
        </div>
      ))}
    </div>
  );
};

export default JobCards;
