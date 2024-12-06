import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import axios from 'axios';

const LoginSignup = ({ setIsAuthenticated, setUsername }) => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    userName: '',
    location: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const BASE_URL = 'http://127.0.0.1:5000';

  const handleSwitcher = (isLogin) => {
    setIsLoginActive(isLogin);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLoginActive
      ? `${BASE_URL}/login`
      : `${BASE_URL}/signup`;

    const payload = {
      username: formData.userName,
      password: formData.password,
    };

    if (!isLoginActive) {
      payload.name = formData.name;
      payload.location = formData.location;
      payload.phone = formData.phone;
      payload.email = formData.email;
    }

    try {
      const response = await axios.post(endpoint, payload, { 
        withCredentials: true 
      });

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        
        // Update session storage and state
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Update parent component's state
        setIsAuthenticated(true);
        setUsername(data.username);

        // Redirect to home page
        navigate('/');
      }
    } catch (error) {
      // Handle specific error responses
      if (error.response) {
        setError(error.response.data.message || 'An error occurred');
      } else {
        setError('Network error. Please try again.');
      }
      console.error('Error during request:', error);
    }
  };

  return (
    <section className="forms-section">
      <h1 className="section-title">Welcome to JobScraper</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="forms">
        <div className={`form-wrapper ${isLoginActive ? 'is-active' : ''}`}>
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
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">Username</label>
                <input
                  id="login-email"
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
            <button type="submit" className="btn-login">Login</button>
          </form>
        </div>
        <div className={`form-wrapper ${!isLoginActive ? 'is-active' : ''}`}>
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
                <label htmlFor="name">Name</label>
                <input
                  id="name"
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
                <label htmlFor="userName">UserName</label>
                <input
                  id="userName"
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required={!isLoginActive}
                />
              </div>
              <legend>Please, enter your email, password and details for sign up.</legend>
              <div className="input-block">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required={!isLoginActive}
                />
              </div>
              <div className="input-block">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required={!isLoginActive}
                />
              </div>
            </fieldset>
            <button type="submit" className="btn-signup">Sign Up</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginSignup;