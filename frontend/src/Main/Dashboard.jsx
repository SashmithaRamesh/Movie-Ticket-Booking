import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState("profile");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    membership: "Standard Member", // Default value
    notifications: {
      email: true,
      sms: false
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/dash");
      return;
    }
    try {
      const parsedUser = JSON.parse(stored);
      setUserData(prev => ({
        ...prev,
        ...parsedUser,
        // Add premium status if available
        membership: parsedUser.isPremium ? "Premium Member" : "Standard Member"
      }));
    } catch (e) {
      console.error("Invalid user data in localStorage:", e);
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleNotificationToggle = (type) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
    // Here you would typically also update the backend
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "profile":
        return (
          <div className="dashboard-section">
            <h2>Personal Information</h2>
            <div className="info-card">
              <div className="info-row">
                <span className="info-label">Username</span>
                <span className="info-value">{userData.username || "Not provided"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Gender</span>
                <span className="info-value">{userData.gender || "Not provided"}</span>
              </div>
            </div>

            <h2>Contact Information</h2>
            <div className="info-card">
              <div className="info-row">
                <span className="info-label">Email Address</span>
                <span className="info-value">{userData.email || "Not provided"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Phone Number</span>
                <span className="info-value">{userData.phone || "Not provided"}</span>
              </div>
            </div>

            <h2>Account Security</h2>
            <div className="info-card">
              <div className="info-row">
                <span className="info-label">Password</span>
                <span className="info-value">••••••••</span>
              </div>
              <button className="change-password-btn">Change Password</button>
            </div>

            <h2>Preferences</h2>
            <div className="info-card">
              <div className="preference-row">
                <span>Email Notifications</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={userData.notifications.email}
                    onChange={() => handleNotificationToggle("email")}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="preference-row">
                <span>SMS Notifications</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={userData.notifications.sms}
                    onChange={() => handleNotificationToggle("sms")}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        );
      case "cart":
        return (
          <div className="dashboard-section">
            <h2>My Cart</h2>
            <div className="empty-state">
              <img src="/empty-cart.svg" alt="Empty cart" />
              <p>No items in your cart yet</p>
              <button className="primary-btn" onClick={() => navigate("/movies")}>
                Browse Movies
              </button>
            </div>
          </div>
        );
      case "bookings":
        return (
          <div className="dashboard-section">
            <h2>My Bookings</h2>
            <div className="empty-state">
              <img src="/no-bookings.svg" alt="No bookings" />
              <p>You haven't made any bookings yet</p>
              <button className="primary-btn" onClick={() => navigate("/movies")}>
                Book Now
              </button>
            </div>
          </div>
        );
      case "payment":
        return (
          <div className="dashboard-section">
            <h2>Payment Methods</h2>
            <div className="empty-state">
              <img src="/no-payments.svg" alt="No payments" />
              <p>No payment methods added</p>
              <button className="primary-btn">
                Add Payment Method
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="user-avatar">
            <img
              src={
                userData.gender === "Female" 
                  ? "https://st4.depositphotos.com/21557188/23281/v/450/depositphotos_232811456-stock-illustration-female-symbol-simple-icon-woman.jpg"
                  : "https://st4.depositphotos.com/21557188/25142/v/450/depositphotos_251421756-stock-illustration-male-symbol-simple-icon-man.jpg"
              }
              alt="Profile"
              className="profile-icon"
            />
          </div>
          <div className="user-info">
            <h3>{userData.username}</h3>
            <span className={`membership-badge ${userData.membership.includes("Premium") ? "premium" : ""}`}>
              {userData.membership}
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={selectedSection === "profile" ? "active" : ""}
            onClick={() => setSelectedSection("profile")}
          >
            <i className="icon-user"></i> Profile
          </button>
          <button 
            className={selectedSection === "cart" ? "active" : ""}
            onClick={() => setSelectedSection("cart")}
          >
            <i className="icon-cart"></i> My Cart
          </button>
          <button 
            className={selectedSection === "bookings" ? "active" : ""}
            onClick={() => setSelectedSection("bookings")}
          >
            <i className="icon-calendar"></i> Bookings
          </button>
          <button 
            className={selectedSection === "payment" ? "active" : ""}
            onClick={() => setSelectedSection("payment")}
          >
            <i className="icon-credit-card"></i> Payment
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="icon-log-out"></i> Logout
          </button>
        </nav>
      </aside>

      <main className="dashboard-content">
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;