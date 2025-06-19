import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/')
      console.log('Logged-in user details:', result.user);
    } else {
      alert(result.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong during login.');
  }
};

  return (
    <div className="cinelogin-container">
      <header className="cinelogin-header">
        <div className="cinelogin-logo">
          <span>CineTicket</span>
        </div>
        <Link to='/reg'>
          <button className="cinelogin-register-btn">Register</button>
        </Link>
      </header>

      <form className="cinelogin-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>Access your CineTicket account</p>

        <div className="cinelogin-group">
          <label htmlFor="username">Username or Email</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username or email"
            value={loginData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="cinelogin-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="cinelogin-submit-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
