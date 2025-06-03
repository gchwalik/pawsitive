import axios from "axios";
import { ROUTES } from "../routes";

// Types

interface Place {
  name: string;
}

interface PlaceEntity extends Place {
  id: number;
  created: Date;
  updated: Date;
}

// Helpers

const getEmptyPlace = (): Place => ({ name: "" })

const toPlace = (placeEntity: PlaceEntity): Place => {
  return {
    name: placeEntity.name
  }
}

// APIs

const fetchPlaces = async (): Promise<PlaceEntity[]> => {
  try {
    const response = await axios.get(ROUTES.API.PLACES_LIST);
    return response.data.results; // api has pagination
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error; // Re-throw to let components handle it
  }
};

const createPlace = async (place: Place): Promise<Place> => {
  try {
    const response = await axios.post(ROUTES.API.PLACES_CREATE, place);
    return response.data;
  } catch (error) {
    console.error("Error creating place:", error);
    throw error; // Re-throw to let components handle it
  }
}

const fetchPlace = async (id: number): Promise<PlaceEntity> => {
  try {
    const response = await axios.get(ROUTES.API.PLACES_DETAIL(id));
    console.log("API Response:", response.data); // Add this line
    return response.data;
  } catch (error) {
    console.error("Error fetching place:", error);
    throw error; // Re-throw to let components handle it
  }
};

const updatePlace = async (place: Place, id: number): Promise<Place> => {
  try {
    const response = await axios.put(ROUTES.API.PLACES_DETAIL(id), place);
    return response.data;
  } catch (error) {
    console.error("Error deleting place:", error);
    throw error; // Re-throw to let components handle it
  }
}

const deletePlace = async (id: number): Promise<Place> => {
  try {
    const response = await axios.delete(ROUTES.API.PLACES_DETAIL(id));
    return response.data;
  } catch (error) {
    console.error("Error deleting place:", error);
    throw error; // Re-throw to let components handle it
  }
}

export type { Place, PlaceEntity };
export { getEmptyPlace, toPlace };
export { fetchPlaces, fetchPlace, createPlace, updatePlace, deletePlace };
