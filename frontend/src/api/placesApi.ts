import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

interface Place {
  id?: number;
  name: string;
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

const createPlace = async (place: Place): Promise<Place> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/places/`, place);
    return response.data.results;
  } catch (error) {
    console.error("Error creating place:", error);
    throw error; // Re-throw to let components handle it
  }
}

export { fetchPlaces, createPlace };
export type { Place };
