import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams to get the religion and temple ID

export default function NearbyAttractionsChristianPage() {
  const { id, religion } = useParams(); // Get both the religion and temple ID from the URL
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNearbyAttractions() {
      try {
        setLoading(true);
        // Fetch temple details based on ID
        const response = await fetch(
          `http://localhost:5000/api/Christianity/${id}`
        );
        
        // Check if response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch temple details');
        }

        const data = await response.json();

        // If the temple has nearby places, set them as attractions
        if (data && data.nearby_places && data.nearby_places.length > 0) {
          setAttractions(data.nearby_places);
        } else {
          setError('No nearby attractions found.');
        }

        setLoading(false);
      } catch (error) {
        setError('Error fetching nearby attractions');
        setLoading(false);
      }
    }

    fetchNearbyAttractions();
  }, [id]); // Re-run effect when id changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Inline CSS styles
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
    },
    header: {
      fontSize: '2rem',
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginTop: '20px',
    },
    card: {
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
    },
    cardHover: {
      transform: 'scale(1.05)',
    },
    cardTitle: {
      fontSize: '1.5rem',
      margin: '0',
      color: '#333',
    },
    cardDescription: {
      fontSize: '1rem',
      color: '#555',
      margin: '10px 0',
    },
    cardDistance: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#333',
    },
    errorMessage: {
      color: 'red',
      fontSize: '1.2rem',
      textAlign: 'center',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Nearby Attractions for {religion} Temple</h1>
      <div style={styles.list}>
        {attractions.length > 0 ? (
          attractions.map((place, index) => (
            <div
              key={index}
              style={{ ...styles.card, '&:hover': styles.cardHover }}
            >
              <h2 style={styles.cardTitle}>{place.name}</h2>
              <p style={styles.cardDescription}>{place.description}</p>
              <p style={styles.cardDistance}>
                <strong>Distance:</strong> {place.distance_km} km
              </p>
            </div>
          ))
        ) : (
          <p style={styles.errorMessage}>No nearby attractions found for this temple.</p>
        )}
      </div>
    </div>
  );
}
