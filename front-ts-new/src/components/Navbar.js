import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import logo from "../assets/teerth_saarthi_logo.png";
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const navigate = useNavigate();
  const [navbarState, setNavbarState] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token')); // Update when token changes
    };

    window.addEventListener("storage", handleStorageChange); // Listen for storage changes
    return () => window.removeEventListener("storage", handleStorageChange); // Cleanup
  }, []);
  

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove user data
    setIsLoggedIn(false);  // Update state
    navigate("/");  // Redirect to home
  };
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1rem", 
    height: "75px", 
  };

  const brandStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    fontSize: "1.2rem",
    fontWeight: "900",
    textTransform: "uppercase",
    cursor: "pointer",
  };

  const ulStyle = {
    display: "flex",
    gap: "3.5rem",
    listStyleType: "none",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#0077b6",
    fontSize: "1.2rem",
    transition: "0.1s ease-in-out",
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: "#023e8a",
    fontWeight: "900",
  };

  const buttonStyle = {
    margin: "0.5rem 0.5rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    borderRadius: "1rem",
    border: "none",
    color: "white",
    backgroundColor: "#48cae4",
    fontSize: "1.1rem",
    letterSpacing: "0.1rem",
    textTransform: "uppercase",
    transition: "0.3s ease-in-out",
  };

  const responsiveNavStyle = {
    display: "flex",
    position: "absolute",
    zIndex: "1",
    top: navbarState ? "50px" : "-400px",
    backgroundColor: "white",
    height: "40vh",
    width: "100%",
    alignItems: "center",
    transition: "0.3s ease-in-out",
  };

  const responsiveUlStyle = {
    listStyleType: "none",
    width: "100%",
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={brandStyle}>
        <img src={logo} alt="Logo" style={{ width: '105px', height: 'auto' }} />
          TEERTH-SAARTHI
          <div>
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavbarState(true)} />
            )}
          </div>
        </div>
        <ul style={ulStyle}>
          <li>
            <a href="#home" style={activeLinkStyle}>
              Home
            </a>
          </li>
          <li>
            <a href="#services" style={activeLinkStyle}>
              About
            </a>
          </li>
          <li>
            <a href="#recommend" style={activeLinkStyle}>
              Religions
            </a>
          </li>
          <li>
            <a href="#testimonials" style={activeLinkStyle}>
              Testimonials
            </a>
          </li>
        </ul>
        {!isLoggedIn && (
        <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
  style={buttonStyle}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = "#023e8a";
    e.target.style.transform = "scale(1.1) translateY(-5px)";
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = "#48cae4";
    e.target.style.transform = "scale(1) translateY(0)";
  }}
  onClick={() => navigate('/login')}>
  Sign in
</button>
<button
  style={buttonStyle}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = "#023e8a";
    e.target.style.transform = "scale(1.1) translateY(-5px)";
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = "#48cae4";
    e.target.style.transform = "scale(1) translateY(0)";
  }}
  onClick={() => navigate('/signup')}>
  Sign up
</button>
        </div>
         )}
          {isLoggedIn && (
          <button
            style={{ backgroundColor: "#d9534f", padding: "0.5rem 1rem", borderRadius: "1rem", border: "none", color: "white", fontSize: "1.1rem", cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </nav>
      <div style={responsiveNavStyle}>
        <ul style={responsiveUlStyle}>
          <li>
            <a
              href="#home"
              style={activeLinkStyle}
              onClick={() => setNavbarState(false)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              style={linkStyle}
              onClick={() => setNavbarState(false)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#recommend"
              style={linkStyle}
              onClick={() => setNavbarState(false)}
            >
              Place
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              style={linkStyle}
              onClick={() => setNavbarState(false)}
            >
              Testimonials
            </a>
          </li>
          <li>
            <a style={linkStyle} onClick={() => setNavbarState(false)}>
              Profile
            </a>
          </li>
          <li>
            <a style={linkStyle} onClick={() => setNavbarState(false)}>
              History
            </a>
          </li>
          <li>
            <a style={linkStyle} onClick={() => setNavbarState(false)}>
              Wishlist
            </a>
          </li>
          <li>
            <a style={linkStyle} onClick={() => setNavbarState(false)}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
