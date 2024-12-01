import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* About Section */}
      <section className="about-container">
        <h1>About JobScraper</h1>
        <p>
          <strong>JobScraper</strong> is your one-stop platform for finding tailored job
          opportunities effortlessly. By leveraging advanced web scraping
          techniques, JobScraper aggregates job listings from top portals,
          saving you hours of manual searches.
        </p>
        <p>
          Our platform enables you to filter jobs based on your preferences and
          provides tools to customize your resumes and cover letters, ensuring
          you stand out in your applications.
        </p>
        <p>
          With periodic updates and a seamless user interface, JobScraper is
          designed to make job hunting efficient and personalized.
        </p>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-about">
          <h3>JobScraper</h3>
          <p>
            JobScraper simplifies your job search by bringing tailored job
            opportunities from top websites into one place.
          </p>
          <p>
            Explore, customize, and apply with ease—your career aspirations
            are just a few clicks away!
          </p>
        </div>

        <div className="footer-bottom--section">
          <hr />
          <p>&copy; {new Date().getFullYear()} JobScraper. All Rights Reserved.</p>
          <div className="privacy-terms">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;