import React, { useEffect, useState } from 'react';
import './WeatherBox.css';

export default function WeatherBox({ latitude, longitude }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "";

  useEffect(() => {
    if (!latitude || !longitude) return;

    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
        );
        const data = await response.json();
        if (data.error) {
          setError(data.error.message);
        } else {
          setWeather(data);
        }
      } catch (err) {
        setError('Failed to fetch weather');
      }
    }

    fetchWeather();
  }, [latitude, longitude]);

  if (error) return <div className="weather-box">Weather Error: {error}</div>;
  if (!weather) return <div className="weather-box">Loading weather...</div>;

  const { current, location } = weather;

  return (
    <div className="weather-box-container">
      <div className="weather-box">
        <h3>Current Weather</h3>
        <p className="location"><strong>{location.name}, {location.region}</strong></p>
        <img src={`http:${current.condition.icon}`} alt={current.condition.text} />
        <p className="condition-text">{current.condition.text}</p>
        <p className="temperature">Temperature: {current.temp_c}°C</p>
        <p className="humidity">Humidity: {current.humidity}%</p>
        <p className="wind">Wind: {current.wind_kph} kph</p>
      </div>
    </div>
  );
}
