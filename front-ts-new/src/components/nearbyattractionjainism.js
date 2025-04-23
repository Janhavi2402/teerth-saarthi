// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // useParams to get the religion and temple ID

// export default function NearbyAttractionsJainismPage() {
//   const { id, religion } = useParams(); // Get both the religion and temple ID from the URL
//   const [attractions, setAttractions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchNearbyAttractions() {
//       try {
//         setLoading(true);
//         // Fetch temple details based on ID
//         const response = await fetch(
//           `http://localhost:5000/api/jainism/${id}`
//         );
        
//         // Check if response is successful
//         if (!response.ok) {
//           throw new Error('Failed to fetch temple details');
//         }

//         const data = await response.json();

//         // If the temple has nearby places, set them as attractions
//         if (data && data.nearby_places && data.nearby_places.length > 0) {
//           setAttractions(data.nearby_places);
//         } else {
//           setError('No nearby attractions found.');
//         }

//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching nearby attractions');
//         setLoading(false);
//       }
//     }

//     fetchNearbyAttractions();
//   }, [id]); // Re-run effect when id changes

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   // Inline CSS styles
//   const styles = {
//     container: {
//       padding: '20px',
//       fontFamily: 'Arial, sans-serif',
//       backgroundColor: '#f9f9f9',
//       minHeight: '100vh',
//     },
//     header: {
//       fontSize: '2rem',
//       textAlign: 'center',
//       marginBottom: '20px',
//       color: '#333',
//     },
//     list: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '20px',
//       marginTop: '20px',
//     },
//     card: {
//       backgroundColor: '#fff',
//       padding: '15px',
//       borderRadius: '8px',
//       boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//       transition: 'transform 0.2s',
//     },
//     cardHover: {
//       transform: 'scale(1.05)',
//     },
//     cardTitle: {
//       fontSize: '1.5rem',
//       margin: '0',
//       color: '#333',
//     },
//     cardDescription: {
//       fontSize: '1rem',
//       color: '#555',
//       margin: '10px 0',
//     },
//     cardDistance: {
//       fontSize: '1rem',
//       fontWeight: 'bold',
//       color: '#333',
//     },
//     errorMessage: {
//       color: 'red',
//       fontSize: '1.2rem',
//       textAlign: 'center',
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Nearby Attractions for {religion} Temple</h1>
//       <div style={styles.list}>
//         {attractions.length > 0 ? (
//           attractions.map((place, index) => (
//             <div
//               key={index}
//               style={{ ...styles.card, '&:hover': styles.cardHover }}
//             >
//               <h2 style={styles.cardTitle}>{place.name}</h2>
//               <p style={styles.cardDescription}>{place.description}</p>
//               <p style={styles.cardDistance}>
//                 <strong>Distance:</strong> {place.distance_km} km
//               </p>
//             </div>
//           ))
//         ) : (
//           <p style={styles.errorMessage}>No nearby attractions found for this temple.</p>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function NearbyAttractionsJainism() {
  const { id } = useParams();
  const [attractions, setAttractions] = useState([]);
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNearbyAttractions() {
      try {
        const response = await fetch(`http://localhost:5000/api/jainism/${id}`);
        const data = await response.json();

        if (data?.nearby_places?.length > 0) {
          setTemple({ name: data.name || "this location" });
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
  }, [id]);

  if (loading)
    return <p style={styles.loading}>Loading nearby attractions...</p>;

  if (error)
    return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.headerBox}>
        <h1 style={styles.header}>Nearby Attractions</h1>
        <p style={styles.subHeader}>
          Explore places around <strong>{temple ? temple.name : 'this location'}</strong>
        </p>
      </div>

      <div style={styles.cardGrid}>
        {attractions.length > 0 ? (
          attractions.map((place) => (
            <div
              key={place._id || place.id}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
              }}
            >
              <h2 style={styles.cardTitle}>{place.name}</h2>
              <p style={styles.cardDesc}>{place.description}</p>

              <div style={styles.metaBox}>
                {place.distance_km && (
                  <p style={styles.metaText}>
                    📍 <strong style={styles.label}>Distance:</strong> {place.distance_km} km
                  </p>
                )}
                {place.estimated_time && (
                  <p style={styles.metaText}>
                    ⏱ <strong style={styles.label}>Time:</strong> {place.estimated_time}
                  </p>
                )}
                {place.rating && (
                  <p style={styles.metaText}>
                    ⭐ <strong style={styles.label}>Rating:</strong> {place.rating}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noAttractions}>
            <p>No attractions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    padding: '60px 25px',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #f3f8fc, #d8e1f2)',
    fontFamily: '"Segoe UI", sans-serif',
  },
  headerBox: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  header: {
    fontSize: '3rem',
    color: '#2c3e50',
    marginBottom: '10px',
    fontWeight: '700',
  },
  subHeader: {
    fontSize: '1.15rem',
    color: '#7f8c8d',
    letterSpacing: '0.5px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '1.6rem',
    marginBottom: '10px',
    color: '#34495e',
  },
  cardDesc: {
    fontSize: '1rem',
    color: '#616161',
    marginBottom: '14px',
    lineHeight: '1.5',
  },
  metaBox: {
    fontSize: '0.9rem',
    color: '#2d3436',
    marginTop: '10px',
  },
  metaText: {
    marginBottom: '8px',
  },
  label: {
    fontWeight: 'bold',
    color: '#0984e3',
  },
  loading: {
    fontSize: '1.3rem',
    textAlign: 'center',
    paddingTop: '60px',
    color: '#555',
  },
  error: {
    fontSize: '1.2rem',
    textAlign: 'center',
    color: 'red',
    paddingTop: '60px',
  },
  noAttractions: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
};


