import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get the place ID
import './Jainism.css'; // Add the CSS file for styling
import { FaMapMarkerAlt, FaHotel, FaLandmark, FaClock } from 'react-icons/fa'; // Import the icons

export default function JainismDetails() {
  const { id } = useParams(); // Get place ID from URL
  const [place, setPlace] = useState(null); // Renamed 'temple' to 'place' for Jainism context
  const [images, setImages] = useState([]); // State to hold images for the place
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state
  const navigate = useNavigate(); // Navigate hook for going back

  // Fetch place details and images based on ID
  useEffect(() => {
    async function fetchPlaceDetails() {
      try {
        setLoading(true);
        const placeResponse = await fetch(`http://localhost:5000/api/jainism/${id}`);
        const placeData = await placeResponse.json();

        if (placeData) {
          setPlace(placeData); // Set place data
        } else {
          setError('Place not found');
        }

        // Fetch images
        const imageResponse = await fetch(`http://localhost:5000/api/images/${id}`);
        const imageData = await imageResponse.json();

        if (imageData.images) {
          setImages(Array.isArray(imageData.images) ? imageData.images : []);
        }

        setLoading(false);
      } catch (error) {
        setError('Error fetching place details or images');
        setLoading(false);
      }
    }

    fetchPlaceDetails();
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="place-details">
      <h1>{place?.name}</h1>
      <p className="place-address">
        <FaMapMarkerAlt /> {place?.address}, {place?.state}, {place?.religion}
      </p>
      <p className="place-description">{place?.description}</p>
      <p className="tirthankar">Tirthankar: {place?.tirthankar}</p>
      <p className="nirvana-place">Nirvana Place: {place?.nirvana_place ? "Yes" : "No"}</p>
      <p className="pratishtha-year">Pratishtha Year: {place?.pratishtha_year}</p>
      <p className="architecture-style">Architecture Style: {place?.architecture_style}</p>

      {/* Plan Your Pilgrimage Section */}
      <div className="travel-overlay">
        <h2 className="travel-title">Plan Your Pilgrimage</h2>
        <div className="card-container">
          <div className="card" onClick={() => navigate(`/transport/${id}`)} style={{ cursor: 'pointer' }}>
            <FaMapMarkerAlt className="icon" />
            <h3>How to Reach</h3>
            <p>Find the best routes to reach {place?.name} via air, rail, and road.</p>
          </div>
          <div className="card" onClick={() => navigate(`/stay/${id}`)} style={{ cursor: 'pointer' }}>
            <FaHotel className="icon" />
            <h3>Where to Stay</h3>
            <p>Explore nearby accommodations for a comfortable stay.</p>
          </div>
          <div className="card" onClick={() => navigate(`/nearby-attractions-jainism/${id}`)} style={{ cursor: 'pointer' }}>
            <FaLandmark className="icon" />
            <h3>Nearby Attractions</h3>
            <p>Discover other significant places around {place?.name}.</p>
          </div>
        </div>
      </div>

      {/* Timings Section */}
      <h2>Temple Timings</h2>
      {place?.timings && Object.keys(place.timings).length > 0 ? (
        <div className="timing-cards">
          {Object.entries(place.timings).map(([day, hours]) =>
            typeof hours === 'string' ? (
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

      {/* Visiting Info Section */}
      <div className="visiting-info">
        <h2>Visiting Information</h2>
        {place?.visiting_info ? (
          <div>
            <p><strong>Location:</strong> Latitude: {place.visiting_info.location.latitude}, Longitude: {place.visiting_info.location.longitude}</p>
            <p><strong>Visiting Hours:</strong> {place.visiting_info.visiting_hours}</p>
            <p><strong>Parikrama Distance:</strong> {place.visiting_info.parikrama_distance_km} km</p>
          </div>
        ) : (
          <p>No visiting information available.</p>
        )}
      </div>

      {/* Interesting Facts Section */}
      <div className="interesting-facts">
        <h2>Interesting Facts</h2>
        <ul>
          {place?.interesting_facts?.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>

      {/* Special Festival Section */}
      <div className="special-festival">
        <h2>Special Festivals</h2>
        <ul>
          {place?.special_festival?.map((festival, index) => (
            <li key={index}>{festival}</li>
          ))}
        </ul>
      </div>

      {/* Dhyan Kendra Section */}
      {place?.dhyan_kendra_available && (
        <div className="dhyan-kendra">
          <h2>Dhyan Kendra</h2>
          <p>Name: {place?.dhyan_kendra_details?.name}</p>
          <p>Timings: {place?.dhyan_kendra_details?.timings}</p>
          <p>Facilities: {place?.dhyan_kendra_details?.facilities.join(', ')}</p>
        </div>
      )}

      {/* Contact Information Section */}
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>Phone: {place?.contact?.phone_numbers?.join(', ')}</p>
        <p>Email: <a href={`mailto:${place?.contact?.email}`}>{place?.contact?.email}</a></p>
        <p>Official Website: <a href={place?.contact?.official_website} target="_blank" rel="noopener noreferrer">{place?.contact?.official_website}</a></p>
      </div>

      {/* Image Section */}
      <div className="place-images">
        <h2>Images</h2>
        <div className="image-gallery">
          {images.map((image, index) => (
            <img key={index} src={getImageSrc(index)} alt={`Place Image ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
