import React from "react";
import { BsLinkedin, BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
  const footerContainerStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    backgroundColor: "#d0d8ff",
    borderRadius: "0.5rem",
    padding: "2.5rem",
  };

  const ulStyle = {
    display: "flex",
    listStyleType: "none",
    gap: "2rem",
  };

  const liStyle = {
    transition: "0.3s ease-in-out",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black",
    transition: "0.3s ease-in-out",
  };

  const linkHoverStyle = {
    color: "#302ce9",
  };

  const svgStyle = {
    fontSize: "1.3rem",
    transition: "0.3s ease-in-out",
  };

  return (
    <footer style={footerContainerStyle}>
      <span>Copyright &copy; 2021 Teerth-Seerthi. All rights reserved</span>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <a href="#hero" style={linkStyle} onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)} onMouseOut={(e) => (e.target.style.color = linkStyle.color)}>
            Home
          </a>
        </li>
        <li style={liStyle}>
          <a href="#services" style={linkStyle} onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)} onMouseOut={(e) => (e.target.style.color = linkStyle.color)}>
            About
          </a>
        </li>
        <li style={liStyle}>
          <a href="#recommend" style={linkStyle} onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)} onMouseOut={(e) => (e.target.style.color = linkStyle.color)}>
            Places
          </a>
        </li>
        <li style={liStyle}>
          <a href="#testimonials" style={linkStyle} onMouseOver={(e) => (e.target.style.color = linkHoverStyle.color)} onMouseOut={(e) => (e.target.style.color = linkStyle.color)}>
            Testimonials
          </a>
        </li>
      </ul>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <BsFacebook style={svgStyle} />
        </li>
        <li style={liStyle}>
          <AiFillInstagram style={svgStyle} />
        </li>
        <li style={liStyle}>
          <BsLinkedin style={svgStyle} />
        </li>
      </ul>
    </footer>
  );
}
