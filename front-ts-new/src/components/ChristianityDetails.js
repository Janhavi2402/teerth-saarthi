import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get the temple ID
import './Christianity.css'; // Add the CSS file for styling
import { FaMapMarkerAlt, FaHotel, FaLandmark, FaClock } from 'react-icons/fa'; // Import FaClock here
import WeatherBox from './WeatherBox';
import MapComponent from './MapComponent';

export default function ChristianityDetails() {
  const { id } = useParams(); // Get temple ID from URL
  const [temple, setTemple] = useState(null);
  const [visitingInfo, setVisitingInfo] = useState(null); // State for visiting_info
  const [images, setImages] = useState([]); // State to hold images for the temple
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state
  const navigate = useNavigate(); // Navigate hook for going back

  // Fetch temple details and images based on ID
  useEffect(() => {
    async function fetchChristianityDetails() {
      try {
        setLoading(true);
        const templeResponse = await fetch(`http://localhost:5000/api/Christianity/${id}`);
        const templeData = await templeResponse.json();

        if (templeData) {
          setTemple(templeData); // Set temple data
          setVisitingInfo(templeData.visiting_info); // Set visiting_info
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

    fetchChristianityDetails();
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
    <div className="temple-details-c">
      <h1>{temple?.name}</h1>
      {/* <p className="temple-address-c">
        <FaMapMarkerAlt /> {temple?.address}, {temple?.state}, {temple?.country}
      </p> */}

<p className="temple-address-c">
  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${temple?.name}, ${temple?.address}, ${temple?.state}, ${temple?.country}`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{ cursor: "pointer" }}
  >
    <FaMapMarkerAlt style={{ color: "#1a0dab", marginRight: "5px" }} />
  </a>
  {temple?.address}
</p>


      <br></br>
      <p className="temple-description-c">{temple?.description}</p>
      <br></br>
      <p className="patron-saint-c">Patron Saint: {temple?.patron_saint}</p>
      <p className="established-year-c">Established in: {temple?.established_year}</p>
      <p className="architecture-style-c">Architecture Style: {temple?.architecture_style}</p>
      
      
      <br></br><br></br>
      <h2>Church Timings</h2>
      <br></br>
      {temple?.timings && Object.keys(temple.timings).length > 0 ? (
        <div className="timing-cards-c">
          {Object.entries(temple.timings).map(([day, hours], index) =>
            typeof hours === 'string' ? (
              <div className="timing-card-c" key={index}>
                <FaClock className="icon-c" />
                <strong>{day}</strong>
                <p>{hours}</p>
                {images.length > 3 && (
                  <img src={getImageSrc(3)} alt={`Timing Image ${index}`} className="section-image-c" />
                )}
              </div>
            ) : (
              Object.entries(hours).map(([event, timing], eventIndex) => (
                <div className="timing-card-c" key={eventIndex}>
                  <FaClock className="icon-c" />
                  <strong>{event}</strong>
                  <p>{timing}</p>
                  {images.length > 4 && (
                    <img src={getImageSrc(4)} alt={`Event Image ${eventIndex}`} className="section-image-c" />
                  )}
                </div>
              ))
            )
          )}
        </div>
      ) : (
        <p>No timings available.</p>
      )}


      <br></br><br></br>
      {/* Plan Your Pilgrimage Section */}  
      <div className="travel-overlay-c">
        <h2 className="travel-title-c"><bold>Plan Your Pilgrimage</bold></h2>
        <br></br>
        <div className="card-container-c">
          <div className="card-c" onClick={() => navigate(`/transport/${id}`)} style={{ cursor: 'pointer' }}>
            <FaMapMarkerAlt className="icon-c" />
            <h3><strong>How to Reach</strong></h3>
            <p>Find the best routes to reach {temple?.name} via air, rail, and road.</p>
            {images.length > 0 && (
              <img src={getImageSrc(0)} alt="How to Reach" className="section-image-c" />
            )}
          </div>
          <div className="card-c" onClick={() => navigate(`/stay/${id}`)} style={{ cursor: 'pointer' }}>
            <FaHotel className="icon-c" />
            <h3><strong>Where to Stay</strong></h3>
            <p>Explore nearby accommodations for a comfortable stay.</p>
            {images.length > 1 && (
              <img src={getImageSrc(1)} alt="Where to Stay" className="section-image-c" />
            )}
          </div>
          <div className="card-c" onClick={() => navigate(`/nearby-attractions-christian/${id}`)} style={{ cursor: 'pointer' }}>
            <FaLandmark className="icon-c" />
            <h3><strong>Nearby Attractions</strong></h3>
            <p>Discover other significant temples around {temple?.name}.</p>
            {images.length > 2 && (
              <img src={getImageSrc(2)} alt="Nearby Attractions" className="section-image-c" />
            )}
          </div>
        </div>
      </div>


        <br></br>
        <br></br>
      {/* Interesting Facts Section */}
      <div className="interesting-facts-c">
        <h2>Interesting Facts</h2>
        <ul>
          {temple?.interesting_facts?.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>

          <br></br>
          <br></br>
      {/* Spiritual Ceremonies Section */}
      <div className="spiritual-ceremonies-c">
        <h2>Spiritual Ceremonies</h2>
        {temple?.spiritual_ceremonies?.length > 0 ? (
          <ul>
            {temple?.spiritual_ceremonies.map((ceremony, index) => (
              <li key={index}>
                {ceremony}
              </li>
            ))}
          </ul>
          
        ) : (
          <p>No spiritual ceremonies listed.</p>
        )}
      </div>

      

        <br></br>
        <br></br>
      {/* Contact Information Section */}
    
       {/* Contact Information Section */}
       <div className="contact-info-c section-block">
  <h2>Contact Information</h2>
  <ul><strong>Phone:</strong> {temple?.contact?.phone_numbers?.join(', ')}</ul>
  <ul><strong>Email:</strong> <a href={`mailto:${temple?.contact?.email}`}>{temple?.contact?.email}</a></ul>
  <ul><strong>Official Website:</strong> <a href={temple?.contact?.official_website} target="_blank" rel="noopener noreferrer">{temple?.contact?.official_website}</a></ul>
</div>

<br></br>
<br></br>
{/* here */}
<div className="map-weather-container">

<div className="weather-container">
    <WeatherBox
      latitude={temple?.visiting_info?.location?.latitude}
      longitude={temple?.visiting_info?.location?.longitude}
    />
  </div>
  {temple?.visiting_info?.location?.latitude && temple?.visiting_info?.location?.longitude && (
    <div className="map-container">
      <MapComponent
        latitude={temple.visiting_info.location.latitude}
        longitude={temple.visiting_info.location.longitude}
      />
    </div>
  )}
</div>
{/* here */}
<br></br><br></br>
<h2> Gallery </h2>
<div className="temple-images-c">
  <br></br>
  <div className="image-gallery-c">
    {images.map((image, index) => (
      <img key={index} src={getImageSrc(index)} alt={`temple Image ${index + 1}`} className="section-image-c" />
    ))}
  </div>
</div>

    </div>
  );
}
