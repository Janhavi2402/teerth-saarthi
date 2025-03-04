import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchTempleById } from "../api";
import {
  FaMapMarkerAlt,
  FaHotel,
  FaLandmark,
  FaClock,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import "../styles/PlacePage.css"; // Ensure the CSS file is linked
import templeImage from "../assets/image.jpg";
import goldenImage from "../assets/golden.jpg";

export default function PlacePage() {
  const { id } = useParams();
  const navigate = useNavigate(); // 🚀 React Router Hook

  const handleNavigate = () => {
    navigate(`/transport/${id}`); // Navigate with templeId
  };
  const handleNavigateToStay = () => {
    navigate(`/stay/${id}`);
  };
  const handleNavigateToAttractions = () => {
    navigate(`/nearby-attractions/${id}`);
  };
  
  
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTempleById(id)
      .then((data) => {
        setTemple(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="place-container">
      {/* Full-page Image with Overlay */}
      <div className="place-image">
        <img src={templeImage} alt="Temple View" />
        <div className="image-overlay">
          <nav className="place-navbar">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#stay">Stay</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <div className="place-title">
            <h1>{temple?.name || "Temple Name"}</h1>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="place-section about-section" id="about">
        <div className="about-content">
          <div className="about-text">
            <h2>About {temple?.name || "the Temple"}</h2>
            <p>{temple?.description || "No description available."}</p>
          </div>
          <img src={goldenImage} alt="Temple" className="about-image" />
        </div>
      </div>

      {/* Travel Guide Section */}
      <div className="travel-guide">
        <div className="travel-overlay">
          <h2 className="travel-title">Plan Your Pilgrimage</h2>
          <div className="card-container">
          <div className="card" onClick={handleNavigate} style={{ cursor: "pointer" }}>
            <FaMapMarkerAlt className="icon" />
            <h3>How to Reach</h3>
            <p>Find the best routes to reach {temple?.name} via air, rail, and road.</p>
          </div>
          <div className="card" onClick={handleNavigateToStay} style={{ cursor: "pointer" }}>
  <FaHotel className="icon" />
  <h3>Where to Stay</h3>
  <p>Explore nearby accommodations for a comfortable stay.</p>
     </div>

     <div className="card" onClick={handleNavigateToAttractions} style={{ cursor: "pointer" }}>
  <FaLandmark className="icon" />
  <h3>Nearby Attractions</h3>
  <p>Discover other significant places around {temple?.name}.</p>
</div>
          </div>
        </div>
      </div>

{/* Timing Section */}
<div className="place-section timing-section" id="timings">
  <h2>Temple Timings</h2>
  {temple?.timings && Object.keys(temple.timings).length > 0 ? (
    <div className="timing-cards">
      {Object.entries(temple.timings).map(([day, hours]) =>
        typeof hours === "string" ? (
          <div className="timing-card" key={day}>
            <FaClock className="icon" />
            <strong>{day}</strong>
            <p>{hours}</p>
          </div>
        ) : (
          // If timings are an object (like Aarti Timings), show only inner content
          Object.entries(hours).map(([event, timing]) => (
            <div className="timing-card" key={event}>
              <FaClock className="icon" />
              <strong>{event}</strong>
              <p>{timing}</p>
            </div>
          ))
        )
      )}
    </div>
  ) : (
    <p>No timings available.</p>
  )}
</div>



{/* Contact Section */}
<div className="place-section contact-section" id="contact">
  <h2>Get in Touch</h2>
  {temple?.contact ? (
    <>
      <p>
        <FaEnvelope className="icon" /> Email:{" "}
        <a href={`mailto:${temple.contact.email}`}>
          {temple.contact.email}
        </a>
      </p>
      <p>
        <FaPhone className="icon" /> Phone:{" "}
        {temple.contact.phone_numbers?.join(", ")}
      </p>
      <p>
        🌐 Official Website:{" "}
        <a href={temple.contact.official_website} target="_blank" rel="noopener noreferrer">
          {temple.contact.official_website}
        </a>
      </p>
    </>
  ) : (
    <p>No contact details available.</p>
  )}
</div>



</div>
  );
}
