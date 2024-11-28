import React from "react";
import "./Navbar.css";
import logo from "../Images/no-bg111.png"

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
        <h1>JobScraper</h1>
      </div>
      <ul className="navbar-links">
        <li onClick={() => scrollToSection("home")}>Home</li>
        <li onClick={() => scrollToSection("jobs")}>Jobs</li>
        <li onClick={() => scrollToSection("internships")}>Internships</li>
        <li onClick={() => scrollToSection("about")}>About Us</li>
      </ul>
    </nav>
  );
};

export default Navbar;
