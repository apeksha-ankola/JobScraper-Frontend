import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
// import axios from 'axios';
import logo from "../Images/no-bg.png";

const LoginSignup = ({ setIsAuthenticated }) => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    userName: "",
    location: "",
    phone: "",
  });

  // const [error, setError] = useState('');

  const navigate = useNavigate();
  // const BASE_URL = 'http://127.0.0.1:5000';

  const handleSwitcher = (isLogin) => {
    setIsLoginActive(isLogin);
    // setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   const endpoint = isLoginActive
  //     ? `${BASE_URL}/login`
  //     : `${BASE_URL}/signup`;

  //   const payload = {
  //     username: formData.userName,
  //     password: formData.password,
  //   };

  //   if (!isLoginActive) {
  //     payload.name = formData.name;
  //     payload.location = formData.location;
  //     payload.phone = formData.phone;
  //     payload.email = formData.email;
  //   }

  //   try {
  //     const response = await axios.post(endpoint, payload, { 
  //       withCredentials: true 
  //     });

  //     if (response.status === 200 || response.status === 201) {
  //       const data = response.data;
        
  //       // Update session storage and state
  //       sessionStorage.setItem('username', data.username);
  //       sessionStorage.setItem('isLoggedIn', 'true');
        
  //       // Update parent component's state
  //       setIsAuthenticated(true);
  //       setUsername(data.username);

  //       // Redirect to home page
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     // Handle specific error responses
  //     if (error.response) {
  //       setError(error.response.data.message || 'An error occurred');
  //     } else {
  //       setError('Network error. Please try again.');
  //     }
  //     console.error('Error during request:', error);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate("/home");
  };

  return (
    <div className="login-signup-container">
      <div className="info-section">
        <h1>Welcome to JobScraper</h1>
        <p>
          Discover jobs tailored to your skills and preferences. <br />
          Build and customize your resumes effortlessly. <br />
          Apply smarter with AI-powered insights!
        </p>
        <div className="animated-logo">
          <img src={logo} alt="Animated Logo" />
        </div>
      </div>
      <div className="form-section">
        <section className="forms-section">
          <h1 className="section-title">Join Us</h1>
          <div className="forms">
            <div className={`form-wrapper ${isLoginActive ? "is-active" : ""}`}>
              <button
                type="button"
                className="switcher switcher-login"
                onClick={() => handleSwitcher(true)}
              >
                Login
                <span className="underline"></span>
              </button>
              <form className="form form-login" onSubmit={handleSubmit}>
                <fieldset>
                  <div className="input-block">
                    <label htmlFor="login-username">Username</label>
                    <input
                      id="login-username"
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-block">
                    <label htmlFor="login-password">Password</label>
                    <input
                      id="login-password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </fieldset>
                <button type="submit" className="btn-login">
                  Login
                </button>
              </form>
            </div>
            <div className={`form-wrapper ${!isLoginActive ? "is-active" : ""}`}>
              <button
                type="button"
                className="switcher switcher-signup"
                onClick={() => handleSwitcher(false)}
              >
                Sign Up
                <span className="underline"></span>
              </button>
              <form className="form form-signup" onSubmit={handleSubmit}>
                <fieldset>
                  <div className="input-block">
                    <label htmlFor="signup-name">Name</label>
                    <input
                      id="signup-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLoginActive}
                    />
                  </div>
                  <div className="input-block">
                    <label htmlFor="signup-email">E-mail</label>
                    <input
                      id="signup-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-block">
                    <label htmlFor="signup-username">Username</label>
                    <input
                      id="signup-username"
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      required={!isLoginActive}
                    />
                  </div>
                  <div className="input-block">
                    <label htmlFor="signup-password">Password</label>
                    <input
                      id="signup-password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </fieldset>
                <button type="submit" className="btn-signup">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginSignup;