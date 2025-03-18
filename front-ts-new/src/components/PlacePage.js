import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function PlacePage() {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchTempleById(id)
      .then((data) => {
        setTemple(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch temple data.");
        setLoading(false);
      });

    fetch(`http://localhost:5000/api/images/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Image API Response:", data);
        if (data.images) {
          setImages(Array.isArray(data.images) ? data.images : []);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch images:", err);
      });
  }, [id]);

  const getImageSrc = (index) => {
    if (images.length > index && images[index]) {
      const imgSrc = images[index];
  
      console.log(`Loading image ${index}:`, imgSrc); // ✅ Debugging log
  
      // If it's already a URL or a valid Base64 data URL, return it as is
      if (imgSrc.startsWith("http") || imgSrc.startsWith("data:image")) {
        return imgSrc;
      }
  
      // Otherwise, assume it's raw Base64 and prepend the required prefix
      return `data:image/jpeg;base64,${imgSrc}`;
    }
  
    console.warn(`Image at index ${index} is missing!`);
    return ""; // Fallback if missing
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  console.log("Images array:", images); // ✅ Check the whole images array
console.log("First image (index 0):", images[0]); // ✅ Check first image


  return (
    <div className="place-container">
      {/* Full-page Image with Overlay */}
      <div className="place-image">
        {images.length > 0 ? (
          <img src={getImageSrc(0)} alt="Temple View" />
        ) : (
          <p>No Image Available</p>
        )}

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
          <img src={getImageSrc(1)} alt="Temple About" className="about-image" />
        </div>
      </div>

      {/* Travel Guide Section */}
      <div
        className="travel-guide"
        style={{
          backgroundImage: `url(${getImageSrc(2)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "700px",
        }}
      >
        <div className="travel-overlay">
          <h2 className="travel-title">Plan Your Pilgrimage</h2>
          <div className="card-container">
            <div className="card" onClick={() => navigate(`/transport/${id}`)} style={{ cursor: "pointer" }}>
              <FaMapMarkerAlt className="icon" />
              <h3>How to Reach</h3>
              <p>Find the best routes to reach {temple?.name} via air, rail, and road.</p>
            </div>
            <div className="card" onClick={() => navigate(`/stay/${id}`)} style={{ cursor: "pointer" }}>
              <FaHotel className="icon" />
              <h3>Where to Stay</h3>
              <p>Explore nearby accommodations for a comfortable stay.</p>
            </div>
            <div className="card" onClick={() => navigate(`/nearby-attractions/${id}`)} style={{ cursor: "pointer" }}>
              <FaLandmark className="icon" />
              <h3>Nearby Attractions</h3>
              <p>Discover other significant places around {temple?.name}.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timing Section */}
      <div
        className="place-section timing-section"
        id="timings"
        style={{
          backgroundImage: `url(${getImageSrc(3)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
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
      <div
        className="place-section contact-section"
        id="contact"
        style={{
          backgroundImage: `url(${getImageSrc(4)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2>Get in Touch</h2>
        {temple?.contact ? (
          <>
            <p>
              <FaEnvelope className="icon" /> Email:{" "}
              <a href={`mailto:${temple.contact.email}`}>{temple.contact.email}</a>
            </p>
            <p>
              <FaPhone className="icon" /> Phone: {temple.contact.phone_numbers?.join(", ")}
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
