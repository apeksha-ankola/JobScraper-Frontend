import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/Landingpage/LandingPage";
import About from "./Components/About/About";
// import JobCards from "./Components/JobCards/JobCards";
import DummyCards from "./Components/DummyCards/DummyCards";
import CompanyCarousel from "./Components/Carousel/CompanyCarousel";
import "./App.css";
import logo from "./Components/Images/no-bg.png";

import LoginSignup from "./Components/Dashboard/LoginSignup";
import Profile from "./Components/Profile/Profile";

const App = () => {
  const [view, setView] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // Check if user is logged in on component mount
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(loggedIn);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
     // Update state to trigger UI change
  };

  return (
    <Router>
      <Routes>
        {/* Login/Signup Page */}
        {!isAuthenticated && (
          <Route
            path="/login"
            element={<LoginSignup setIsAuthenticated={setIsAuthenticated} />}
          />
        )}

        {/* Main Application */}
        {isAuthenticated && (
          <Route
            path="/"
            element={
              <div className="app">
                <Navbar handleLogout={handleLogout}/>
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
                <div id="jobs" className="cardsection">
                  <h1>Jobs</h1>
                  <p>Explore the latest job opportunities!</p>
                  <div className="job-cards-container">
                    <DummyCards jobs={jobsData} />
                  </div>
                </div>
                <CompanyCarousel />
                <div id="internships" className="cardsection">
                  <h1>Internships</h1>
                  <p>Discover exciting internships to kickstart your career.</p>
                  <div className="job-cards-container">
                    <DummyCards jobs={jobsData} />
                  </div>
                </div>
                <CompanyCarousel />
                <div id="about" className="section">
                  <About />
                </div>
              </div>
            }
          />
        )}
        {/* Profile Section */}
        <Route path="/profile" element={<Profile />} />

        {/* Redirects */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
