// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // useParams to get the place ID
// import './Islam.css'; // Add the CSS file for styling
// import { FaMapMarkerAlt, FaHotel, FaLandmark, FaClock } from 'react-icons/fa'; // Import the icons

// export default function IslamDetails() {
//   const { id } = useParams(); // Get place ID from URL
//   const [place, setPlace] = useState(null); // Renamed 'temple' to 'place' for Islam context
//   const [images, setImages] = useState([]); // State to hold images for the place
//   const [loading, setLoading] = useState(true); // For loading state
//   const [error, setError] = useState(null); // For error state
//   const navigate = useNavigate(); // Navigate hook for going back

//   // Fetch place details and images based on ID
//   useEffect(() => {
//     async function fetchPlaceDetails() {
//       try {
//         setLoading(true);
//         const placeResponse = await fetch(`http://localhost:5000/api/islam/${id}`);
//         const placeData = await placeResponse.json();

//         if (placeData) {
//           setPlace(placeData); // Set place data
//         } else {
//           setError('Place not found');
//         }

//         // Fetch images
//         const imageResponse = await fetch(`http://localhost:5000/api/images/${id}`);
//         const imageData = await imageResponse.json();

//         if (imageData.images) {
//           setImages(Array.isArray(imageData.images) ? imageData.images : []);
//         }

//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching place details or images');
//         setLoading(false);
//       }
//     }

//     fetchPlaceDetails();
//   }, [id]); // Re-run effect when `id` changes

//   const getImageSrc = (index) => {
//     if (images.length > index && images[index]) {
//       const imgSrc = images[index];

//       // If it's already a URL or a valid Base64 data URL, return it as is
//       if (imgSrc.startsWith('http') || imgSrc.startsWith('data:image')) {
//         return imgSrc;
//       }

//       // Otherwise, assume it's raw Base64 and prepend the required prefix
//       return `data:image/jpeg;base64,${imgSrc}`;
//     }

//     return ''; // Fallback if missing
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="place-details-i">
//       <h1>{place?.name}</h1>
//       <p className="place-address-i">
//         <FaMapMarkerAlt /> {place?.address}, {place?.state}, {place?.country}
//       </p>
//       <p className="place-description-i">{place?.description}</p>
//       <p className="sufi-saint-i">Sufi Saint: {place?.sufi_saint}</p>
//       <p className="established-year-i">Established in: {place?.established_year}</p>
//       <p className="architecture-style-i">Architecture Style: {place?.architecture_style}</p>
      
//       {/* Plan Your Pilgrimage Section */}
//       <div className="travel-overlay-i">
//         <h2 className="travel-title-i">Plan Your Pilgrimage</h2>
//         <div className="card-container-i">
//           <div className="card-i" onClick={() => navigate(`/transport/${id}`)} style={{ cursor: 'pointer' }}>
//             <FaMapMarkerAlt className="icon-i" />
//             <h3>How to Reach</h3>
//             <p>Find the best routes to reach {place?.name} via air, rail, and road.</p>
//             <img src={getImageSrc(0)} alt="How to Reach" className="section-image-i" />
//           </div>
//           <div className="card-i" onClick={() => navigate(`/stay/${id}`)} style={{ cursor: 'pointer' }}>
//             <FaHotel className="icon-i" />
//             <h3>Where to Stay</h3>
//             <p>Explore nearby accommodations for a comfortable stay.</p>
//             <img src={getImageSrc(1)} alt="Where to Stay" className="section-image-i" />
//           </div>
//           <div className="card-i" onClick={() => navigate(`/nearby-attractions-islam/${id}`)} style={{ cursor: 'pointer' }}>
//             <FaLandmark className="icon-i" />
//             <h3>Nearby Attractions</h3>
//             <p>Discover other significant places around {place?.name}.</p>
//             <img src={getImageSrc(2)} alt="Nearby Attractions" className="section-image-i" />
//           </div>
//         </div>
//       </div>

//       <h2>Timings</h2>
//       {place?.timings && Object.keys(place.timings).length > 0 ? (
//         <div className="timing-cards-i">
//           {Object.entries(place.timings).map(([day, hours]) =>
//             typeof hours === 'string' ? (
//               <div className="timing-card-i" key={day}>
//                 <FaClock className="icon-i" />
//                 <strong>{day}</strong>
//                 <p>{hours}</p>
//                 <img src={getImageSrc(3)} alt="Timings" className="section-image-i" />
//               </div>
//             ) : (
//               Object.entries(hours).map(([event, timing]) => (
//                 <div className="timing-card-i" key={event}>
//                   <FaClock className="icon-i" />
//                   <strong>{event}</strong>
//                   <p>{timing}</p>
//                   <img src={getImageSrc(4)} alt="Event Timings" className="section-image-i" />
//                 </div>
//               ))
//             )
//           )}
//         </div>
//       ) : (
//         <p>No timings available.</p>
//       )}

//       {/* Spiritual Ceremonies Section */}
//       <div className="spiritual-ceremonies-i">
//         <h2>Spiritual Ceremonies</h2>
//         <ul>
//           {place?.spiritual_ceremonies?.map((ceremony, index) => (
//             <li key={index}>{ceremony}</li>
//           ))}
//         </ul>
//         <img src={getImageSrc(5)} alt="Spiritual Ceremonies" className="section-image-i" />
//       </div>

//       {/* Interesting Facts Section */}
//       <div className="interesting-facts-i">
//         <h2>Interesting Facts</h2>
//         <ul>
//           {place?.interesting_facts?.map((fact, index) => (
//             <li key={index}>{fact}</li>
//           ))}
//         </ul>
//         <img src={getImageSrc(6)} alt="Interesting Facts" className="section-image-i" />
//       </div>

//       {/* Art & Architecture Section */}
//       <div className="art-architecture-i">
//         <h2>Art & Architecture</h2>
//         <p>{place?.art_architecture}</p>
//         <img src={getImageSrc(7)} alt="Art & Architecture" className="section-image-i" />
//       </div>

//       {/* Contact Information Section */}
//       <div className="contact-info-i">
//         <h2>Contact Information</h2>
//         <p>Phone: {place?.contact?.phone_numbers?.join(', ')}</p>
//         <p>Email: <a href={`mailto:${place?.contact?.email}`}>{place?.contact?.email}</a></p>
//         <p>Official Website: <a href={place?.contact?.official_website} target="_blank" rel="noopener noreferrer">{place?.contact?.official_website}</a></p>
//         <img src={getImageSrc(8)} alt="Contact Info" className="section-image-i" />
//       </div>


//       {/* Image Section */}
//       <div className="place-images-i">
//         <h2>Images</h2>
//         <div className="image-gallery-i">
//           {images.map((image, index) => (
//             <img key={index} src={getImageSrc(index)} alt={`Place Image ${index + 1}`} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Islam.css';
import { FaMapMarkerAlt, FaHotel, FaLandmark, FaClock } from 'react-icons/fa';
// here
import WeatherBox from './WeatherBox';
import MapComponent from './MapComponent';

export default function IslamDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlaceDetails() {
      try {
        setLoading(true);
        const placeResponse = await fetch(`http://localhost:5000/api/islam/${id}`);
        const placeData = await placeResponse.json();

        if (placeData) {
          setPlace(placeData);
        } else {
          setError('Place not found');
        }

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
  }, [id]);

  const getImageSrc = (index) => {
    if (images.length > index && images[index]) {
      const imgSrc = images[index];
      if (imgSrc.startsWith('http') || imgSrc.startsWith('data:image')) {
        return imgSrc;
      }
      return `data:image/jpeg;base64,${imgSrc}`;
    }
    return '';
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="place-details-h">
      <h1>{place?.name}</h1>
      {/* <p className="place-address-h">
        <FaMapMarkerAlt /> {place?.address}, {place?.state}
      </p> */}
      {/* google map */}

      <p className="place-address-h">
  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${place?.name}, ${place?.address}, ${place?.state}, ${place?.country}`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{ cursor: "pointer" }}
  >
    <FaMapMarkerAlt style={{ color: "#1a0dab", marginRight: "5px" }} />
  </a>
{place?.address}
</p>







      <br></br>
      <p className="place-description-h">{place?.description}</p>
      <br></br>
      <p className="art-architecture-h">Art and Architecture: {place?.art_architecture}</p>

      <br></br>
      <br></br>
      <h2>Timings</h2>
      <br></br>
      {place?.timings && Object.keys(place.timings).length > 0 ? (
        <div className="timing-cards-h">
          {Object.entries(place.timings).map(([day, hours]) =>
            typeof hours === 'string' ? (
              <div className="timing-card-h" key={day}>
                <FaClock className="icon-h" />
                <strong>{day}</strong>
                <p>{hours}</p>
                <img src={getImageSrc(3)} alt="Temple Timings" className="section-image-h" />
              </div>
            ) : (
              Object.entries(hours).map(([event, timing]) => (
                <div className="timing-card-h" key={event}>
                  <FaClock className="icon-h" />
                  <strong>{event}</strong>
                  <p>{timing}</p>
                  <img src={getImageSrc(4)} alt="Event Timings" className="section-image-h" />
                </div>
              ))
            )
          )}
        </div>
      ) : (
        <p>No timings available.</p>
      )}

      <br></br>
      <br></br>

      <div className="travel-overlay-h">
        <h2 className="travel-title-h"><bold>Plan Your Pilgrimage</bold></h2>
        <br></br>
        <div className="card-container-h">
          <div className="card-h" onClick={() => navigate(`/transport/${id}`)} style={{ cursor: 'pointer' }}>
            <FaMapMarkerAlt className="icon-h" />
            <h3><strong>How to Reach</strong></h3>
            <p>Find the best routes to reach {place?.name} via air, rail, and road.</p>
            <img src={getImageSrc(0)} alt="How to Reach" className="section-image-h" />
          </div>
          <div className="card-h" onClick={() => navigate(`/stay/${id}`)} style={{ cursor: 'pointer' }}>
            <FaHotel className="icon-h" />
            <h3><strong>Where to Stay</strong></h3>
            <p>Explore nearby accommodations for a comfortable stay.</p>
            <img src={getImageSrc(1)} alt="Where to Stay" className="section-image-h" />
          </div>
          <div className="card-h" onClick={() => navigate(`/nearby-attractions-islam/${id}`)} style={{ cursor: 'pointer' }}>
            <FaLandmark className="icon-h" />
            <h3><strong>Nearby Attractions</strong></h3>
            <p>Discover other significant places around {place?.name}.</p>
            <img src={getImageSrc(2)} alt="Nearby Attractions" className="section-image-h" />
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <div className="interesting-facts-h">
        <h2>Interesting Facts</h2>
        <ul>
          {place?.interesting_facts?.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>

      <br></br>
      <br></br>

      <div className="contact-info-h section-block">
        <h2>Contact Information</h2>
        <ul><strong>Phone:</strong> {place?.contact?.phone_numbers?.join(', ')}</ul>
        <ul><strong>Email:</strong> <a href={`mailto:${place?.contact?.email}`}>{place?.contact?.email}</a></ul>
        <ul><strong>Official Website:</strong> <a href={place?.contact?.official_website} target="_blank" rel="noopener noreferrer">{place?.contact?.official_website}</a></ul>
      </div>
      <br></br>
      <br></br>
{/* here */}
<div className="map-weather-container">

<div className="weather-container">
    <WeatherBox
      latitude={place?.visiting_info?.location?.latitude}
      longitude={place?.visiting_info?.location?.longitude}
    />
  </div>
  {place?.visiting_info?.location?.latitude && place?.visiting_info?.location?.longitude && (
    <div className="map-container">
      <MapComponent
        latitude={place.visiting_info.location.latitude}
        longitude={place.visiting_info.location.longitude}
      />
    </div>
  )}
</div>
{/* here */}
      <br></br><br></br>
      <h2>Gallery</h2>
      <div className="place-images-h">
        <h2></h2>
        <div className="image-gallery-h">
          {images.map((image, index) => (
            <img key={index} src={getImageSrc(index)} alt={`Place Image ${index + 1}`} className="section-image-h" />
          ))}
        </div>
      </div>
    </div>
  );
}
