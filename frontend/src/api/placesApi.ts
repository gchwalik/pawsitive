import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

interface Place {
  name: string;
}

interface PlaceEntity extends Place {
  id: number;
  created: Date;
  updated: Date;
}

const fetchPlaces = async (): Promise<PlaceEntity[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/places/`);
    return response.data.results; // api has pagination
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error; // Re-throw to let components handle it
  }
};

const fetchPlace = async (id: number): Promise<PlaceEntity> => {
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

const deletePlace = async (id: number): Promise<Place> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/places/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting place:", error);
    throw error; // Re-throw to let components handle it
  }
}

export { fetchPlaces, fetchPlace, createPlace, deletePlace };
export type { Place, PlaceEntity };
