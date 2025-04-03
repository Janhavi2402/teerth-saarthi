import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get the temple ID
import './Buddhism.css'; // Add the CSS file for styling
import { FaMapMarkerAlt, FaHotel, FaLandmark, FaClock } from 'react-icons/fa'; // Import the icons

export default function BuddhismDetails() {
  const { id } = useParams(); // Get temple ID from URL
  const [temple, setTemple] = useState(null);
  const [images, setImages] = useState([]); // State to hold images for the temple
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state
  const navigate = useNavigate(); // Navigate hook for going back

  // Fetch temple details and images based on ID
  useEffect(() => {
    async function fetchBuddhismDetails() {
      try {
        setLoading(true);
        const templeResponse = await fetch(`http://localhost:5000/api/buddhism/${id}`);
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
    <div className="temple-details-fullscreen-b">
      {/* Temple Image Section 1 */}
      <div className="section-b">
        <div className="image-container-b">
          <img src={getImageSrc(0)} alt="Temple View" className="image-b" />
          <div className="overlay-b">
            <h2>{temple.name}</h2>
            <p>{temple.address}</p>
          </div>
        </div>
      </div>

      {/* Temple Description Section 2 */}
      <section className="section-b">
        <div className="image-container-b">
          <img src={getImageSrc(1)} alt="Temple Description" className="image-b" />
          <div className="overlay-b">
            <h3>Description</h3>
            <p>{temple.description}</p>
          </div>
        </div>
      </section>

      {/* Temple Timings Section 3 */}
      <section className="section-b">
        <div className="image-container-b">
          <img src={getImageSrc(2)} alt="Temple Timings" className="image-b" />
          <div className="overlay-b">
            <h3>Temple Timings</h3>
            {temple?.timings && Object.keys(temple.timings).length > 0 ? (
              <div className="timing-cards-b">
                {Object.entries(temple.timings).map(([day, hours]) =>
                  typeof hours === 'string' ? (
                    <div className="timing-card-b" key={day}>
                      <FaClock className="icon" />
                      <strong>{day}</strong>
                      <p>{hours}</p>
                    </div>
                  ) : (
                    Object.entries(hours).map(([event, timing]) => (
                      <div className="timing-card-b" key={event}>
                        <FaClock className="icon-b" />
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
        </div>
      </section>

      {/* Plan Your Pilgrimage Section 4 */}
      <section className="section-b">
        <div className="image-container-b">
          <img src={getImageSrc(3)} alt="Pilgrimage Plan" className="image-b" />
          <div className="overlay-b">
            <h2>Plan Your Pilgrimage</h2>
            <div className="card-container-b">
              <div className="card-b" onClick={() => navigate(`/transport/${id}`)} style={{ cursor: 'pointer' }}>
                <FaMapMarkerAlt className="icon-b" />
                <h3>How to Reach</h3>
                <p>Find the best routes to reach {temple?.name} via air, rail, and road.</p>
              </div>
              <div className="card-b" onClick={() => navigate(`/stay/${id}`)} style={{ cursor: 'pointer' }}>
                <FaHotel className="icon-b" />
                <h3>Where to Stay</h3>
                <p>Explore nearby accommodations for a comfortable stay.</p>
              </div>
              <div className="card-b" onClick={() => navigate(`/nearby-attractions/${id}`)} style={{ cursor: 'pointer' }}>
                <FaLandmark className="icon-b" />
                <h3>Nearby Attractions</h3>
                <p>Discover other significant places around {temple?.name}.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interesting Facts Section 5 */}
      <section className="section-b">
        <div className="image-container-b">
          <img src={getImageSrc(4)} alt="Interesting Facts" className="image-b" />
          <div className="overlay-b">
            <h3>Interesting Facts</h3>
            <ul>
              {temple.interesting_facts?.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Buddha Association Section */}
      <section>
        <h3>Buddha Association</h3>
        <p>{temple.buddha_association}</p>
      </section>

      {/* Stupa Information */}
      {temple.stupa_available && (
        <section>
          <h3>Main Stupa</h3>
          <p><strong>Height:</strong> {temple.main_stupa?.height_meters} meters</p>
          <p><strong>Material:</strong> {temple.main_stupa?.material}</p>
          <p><strong>Year Built:</strong> {temple.main_stupa?.year_built}</p>
        </section>
      )}

      {/* Special Festivals */}
      {temple.special_festival && (
        <section>
          <h3>Special Festivals</h3>
          <ul>
            {temple.special_festival?.map((festival, index) => (
              <li key={index}>{festival}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Architecture Style */}
      <section>
        <h3>Architecture Style</h3>
        <p>{temple.architecture_style}</p>
      </section>

      {/* Meditation Center */}
      {temple.meditation_center_available && (
        <section>
          <h3>Meditation Center</h3>
          <p><strong>Name:</strong> {temple.meditation_center_details?.name}</p>
          <p><strong>Timings:</strong> {temple.meditation_center_details?.timings}</p>
          <p><strong>Facilities:</strong></p>
          <ul>
            {temple.meditation_center_details?.facilities?.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Contact Information */}
      <section>
        <h3>Contact</h3>
        <p><strong>Email:</strong> <a href={`mailto:${temple.contact?.email}`}>{temple.contact?.email}</a></p>
        <p><strong>Website:</strong> <a href={temple.contact?.official_website} target="_blank" rel="noopener noreferrer">{temple.contact?.official_website}</a></p>
        <p><strong>Phone Numbers:</strong></p>
        <ul>
          {temple.contact?.phone_numbers?.map((phone, index) => (
            <li key={index}>{phone}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
