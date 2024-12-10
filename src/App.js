import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/Landingpage/LandingPage";
import About from "./Components/About/About";
// import JobCards from "./Components/JobCards/JobCards";
import DummyCards from "./Components/DummyCards/DummyCards";
import CompanyCarousel from "./Components/Carousel/CompanyCarousel";
import "./App.css";
import logo from "./Components/Images/no-bg.png";


const App = () => {
  const [view, setView] = useState("home");

  // Dummy jobs data
  const jobsData = [
    {
      title: "Specialist Programmer",
      company: "Infosys",
      EmploymentType: "Full Time",
      location: "Mysuru, Karnataka",
    },
    {
      title: "Associate TS Engineer",
      company: "Synamedia",
      EmploymentType: "Internship + Full Time",
      location: "Bengaluru, Karnataka",
    },
    {
      title: "Graduate Engineer Trainee",
      company: "LTI-Mindtree",
      EmploymentType: "Internship + Full Time",
      location: "Bengaluru, Karnataka",
    },
    {
      title: "GenC Next | Pro | Genc ",
      company: "Cognizant",
      EmploymentType: "Full Time",
      location: "Remote Working",
    },
  ];

  return (
    <Router>
      <div className="app">
        <Navbar />
        {/* Home Section */}
        <div id="home" className="section home-section">
          {view === "home" && (
            <div className="home-content">
              <h1>Welcome to Job-Scraper</h1>
              <p>Find your dream job or internship here.</p>
            </div>
          )}

          {view === "home" && (
            <div className="home-logo">
              <img src={logo} alt="Logo" className="animated-logo" />
            </div>
          )}

          {/* LandingPage handles dynamic view changes */}
          <LandingPage setView={setView} />
        </div>
        {/* Jobs Section */}
        <div id="jobs" className="cardsection">
          <h1>Jobs</h1>
          <p>Explore the latest job opportunities!</p>
          <div className="job-cards-container">
            <DummyCards jobs={jobsData} /> {/* Pass jobsData to JobCards */}
          </div>
        </div>
        {/* Company Logos Carousel */}
        <CompanyCarousel /> {/* Infinite carousel of company logos */}
        {/* Internships Section */}
        <div id="internships" className="cardsection">
          <h1>Internships</h1>
          <p>Discover exciting internships to kickstart your career.</p>
          <div className="job-cards-container">
            <DummyCards jobs={jobsData} />{" "}
            {/* You can replace jobsData with internship data */}
          </div>
        </div>
        {/* Company Logos Carousel */}
        <CompanyCarousel /> {/* Infinite carousel of company logos */}
        {/* About Us Section */}
        <div id="about" className="section">
          <About />
        </div>
      </div>
    </Router>
  );
};

export default App;