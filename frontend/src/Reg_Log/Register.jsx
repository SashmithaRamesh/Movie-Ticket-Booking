import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    gender: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      gender: gender
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending formData:", formData);
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('User registered successfully!');
        localStorage.setItem('isAuthenticated', 'true');
        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }
        setFormData({ username: '', phone: '', email: '', password: '', gender: '' });
        navigate('/');
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="cineregister-container">
      <header className="cineregister-header">
        <div className="cineregister-logo">
          <span>CineTicket</span>
        </div>
        <Link to='/log'>
          <button className="cineregister-login-btn">Login</button>
        </Link>
      </header>

      <form className="cineregister-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <p>Join us to book your favorite movie tickets online!</p>

        <div className="cineregister-row">
          <div className="cineregister-group">
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cineregister-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="1234567890"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="cineregister-row">
          <div className="cineregister-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cineregister-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <small>Must be at least 8 characters.</small>
          </div>
        </div>

        <div className="cineregister-row">
          <div className="cineregister-group cineregister-gender-group">
            <label>Gender</label>
            <div className="gender-options">
              <button
                type="button"
                className={`cineregister-gender-btn ${formData.gender === 'Male' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('Male')}
              >
                Male
              </button>
              <button
                type="button"
                className={`cineregister-gender-btn ${formData.gender === 'Female' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('Female')}
              >
                Female
              </button>
              <button
                type="button"
                className={`cineregister-gender-btn ${formData.gender === 'Other' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('Other')}
              >
                Other
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="cineregister-submit-btn">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
