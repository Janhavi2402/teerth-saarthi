
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchTemplesByReligion = async (religion) => {
  const response = await fetch(`${API_BASE_URL}/temples/search?religion=${encodeURIComponent(religion)}`);
  return response.json();
};



export async function fetchTempleById(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/temples/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch temple details");
      }
      return await response.json();
    } catch (error) {
      console.error("ERROR", error);
      return null;
    }
  };
  

  export const fetchNearbyPlaces = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/temples/${id}/nearby_places`);
      return response.data;
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      throw error;
    }
  };
  