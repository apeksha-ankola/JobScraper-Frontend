import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiMenuSearchFill } from "react-icons/ri"; // Import the icon
import "./Navbar.css";
import logo from "../Images/no-bg111.png";

const Navbar = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the hamburger menu
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // Close menu after clicking a link
  };

  const logout = () => {
    handleLogout(); // Call the handleLogout function passed as a prop
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
          <h1>JobScraper</h1>
        </div>

        {/* Hamburger Icon */}
        <button className="hamburger" onClick={toggleMenu}>
          <RiMenuSearchFill className="menu-icon" />
        </button>

        {/* Navbar Links */}
        <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("jobs")}>Jobs</li>
          <li onClick={() => scrollToSection("internships")}>Internships</li>
          <li onClick={() => scrollToSection("about")}>About Us</li>
          <li onClick={logout}>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
