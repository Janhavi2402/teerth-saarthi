// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // useParams to get the place ID
// import './Buddhism.css'; // Add the CSS file for styling
// import { FaMapMarkerAlt, FaHotel, FaLandmark, FaClock } from 'react-icons/fa'; // Import the icons

// export default function BuddhismDetails() {
//   const { id } = useParams(); // Get place ID from URL
//   const [place, setplace] = useState(null);
//   const [images, setImages] = useState([]); // State to hold images for the place
//   const [loading, setLoading] = useState(true); // For loading state
//   const [error, setError] = useState(null); // For error state
//   const navigate = useNavigate(); // Navigate hook for going back

//   // Fetch place details and images based on ID
//   useEffect(() => {
//     async function fetchBuddhismDetails() {
//       try {
//         setLoading(true);
//         const placeResponse = await fetch(http://localhost:5000/api/buddhism/${id});
//         const placeData = await placeResponse.json();

//         if (placeData) {
//           setplace(placeData); // Set place data
//         } else {
//           setError('place not found');
//         }

//         // Fetch images
//         const imageResponse = await fetch(http://localhost:5000/api/images/${id});
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

//     fetchBuddhismDetails();
//   }, [id]); // Re-run effect when id changes

//   const getImageSrc = (index) => {
//     if (images.length > index && images[index]) {
//       const imgSrc = images[index];

//       // If it's already a URL or a valid Base64 data URL, return it as is
//       if (imgSrc.startsWith('http') || imgSrc.startsWith('data:image')) {
//         return imgSrc;
//       }

//       // Otherwise, assume it's raw Base64 and prepend the required prefix
//       return data:image/jpeg;base64,${imgSrc};
//     }

//     return ''; // Fallback if missing
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="place-details-fullscreen-b">
//       {/* place Image Section 1 */}
//       <div className="section-b">
//         <div className="image-container-b">
//           <img src={getImageSrc(0)} alt="place View" className="image-b" />
//           <div className="overlay-b">
//             <h2>{place.name}</h2>
//             <p>{place.address}</p>
//           </div>
//         </div>
//       </div>

//       {/* place Description Section 2 */}
//       <section className="section-b">
//         <div className="image-container-b">
//           <img src={getImageSrc(1)} alt="place Description" className="image-b" />
//           <div className="overlay-b">
//             <h3>Description</h3>
//             <p>{place.description}</p>
//           </div>
//         </div>
//       </section>

//       {/* place Timings Section 3 */}
//       <section className="section-b">
//         <div className="image-container-b">
//           <img src={getImageSrc(2)} alt="place Timings" className="image-b" />
//           <div className="overlay-b">
//             <h3>place Timings</h3>
//             {place?.timings && Object.keys(place.timings).length > 0 ? (
//               <div className="timing-cards-b">
//                 {Object.entries(place.timings).map(([day, hours]) =>
//                   typeof hours === 'string' ? (
//                     <div className="timing-card-b" key={day}>
//                       <FaClock className="icon" />
//                       <strong>{day}</strong>
//                       <p>{hours}</p>
//                     </div>
//                   ) : (
//                     Object.entries(hours).map(([event, timing]) => (
//                       <div className="timing-card-b" key={event}>
//                         <FaClock className="icon-b" />
//                         <strong>{event}</strong>
//                         <p>{timing}</p>
//                       </div>
//                     ))
//                   )
//                 )}
//               </div>
//             ) : (
//               <p>No timings available.</p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Plan Your Pilgrimage Section 4 */}
//       <section className="section-b">
//         <div className="image-container-b">
//           <img src={getImageSrc(3)} alt="Pilgrimage Plan" className="image-b" />
//           <div className="overlay-b">
//             <h2>Plan Your Pilgrimage</h2>
//             <div className="card-container-b">
//               <div className="card-b" onClick={() => navigate(/transport/${id})} style={{ cursor: 'pointer' }}>
//                 <FaMapMarkerAlt className="icon-b" />
//                 <h3>How to Reach</h3>
//                 <p>Find the best routes to reach {place?.name} via air, rail, and road.</p>
//               </div>
//               <div className="card-b" onClick={() => navigate(/stay/${id})} style={{ cursor: 'pointer' }}>
//                 <FaHotel className="icon-b" />
//                 <h3>Where to Stay</h3>
//                 <p>Explore nearby accommodations for a comfortable stay.</p>
//               </div>
//               <div className="card-b" onClick={() => navigate(/nearby-attractions/${id})} style={{ cursor: 'pointer' }}>
//                 <FaLandmark className="icon-b" />
//                 <h3>Nearby Attractions</h3>
//                 <p>Discover other significant places around {place?.name}.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Interesting Facts Section 5 */}
//       <section className="section-b">
//         <div className="image-container-b">
//           <img src={getImageSrc(4)} alt="Interesting Facts" className="image-b" />
//           <div className="overlay-b">
//             <h3>Interesting Facts</h3>
//             <ul>
//               {place.interesting_facts?.map((fact, index) => (
//                 <li key={index}>{fact}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Buddha Association Section */}
//       <section>
//         <h3>Buddha Association</h3>
//         <p>{place.buddha_association}</p>
//       </section>

//       {/* Stupa Information */}
//       {place.stupa_available && (
//         <section>
//           <h3>Main Stupa</h3>
//           <p><strong>Height:</strong> {place.main_stupa?.height_meters} meters</p>
//           <p><strong>Material:</strong> {place.main_stupa?.material}</p>
//           <p><strong>Year Built:</strong> {place.main_stupa?.year_built}</p>
//         </section>
//       )}

//       {/* Special Festivals */}
//       {place.special_festival && (
//         <section>
//           <h3>Special Festivals</h3>
//           <ul>
//             {place.special_festival?.map((festival, index) => (
//               <li key={index}>{festival}</li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* Architecture Style */}
//       <section>
//         <h3>Architecture Style</h3>
//         <p>{place.architecture_style}</p>
//       </section>

//       {/* Meditation Center */}
//       {place.meditation_center_available && (
//         <section>
//           <h3>Meditation Center</h3>
//           <p><strong>Name:</strong> {place.meditation_center_details?.name}</p>
//           <p><strong>Timings:</strong> {place.meditation_center_details?.timings}</p>
//           <p><strong>Facilities:</strong></p>
//           <ul>
//             {place.meditation_center_details?.facilities?.map((facility, index) => (
//               <li key={index}>{facility}</li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* Contact Information */}
//       <section>
//         <h3>Contact</h3>
//         <p><strong>Email:</strong> <a href={mailto:${place.contact?.email}}>{place.contact?.email}</a></p>
//         <p><strong>Website:</strong> <a href={place.contact?.official_website} target="_blank" rel="noopener noreferrer">{place.contact?.official_website}</a></p>
//         <p><strong>Phone Numbers:</strong></p>
//         <ul>
//           {place.contact?.phone_numbers?.map((phone, index) => (
//             <li key={index}>{phone}</li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// }






import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get the place ID
import './Buddhism.css'; // Add the CSS file for styling
import { FaMapMarkerAlt, FaHotel, FaLandmark, FaClock } from 'react-icons/fa'; // Import the icons
import WeatherBox from './WeatherBox';
import MapComponent from './MapComponent';

export default function BuddhismDetails() {
  const { id } = useParams(); // Get place ID from URL
  const [place, setplace] = useState(null);
  const [images, setImages] = useState([]); // State to hold images for the place
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state
  const navigate = useNavigate(); // Navigate hook for going back

  // Fetch place details and images based on ID
  useEffect(() => {
    async function fetchBuddhismDetails() {
      try {
        setLoading(true);
        const placeResponse = await fetch(`http://localhost:5000/api/buddhism/${id}`);
        const placeData = await placeResponse.json();

        if (placeData) {
          setplace(placeData); // Set place data
        } else {
          setError('place not found');
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

    fetchBuddhismDetails();
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
      <div className="place-details-b">
        <h1>{place?.name}</h1>
        {/* <p className="place-address-b">
          <FaMapMarkerAlt /> {place?.address}, {place?.state}
        </p> */}
        {/* google maps */}

        <p className="place-address-b">
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
  {place?.address}, {place?.country}
</p>



        <br></br>
        <p className="place-description-b">{place?.description}</p>
        <br></br>
        <p className="art-architecture-b">Architecture Style: {place?.architecture_style}</p>
  
        <br></br>
        <br></br>
        <h2>Timings</h2>
        <br></br>
        {place?.timings && Object.keys(place.timings).length > 0 ? (
          <div className="timing-cards-b">
            {Object.entries(place.timings).map(([day, hours]) =>
              typeof hours === 'string' ? (
                <div className="timing-card-b" key={day}>
                  <FaClock className="icon-b" />
                  <strong>{day}</strong>
                  <p>{hours}</p>
                  <img src={getImageSrc(3)} alt="place Timings" className="section-image-b" />
                </div>
              ) : (
                Object.entries(hours).map(([event, timing]) => (
                  <div className="timing-card-b" key={event}>
                    <FaClock className="icon-b" />
                    <strong>{event}</strong>
                    <p>{timing}</p>
                    <img src={getImageSrc(4)} alt="Event Timings" className="section-image-b" />
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
  
  {/* Plan Your Pilgrimage Section 4
//       <section className="section-b">
//         <div className="image-container-b">
//           <img src={getImageSrc(3)} alt="Pilgrimage Plan" className="image-b" />
//           <div className="overlay-b">
//             <h2>Plan Your Pilgrimage</h2>
//             <div className="card-container-b">
//               <div className="card-b" onClick={() => navigate(/transport/${id})} style={{ cursor: 'pointer' }}>
//                 <FaMapMarkerAlt className="icon-b" />
//                 <h3>How to Reach</h3>
//                 <p>Find the best routes to reach {place?.name} via air, rail, and road.</p>
//               </div>
//               <div className="card-b" onClick={() => navigate(/stay/${id})} style={{ cursor: 'pointer' }}>
//                 <FaHotel className="icon-b" />
//                 <h3>Where to Stay</h3>
//                 <p>Explore nearby accommodations for a comfortable stay.</p>
//               </div>
//               <div className="card-b" onClick={() => navigate(/nearby-attractions/${id})} style={{ cursor: 'pointer' }}>
//                 <FaLandmark className="icon-b" />
//                 <h3>Nearby Attractions</h3>
//                 <p>Discover other significant places around {place?.name}.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section> */}
  
        {/* Plan Your Pilgrimage Section */}
        <div className="travel-overlay-b">
          <h2 className="travel-title-b"><bold>Plan Your Pilgrimage</bold></h2>
          <br></br>
          <div className="card-container-b">
            <div className="card-b" onClick={() => navigate(`/transport/${id}`)} style={{ cursor: 'pointer' }}>
              <FaMapMarkerAlt className="icon-b" />
              <h3><strong>How to Reach</strong></h3>
              <p>Find the best routes to reach {place?.name} via air, rail, and road.</p>
              <img src={getImageSrc(0)} alt="How to Reach" className="section-image-b" />
            </div>
            <div className="card-b" onClick={() => navigate(`/stay/${id}`)} style={{ cursor: 'pointer' }}>
              <FaHotel className="icon-b" />
              <h3><strong>Where to Stay</strong></h3>
              <p>Explore nearby accommodations for a comfortable stay.</p>
              <img src={getImageSrc(1)} alt="Where to Stay" className="section-image-b" />
            </div>
            <div className="card-b" onClick={() => navigate(`/nearby-attractions-buddhism/${id}`)} style={{ cursor: 'pointer' }}>
              <FaLandmark className="icon-b" />
              <h3><strong>Nearby Attractions</strong></h3>
              <p>Discover other significant places around {place?.name}.</p>
              <img src={getImageSrc(2)} alt="Nearby Attractions" className="section-image-b" />
            </div>
          </div>
        </div>
  
        
        <br></br>
        <br></br>
        {/* Interesting Facts Section */}
        <div className="interesting-facts-b">
          <h2>Interesting Facts</h2>
          <ul>
            {place?.interesting_facts?.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
          {/* <img src={getImageSrc(5)} alt="Interesting Facts" className="section-image-b" /> */}
        </div>
          
        <br></br>
        <br></br>
  
  
  
        {/* Contact Information Section */}
        <div className="contact-info-b section-block">
    <h2>Contact Information</h2>
    <ul><strong>Phone:</strong> {place?.contact?.phone_numbers?.join(', ')}</ul>
    <ul><strong>Email:</strong> <a href={`mailto:${place?.contact?.email}`}>{place?.contact?.email}</a></ul>
    <ul><strong>Official Website:</strong> <a href={place?.contact?.official_website} target="_blank" rel="noopener noreferrer">{place?.contact?.official_website}</a></ul>
  </div>
  {/* here */}
  {/* here */}
  <br></br> <br></br>
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
  {/* here */}
        <br></br><br></br>
        <h2>Gallery
        </h2>
        {/* Image Section */}
        <div className="place-images-b">
          <h2></h2>
          <div className="image-gallery-b">
            {images.map((image, index) => (
              <img key={index} src={getImageSrc(index)} alt={`Place Image ${index + 1}`} className="section-image-b" />
            ))}
          </div>
        </div>
      </div>
    );
}