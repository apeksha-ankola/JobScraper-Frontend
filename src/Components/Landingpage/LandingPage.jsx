import React, { useState } from "react";
import JobCards from "../JobCards/JobCards";
import "./LandingPage.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const LandingPage = ({ setView }) => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchJobs = (type) => {
    setLoading(true);
    setView("loading");
    setTimeout(() => {
      const mockJobs = [
        { title: "Frontend Developer", company: "ABC Inc.", location: "NYC" },
        { title: "Intern - Data Science", company: "XYZ Ltd.", location: "Remote" },
        { title: "Backend Engineer", company: "123 Tech", location: "SF" },
        { title: "Marketing Intern", company: "Marketing Pro", location: "Remote" },
        { title: "UX Designer", company: "Designify", location: "LA" },
        { title: "AI Engineer", company: "Innovate AI", location: "Seattle" },
      ];

      setJobs(mockJobs);
      setLoading(false);
      setView("results");
    }, 1000);
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="landing-page">
      {loading && <LoadingAnimation />}

      {!loading && (
        <div className="search-container">
          <h2>Search for Jobs and Internships</h2>
          <input
            type="text"
            placeholder="Search here..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
          <div className="button-group">
            <button onClick={() => fetchJobs("jobs")} className="scrape-btn">
              Scrape Jobs Only
            </button>
            <button onClick={() => fetchJobs("internships")} className="scrape-btn">
              Scrape Internships Only
            </button>
          </div>
        </div>
      )}

      {jobs.length > 0 && (
        <div className="job-cards-container">
          {filteredJobs.length > 0 ? (
            <JobCards jobs={filteredJobs} />
          ) : (
            <p>No jobs found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
