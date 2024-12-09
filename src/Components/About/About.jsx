import React from "react";
import "./About.css";

import Apeksha from "../Images/Apeksha.jpg";
import Fatima from "../Images/Fatimaa.jpg";
import Ayaj from "../Images/Ayaj.jpg";

const teamMembers = [
  {
    name: "Apeksha D Ankola",
    photo: Apeksha,
    description: "Frontend Developer",
    link: "https://www.linkedin.com/in/apeksha-d-ankola/",
  },
  {
    name: "Fatima Amani",
    photo: Fatima,
    description: "Backend Engineer and Web Scraper",
    link: "https://www.linkedin.com/in/fatimaamani/",
  },
  {
    name: "Ayaj Anand",
    photo: Ayaj,
    description: "Full Stack Developer",
    link: "https://www.linkedin.com/in/ayaj-anand-492986127/",
  },
];

const About = () => {
  return (
    <div className="about-container">
      {/* Intro Section */}
      <div className="about-intro">
        <h1>About JobScraper</h1>
        <p>
          JobScraper is a platform tailored to streamline your job search
          journey by offering customized opportunities and assistance in creating
          exceptional resumes and cover letters.
        </p>
        <p>
          We aim to bridge the gap between talent and opportunity, empowering job
          seekers globally.
        </p>
      </div>

      {/* Divider Line */}
      <div className="divider-line1"></div>

      {/* Team Section */}
      <h1>Meet the Team</h1>
      <div className="team-section">
        {teamMembers.map((member, index) => (
          <div className="team-column" key={index}>
            <div className="team-photo-wrapper">
              <img
                src={member.photo}
                alt={member.name}
                className="team-photo"
              />
              <div className="team-hover">
                <h3>{member.name}</h3>
                <p>{member.description}</p>
                <a
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="hover-button">LinkedIn Profile</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider Line */}
      <div className="divider-line"></div>

      {/* Footer */}
      <footer className="about-footer">
        <p>
          Best viewed on the latest versions of Edge, Mozilla, Chrome, Opera, & Safari.
        </p>
        <p>Copyright © 2024 JobScraper Pvt Ltd - All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
