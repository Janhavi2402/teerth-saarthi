import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get the temple ID
import './Sikhism.css'; // Add the CSS file for styling
import { FaMapMarkerAlt, FaHotel, FaLandmark, FaClock } from 'react-icons/fa'; // Import the icons

export default function SikhismDetails() {
  const { id } = useParams(); // Get temple ID from URL
  const [temple, setTemple] = useState(null); // State to hold temple data
  const [images, setImages] = useState([]); // State to hold images for the temple
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state
  const navigate = useNavigate(); // Navigate hook for going back

  // Fetch temple details and images based on ID
  useEffect(() => {
    async function fetchSikhismDetails() {
      try {
        setLoading(true);
        const templeResponse = await fetch(`http://localhost:5000/api/sikhism/${id}`);
        const templeData = await templeResponse.json();

        if (templeData) {
          setTemple(templeData); // Set temple data
        } else {
          setError('Temple not found');
        }

        // Fetch images
        const imageResponse = await fetch(`http://localhost:5000/api/images/${id}`);
        const imageData = await imageResponse.json();

        if (imageData.images) {
          setImages(Array.isArray(imageData.images) ? imageData.images : []);
        }

        setLoading(false);
      } catch (error) {
        setError('Error fetching temple details or images');
        setLoading(false);
      }
    }

    fetchSikhismDetails();
  }, [id]); // Re-run effect when `id` changes

  const getImageSrc = (index) => {
    if (images.length > index && images[index]) {
      const imgSrc = images[index];

      // If it's already a URL or a valid Base64 data URL, return it as is
      if (imgSrc.startsWith('http') || imgSrc.startsWith('data:image')) {
        return imgSrc;
      }

      // Otherwise, assume it's raw Base64 and prepend the required prefix
      return `data:image/jpeg;base64,${imgSrc}`;
    }

    return ''; // Fallback if missing
  };

  // Loading state
  if (loading) return <p>Loading...</p>;

  // Error state
  if (error) return <div className="error-message-s">{error}</div>; // Render error in a div for styling

  return (
    <div className="temple-details-s">
      <h1>{temple?.name}</h1>
      <p className="temple-address-s">
        <FaMapMarkerAlt /> {temple?.address}, {temple?.state}, {temple?.religion}
      </p>
      <p className="temple-description-s">{temple?.description}</p>
      <p className="art-architecture-s">Art and Architecture: {temple?.art_architecture}</p>

      {/* Visiting Info Section */}
      <div className="visiting-info-s">
        <h2>Visiting Information</h2>
        {temple?.visiting_info ? (
          <div>
            <p><strong>Location:</strong> {`Latitude: ${temple.visiting_info.location.latitude}, Longitude: ${temple.visiting_info.location.longitude}`}</p>
            <p><strong>Visiting Hours:</strong> {temple.visiting_info.visiting_hours}</p>
            <img src={getImageSrc(0)} alt="Visiting Info" className="section-image-s" />
          </div>
        ) : (
          <p>No visiting information available.</p>
        )}
      </div>

      {/* Plan Your Pilgrimage Section */}
      <div className="travel-overlay-s">
        <h2 className="travel-title-s">Plan Your Pilgrimage</h2>
        <div className="card-container-s">
          <div className="card-s" onClick={() => navigate(`/transport/${id}`)} style={{ cursor: 'pointer' }}>
            <FaMapMarkerAlt className="icon-s" />
            <h3>How to Reach</h3>
            <p>Find the best routes to reach {temple?.name} via air, rail, and road.</p>
            <img src={getImageSrc(1)} alt="How to Reach" className="section-image-s" />
          </div>
          <div className="card-s" onClick={() => navigate(`/stay/${id}`)} style={{ cursor: 'pointer' }}>
            <FaHotel className="icon-s" />
            <h3>Where to Stay</h3>
            <p>Explore nearby accommodations for a comfortable stay.</p>
            <img src={getImageSrc(2)} alt="Where to Stay" className="section-image-s" />
          </div>
          <div className="card-s" onClick={() => navigate(`/nearby-attractions-sikhism/${id}`)} style={{ cursor: 'pointer' }}>
            <FaLandmark className="icon-s" />
            <h3>Nearby Attractions</h3>
            <p>Discover other significant places around {temple?.name}.</p>
            <img src={getImageSrc(3)} alt="Nearby Attractions" className="section-image-s" />
          </div>
        </div>
      </div>

      <h2>Temple Timings</h2>
      {temple?.timings && Object.keys(temple.timings).length > 0 ? (
        <div className="timing-cards-s">
          {Object.entries(temple.timings).map(([day, hours]) =>
            typeof hours === 'string' ? (
              <div className="timing-card-s" key={day}>
                <FaClock className="icon-s" />
                <strong>{day}</strong>
                <p>{hours}</p>
                <img src={getImageSrc(4)} alt="Timings" className="section-image-s" />
              </div>
            ) : (
              Object.entries(hours).map(([event, timing]) => (
                <div className="timing-card-s" key={event}>
                  <FaClock className="icon-s" />
                  <strong>{event}</strong>
                  <p>{timing}</p>
                  <img src={getImageSrc(5)} alt="Event Timings" className="section-image-s" />
                </div>
              ))
            )
          )}
        </div>
      ) : (
        <p>No timings available.</p>
      )}

      {/* Interesting Facts Section */}
      <div className="interesting-facts-s">
        <h2>Interesting Facts</h2>
        <ul>
          {temple?.interesting_facts?.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
        <img src={getImageSrc(6)} alt="Interesting Facts" className="section-image-s" />
      </div>

      {/* Contact Information Section */}
      <div className="contact-info-s">
        <h2>Contact Information</h2>
        <p>Phone: {temple?.contact?.phone_numbers?.join(', ')}</p>
        <p>Email: <a href={`mailto:${temple?.contact?.email}`}>{temple?.contact?.email}</a></p>
        <p>Official Website: <a href={temple?.contact?.official_website} target="_blank" rel="noopener noreferrer">{temple?.contact?.official_website}</a></p>
        <img src={getImageSrc(7)} alt="Contact Info" className="section-image-s" />
      </div>

      {/* Image Section */}
      <div className="temple-images-s">
        <h2>Images</h2>
        <div className="image-gallery-s">
          {images.map((image, index) => (
            <img key={index} src={getImageSrc(index)} alt={`Temple Image ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
