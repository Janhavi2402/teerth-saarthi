// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // useParams to get the place ID
// import './Jainism.css'; // Add the CSS file for styling
// import { FaMapMarkerAlt, FaHotel, FaLandmark, FaClock } from 'react-icons/fa'; // Import the icons

// export default function JainismDetails() {
//   const { id } = useParams(); // Get place ID from URL
//   const [place, setPlace] = useState(null); // Renamed 'temple' to 'place' for Jainism context
//   const [images, setImages] = useState([]); // State to hold images for the place
//   const [loading, setLoading] = useState(true); // For loading state
//   const [error, setError] = useState(null); // For error state
//   const navigate = useNavigate(); // Navigate hook for going back

//   // Fetch place details and images based on ID
//   useEffect(() => {
//     async function fetchPlaceDetails() {
//       try {
//         setLoading(true);
//         const placeResponse = await fetch(`http://localhost:5000/api/jainism/${id}`);
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
//     <div className="place-details-j">
//       <h1>{place?.name}</h1>
//       <p className="place-address-j">
//         <FaMapMarkerAlt /> {place?.address}, {place?.state}, {place?.religion}
//       </p>
//       <p className="place-description-j">{place?.description}</p>
//       <p className="tirthankar-j">Tirthankar: {place?.tirthankar}</p>
//       <p className="nirvana-place-j">Nirvana Place: {place?.nirvana_place ? "Yes" : "No"}</p>
//       <p className="pratishtha-year-j">Pratishtha Year: {place?.pratishtha_year}</p>
//       <p className="architecture-style-j">Architecture Style: {place?.architecture_style}</p>

//       {/* Plan Your Pilgrimage Section */}
//       <div className="travel-overlay-j">
//         <h2 className="travel-title-j">Plan Your Pilgrimage</h2>
//         <div className="card-container-j">
//           <div className="card-j" onClick={() => navigate(`/transport/${id}`)} style={{ cursor: 'pointer' }}>
//             <FaMapMarkerAlt className="icon-j" />
//             <h3>How to Reach</h3>
//             <p>Find the best routes to reach {place?.name} via air, rail, and road.</p>
//             <img src={getImageSrc(0)} alt="How to Reach" className="section-image-j" />
//           </div>
//           <div className="card-j" onClick={() => navigate(`/stay/${id}`)} style={{ cursor: 'pointer' }}>
//             <FaHotel className="icon-j" />
//             <h3>Where to Stay</h3>
//             <p>Explore nearby accommodations for a comfortable stay.</p>
//             <img src={getImageSrc(1)} alt="Where to Stay" className="section-image-j" />
//           </div>
//           <div className="card-j" onClick={() => navigate(`/nearby-attractions-jainism/${id}`)} style={{ cursor: 'pointer' }}>
//             <FaLandmark className="icon-j" />
//             <h3>Nearby Attractions</h3>
//             <p>Discover other significant places around {place?.name}.</p>
//             <img src={getImageSrc(2)} alt="Nearby Attractions" className="section-image-j" />
//           </div>
//         </div>
//       </div>

//       {/* Timings Section */}
//       <h2>Temple Timings</h2>
//       {place?.timings && Object.keys(place.timings).length > 0 ? (
//         <div className="timing-cards-j">
//           {Object.entries(place.timings).map(([day, hours]) =>
//             typeof hours === 'string' ? (
//               <div className="timing-card-j" key={day}>
//                 <FaClock className="icon-j" />
//                 <strong>{day}</strong>
//                 <p>{hours}</p>
//                 <img src={getImageSrc(3)} alt="Timings" className="section-image-j" />
//               </div>
//             ) : (
//               Object.entries(hours).map(([event, timing]) => (
//                 <div className="timing-card-j" key={event}>
//                   <FaClock className="icon-j" />
//                   <strong>{event}</strong>
//                   <p>{timing}</p>
//                   <img src={getImageSrc(4)} alt="Event Timings" className="section-image-j" />
//                 </div>
//               ))
//             )
//           )}
//         </div>
//       ) : (
//         <p>No timings available.</p>
//       )}

//       {/* Visiting Info Section */}
//       <div className="visiting-info-j">
//         <h2>Visiting Information</h2>
//         {place?.visiting_info ? (
//           <div>
//             <p><strong>Location:</strong> Latitude: {place.visiting_info.location.latitude}, Longitude: {place.visiting_info.location.longitude}</p>
//             <p><strong>Visiting Hours:</strong> {place.visiting_info.visiting_hours}</p>
//             <p><strong>Parikrama Distance:</strong> {place.visiting_info.parikrama_distance_km} km</p>
//             <img src={getImageSrc(5)} alt="Visiting Info" className="section-image-j" />
//           </div>
//         ) : (
//           <p>No visiting information available.</p>
//         )}
//       </div>

//       {/* Interesting Facts Section */}
//       <div className="interesting-facts-j">
//         <h2>Interesting Facts</h2>
//         <ul>
//           {place?.interesting_facts?.map((fact, index) => (
//             <li key={index}>{fact}</li>
//           ))}
//         </ul>
//         <img src={getImageSrc(6)} alt="Interesting Facts" className="section-image-j" />
//       </div>

//       {/* Special Festival Section */}
//       <div className="special-festival-j">
//         <h2>Special Festivals</h2>
//         <ul>
//           {place?.special_festival?.map((festival, index) => (
//             <li key={index}>{festival}</li>
//           ))}
//         </ul>
//         <img src={getImageSrc(7)} alt="Festivals" className="section-image-j" />
//       </div>

//       {/* Dhyan Kendra Section */}
//       {place?.dhyan_kendra_available && (
//         <div className="dhyan-kendra-j">
//           <h2>Dhyan Kendra</h2>
//           <p>Name: {place?.dhyan_kendra_details?.name}</p>
//           <p>Timings: {place?.dhyan_kendra_details?.timings}</p>
//           <p>Facilities: {place?.dhyan_kendra_details?.facilities.join(', ')}</p>
//           <img src={getImageSrc(8)} alt="Dhyan Kendra" className="section-image-j" />
//         </div>
//       )}

//       {/* Contact Information Section */}
//       <div className="contact-info-j">
//         <h2>Contact Information</h2>
//         <p>Phone: {place?.contact?.phone_numbers?.join(', ')}</p>
//         <p>Email: <a href={`mailto:${place?.contact?.email}`}>{place?.contact?.email}</a></p>
//         <p>Official Website: <a href={place?.contact?.official_website} target="_blank" rel="noopener noreferrer">{place?.contact?.official_website}</a></p>
//         <img src={getImageSrc(9)} alt="Contact Info" className="section-image-j" />
//       </div>

//       {/* Image Section */}
//       <div className="place-images-j">
//         <h2>Images</h2>
//         <div className="image-gallery-j">
//           {images.map((image, index) => (
//             <img key={index} src={getImageSrc(index)} alt={`Place Image ${index + 1}`} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get the place ID
import './Jainism.css'; // Add the CSS file for styling
import { FaMapMarkerAlt, FaHotel, FaLandmark, FaClock } from 'react-icons/fa'; // Import the icons
import WeatherBox from './WeatherBox';
import MapComponent from './MapComponent';

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
    <div className="place-details-j">
      <h1>{place?.name}</h1>

      {/* <p className="place-address-j">
        <FaMapMarkerAlt /> {place?.address}, {place?.state}
      </p> */}
{/* google map */}
<p className="place-address-j">
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
      <p className="place-description-j">{place?.description}</p>
      <br></br>
      <p className="tirthankar-j">Tirthankar: {place?.tirthankar}</p>
      <p className="nirvana-place-j">Nirvana Place: {place?.nirvana_place ? "Yes" : "No"}</p>
      <p className="pratishtha-year-j">Pratishtha Year: {place?.pratishtha_year}</p>
      <p className="architecture-style-j">Architecture Style: {place?.architecture_style}</p>

      <br></br>
      <br></br>
      <h2>Temple Timings</h2>
      <br></br>
      {place?.timings && Object.keys(place.timings).length > 0 ? (
        <div className="timing-cards-j">
          {Object.entries(place.timings).map(([day, hours]) =>
            typeof hours === 'string' ? (
              <div className="timing-card-j" key={day}>
                <FaClock className="icon-j" />
                <strong>{day}</strong>
                <p>{hours}</p>
                <img src={getImageSrc(3)} alt="Temple Timings" className="section-image-j" />
              </div>
            ) : (
              Object.entries(hours).map(([event, timing]) => (
                <div className="timing-card-j" key={event}>
                  <FaClock className="icon-j" />
                  <strong>{event}</strong>
                  <p>{timing}</p>
                  <img src={getImageSrc(4)} alt="Event Timings" className="section-image-j" />
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
      <div className="travel-overlay-j">
        <h2 className="travel-title-j"><bold>Plan Your Pilgrimage</bold></h2>
        <br></br>
        <div className="card-container-j">
          <div className="card-j" onClick={() => navigate(`/transport/${id}`)} style={{ cursor: 'pointer' }}>
            <FaMapMarkerAlt className="icon-j" />
            <h3><strong>How to Reach</strong></h3>
            <p>Find the best routes to reach {place?.name} via air, rail, and road.</p>
            <img src={getImageSrc(0)} alt="How to Reach" className="section-image-j" />
          </div>
          <div className="card-j" onClick={() => navigate(`/stay/${id}`)} style={{ cursor: 'pointer' }}>
            <FaHotel className="icon-j" />
            <h3><strong>Where to Stay</strong></h3>
            <p>Explore nearby accommodations for a comfortable stay.</p>
            <img src={getImageSrc(1)} alt="Where to Stay" className="section-image-j" />
          </div>
          <div className="card-j" onClick={() => navigate(`/nearby-attractions-jainism/${id}`)} style={{ cursor: 'pointer' }}>
            <FaLandmark className="icon-j" />
            <h3><strong>Nearby Attractions</strong></h3>
            <p>Discover other significant places around {place?.name}.</p>
            <img src={getImageSrc(2)} alt="Nearby Attractions" className="section-image-j" />
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <div className="interesting-facts-j">
        <h2>Interesting Facts</h2>
        <ul>
          {place?.interesting_facts?.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>

      <br></br>
      <br></br>
      <div className="contact-info-j section-block">
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
      <div className="place-images-j">
        <h2></h2>
        <div className="image-gallery-j">
          {images.map((image, index) => (
            <img key={index} src={getImageSrc(index)} alt={`Place Image ${index + 1}`} className="section-image-j" />
          ))}
        </div>
      </div>
    </div>
  );
}