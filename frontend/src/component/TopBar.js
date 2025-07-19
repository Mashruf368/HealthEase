import React from "react";
import { Link } from "react-router-dom";
import "../styles/TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="brand">HealthEase</div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default TopBar;
