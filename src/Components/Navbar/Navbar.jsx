import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiMenuSearchFill } from "react-icons/ri";
import "./Navbar.css";
import logo from "../Images/no-bg111.png";

const Navbar = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const name = sessionStorage.getItem("username"); // Retrieve the name from sessionStorage

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
          <h2>
            JobScraper <span className="user-name">{name}</span>
          </h2>
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
