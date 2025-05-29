import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

interface Place {
  id?: number;
  name: string;
  created?: Date;
  updated?: Date;
}

const fetchPlaces = async (): Promise<Place[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/places/`);
    return response.data.results; // api has pagination
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error; // Re-throw to let components handle it
  }
};

const fetchPlace = async (id: number): Promise<Place> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/places/${id}/`);
    console.log("API Response:", response.data); // Add this line
    return response.data;
  } catch (error) {
    console.error("Error fetching place:", error);
    throw error; // Re-throw to let components handle it
  }
};

const createPlace = async (place: Place): Promise<Place> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/places/`, place);
    return response.data;
  } catch (error) {
    console.error("Error creating place:", error);
    throw error; // Re-throw to let components handle it
  }
}

export { fetchPlaces, fetchPlace, createPlace };
export type { Place };
