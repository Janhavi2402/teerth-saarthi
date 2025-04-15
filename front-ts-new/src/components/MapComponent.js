// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import './MapComponent.css';

// // Custom red marker icon (like Google Maps)
// const redIcon = new L.Icon({
//   iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// export default function MapComponent({ latitude, longitude }) {
//   return (
//     <div className="map-component-wrapper">
//       <MapContainer
//         center={[latitude, longitude]}
//         zoom={13}
//         scrollWheelZoom={false}
//         style={{ height: '100%', width: '100%' }}
//       >
//         <TileLayer
//           attribution='&copy; OpenStreetMap contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[latitude, longitude]} icon={redIcon}>
//           <Popup>Location</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }



import React, { useEffect } from 'react';
import './MapComponent.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customIconUrl from './service4.png'; // 🔁 Replace this with your actual image path

export default function MapComponent({ latitude, longitude }) {
  useEffect(() => {
    if (!latitude || !longitude) return;

    const map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const icon = L.icon({
      iconUrl: customIconUrl,
      iconSize: [32, 32],       // 🛠️ Adjust size if needed
      iconAnchor: [16, 32],     // Aligns the bottom center of the icon to the location
      popupAnchor: [0, -30],    // Position popup above the marker
    });

    L.marker([latitude, longitude], { icon })
      .addTo(map)
      .openPopup(); // Optional: remove if no popup is needed

    return () => {
      map.remove();
    };
  }, [latitude, longitude]);

  return (
    <div className="map-container" style={{ height: '400px', width: '100%' }} id="map"></div>
  );
}

