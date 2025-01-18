import React, { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Job Tracker</div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <a href="/applications">Applications</a>
        <a href="/resumes">Resumes</a>
        <a href="/about">About</a>
      </div>
    </nav>
  );
};

export default NavBar;
