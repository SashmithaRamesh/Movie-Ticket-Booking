import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleDashboardClick = () => {
    navigate("/dash");
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setDropdownOpen(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="cs-header">
      <div className="cs-logo">CineTicket</div>
      <div className="cs-auth-buttons">
        {isAuthenticated ? (
          <div className="cs-dropdown" ref={dropdownRef}>
            <img
              src="https://st4.depositphotos.com/21557188/23281/v/450/depositphotos_232811456-stock-illustration-female-symbol-simple-icon-woman.jpg"
              alt="Profile"
              className="cs-profile-icon"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="cs-dropdown-menu">
                <button onClick={handleDashboardClick}>Dashboard</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/log">
              <button className="cs-login-btn">Login</button>
            </Link>
            <Link to="/reg">
              <button className="cs-signup-btn">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;