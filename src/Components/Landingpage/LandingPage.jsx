import React, { useState } from "react";
import JobCards from "../JobCards/JobCards";
import "./LandingPage.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import axios from "axios";

const LandingPage = ({ setView }) => {
  // Predefined list of job roles
  const jobRoles = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'UX Designer',
    'DevOps Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Project Manager',
    'Quality Assurance Engineer',
    'System Administrator',
    'Network Engineer',
    'Security Analyst',
    'Cloud Architect',
    'Mobile Developer',
    'Data Engineer',
    'Machine Learning Engineer',
    'Scrum Master',
    'Business Analyst',
    'Technical Writer'
  ];

  // Session storage data
  const storedName = sessionStorage.getItem("Name");
  const storedEmail = sessionStorage.getItem("Email");
  const storedGithub = sessionStorage.getItem("Github");
  const storedLinkedin = sessionStorage.getItem("LinkedIn");
  const storedPhone = sessionStorage.getItem("Phone");

  // State variables
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);

  // Handle input changes with autocomplete
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Filter suggestions
    const filteredSuggestions = jobRoles.filter(role =>
      role.toLowerCase().includes(value.toLowerCase())
    );
    
    setSuggestions(value ? filteredSuggestions : []);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (value) => {
    setSearchQuery(value);
    setSuggestions([]);
  };

  // Cover Letter Generation
  const handleGenerateCoverLetter = async (job) => {
    if (!storedName) {
      alert("Please fill the profile section first.");
      return;
    }

    const payload = {
      name: storedName,
      job_position: job.title,
      company_name: job.company,
      github: storedGithub,
      email: storedEmail,
      phone: storedPhone,
      linkedin: storedLinkedin
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/generate-cover-letter",
        payload,
        { headers: { "Content-Type": "application/json" }, responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating cover letter:", error);
      alert("Failed to generate cover letter. Please try again.");
    }
  };

  // Resume Generation
  const handleGenerateResume = async (job) => {
    if (!storedName) {
      alert("Please fill the profile section first.");
      return;
    }

    const payload = {
      name: storedName,
      job_position: job.title,
      company_name: job.company,
      github: storedGithub,
      email: storedEmail,
      linkedin: storedLinkedin
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/generate-resume",
        payload,
        { headers: { "Content-Type": "application/json" }, responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const newTab = window.open(url, "_blank");
      
      newTab.onload = () => {
        newTab.alert("This Resume is generated by AI. It needs to be revised thoroughly before putting it to use.");
      };
    } catch (error) {
      console.error("Error generating Resume:", error);
      alert("Failed to generate cover letter. Please try again.");
    }
  };

  // Fetch Jobs
  const fetchJobs = async (type) => {
    setLoading(true);
    setView("loading");
    const startTime = performance.now();
    setTimeTaken(null);

    try {
      const encodedType = encodeURIComponent(type);
      const response = await axios.get(`http://127.0.0.1:5000/jobs?search=${encodedType}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });

      const formattedJobs = response.data.jobs.map(job => ({
        title: job["Job Title"],
        company: job["Company"],
        location: job["Location"],
        link: job["Link_To_Apply"],
        summary: job["Summary"],
      }));

      setJobs(formattedJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      const endTime = performance.now();
      const duration = (endTime - startTime) / 1000; // Convert to seconds
      setTimeTaken(duration.toFixed(2)); // Update state

      setLoading(false);
      setView("results");
    }
  };

  // Fetch Internships
  const fetchInternships = async (type) => {
    const startTime = performance.now(); 
    setLoading(true);
    setView("loading");

    try {
      const encodedType = encodeURIComponent(type);
      const response = await axios.get(`http://127.0.0.1:5000/internships?search=${encodedType}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });

      const formattedJobs = response.data.jobs.map(job => ({
        title: job["Job Title"] || job["role"],
        company: job["Company"] || job["company"],
        location: job["Location"],
        link: job["Link_To_Apply"] || job["link_to_apply"],
        summary: job["Summary"],
      }));

      setJobs(formattedJobs);
    } catch (error) {
      console.error("Error fetching internships:", error);
      setJobs([]);
    } finally {
      const endTime = performance.now();
      const duration = (endTime - startTime) / 1000; // Convert to seconds
      setTimeTaken(duration.toFixed(2)); // Update state
      setLoading(false);
      setView("results");
    }
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="landing-page">
      {loading && <LoadingAnimation />}

      {!loading && (
        <div className="search-container">
          <h2>Search for Jobs and Internships</h2>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search here..."
              className="search-bar"
              value={searchQuery}
              onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((role, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(role)}
                  >
                    {role}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="button-group">
            <button onClick={() => fetchJobs(searchQuery)} className="scrape-btn">
              Scrape Jobs Only
            </button>
            <button
              onClick={() => fetchInternships(searchQuery)}
              className="scrape-btn"
            >
              Scrape Internships Only
            </button>
          </div>
        </div>
      )}
      {/* Display time taken after search */}
      {timeTaken !== null && (
        <p className="time-taken-message">
          YOUR SEARCH TOOK {timeTaken} SECONDS
        </p>
      )}

      {jobs.length > 0 && (
        <div className="job-cards-container">
          {filteredJobs.length > 0 ? (
            <JobCards
              jobs={filteredJobs}
              handleGenerateCoverLetter={handleGenerateCoverLetter}
              handleGenerateResume={handleGenerateResume}
            />
          ) : (
            <p>No jobs found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;