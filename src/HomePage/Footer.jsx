import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="cs-footer">
      <h3>Browse by Category</h3>
      <div className="cs-category-buttons">
        <button>Action</button>
        <button>Comedy</button>
        <button>Drama</button>
        <button>Horror</button>
      </div>
    </footer>
  );
};

export default Footer;
