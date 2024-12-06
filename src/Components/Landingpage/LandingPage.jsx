import React, { useState } from "react";
import JobCards from "../JobCards/JobCards";
import "./LandingPage.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import axios from "axios";

const LandingPage = ({ setView }) => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle generating cover letter
  const handleGenerateCoverLetter = async (job) => {
    const payload = {
      name:"Ayaj Anand",
      job_position: job.title,
      company_name: job.company,
    };
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/generate-cover-letter",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob", // Ensures we receive the file as a Blob
        }
      );
  
      // Create a blob URL for the PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
  
      // Open the blob URL in a new tab
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating cover letter:", error);
      alert("Failed to generate cover letter. Please try again.");
    }
  };

  const handleGenerateResume = async (job) => {
    const payload = {
      name:"Ayaj Anand",
      job_position: job.title,
      company_name: job.company,
    };
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/generate-resume",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob", // Ensures we receive the file as a Blob
        }
      );
  
      // Create a blob URL for the PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
  
      // Open the blob URL in a new tab
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating Resume:", error);
      alert("Failed to generate cover letter. Please try again.");
    }
  };

  const fetchJobs = async (type) => {
    setLoading(true);
    setView("loading");

    try {
      const encodedType = encodeURIComponent(type);
      const apiUrl = `http://127.0.0.1:5000/jobs?search=${encodedType}`;
      const token = "da_anandz"; // Replace with your actual token if needed

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const jobsData = response.data.jobs;
      const formattedJobs = jobsData.map((job) => ({
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
      setLoading(false);
      setView("results");
    }
  };

  const fetchInternships = async (type) => {
    setLoading(true);
    setView("loading");

    try {
      const encodedType = encodeURIComponent(type);
      const apiUrl = `http://127.0.0.1:5000/internships?search=${encodedType}`;
      const token = "da_anandz"; // Replace with your actual token if needed

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      const jobsData = response.data.jobs;
      console.log(jobsData)
      const formattedJobs = jobsData.map((job) => ({
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
      setLoading(false);
      setView("results");
    }
  };

  // Filter jobs based on search query

  // const filteredJobs = jobs.filter((job) =>
  //   job.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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
