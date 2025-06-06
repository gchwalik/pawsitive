import axios from "axios";
import { z } from "zod";

import { ROUTES } from "../routes";
import { PlaceTypeSchema } from "./placeTypesApi";

// Schemas

const PlaceSchema = z.object({
  name: z.string(),
  type: PlaceTypeSchema
})

const PlaceEntitySchema = PlaceSchema.extend({
  id: z.number(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
});

const PlacesPageSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(PlaceEntitySchema),
});

// Types
type Place = z.infer<typeof PlaceSchema>
type PlaceEntity = z.infer<typeof PlaceEntitySchema>

// Helpers

const getEmptyPlace = (): Place => ({ 
  name: "",
  type: { name: "", place_count: 0 }
})

const toPlace = (placeEntity: PlaceEntity): Place => {
  return {
    name: placeEntity.name,
    type: placeEntity.type
  }
}

// APIs

const fetchPlaces = async (): Promise<PlaceEntity[]> => {
  try {
    const response = await axios.get(ROUTES.API.PLACES);

    // Validate the paginated response
    const validatedResponse = PlacesPageSchema.parse(response.data);
    return validatedResponse.results; // api has pagination
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error; // Re-throw to let components handle it
  }
};

const createPlace = async (place: Place): Promise<PlaceEntity> => {
  try {
    const validatedPlace = PlaceSchema.parse(place);
    const response = await axios.post(ROUTES.API.PLACES, validatedPlace);

    // Validate created PlaceEntity
    const validatedResponse = PlaceEntitySchema.parse(response.data);
    return validatedResponse;
  } catch (error) {
    console.error("Error creating place:", error);
    throw error; // Re-throw to let components handle it
  }
}

const fetchPlace = async (id: number): Promise<PlaceEntity> => {
  try {
    const response = await axios.get(ROUTES.API.PLACES_DETAIL(id));

    // Validate fetched PlaceEntity
    const validatedResponse = PlaceEntitySchema.parse(response.data);
    return validatedResponse;
  } catch (error) {
    console.error("Error fetching place:", error);
    throw error; // Re-throw to let components handle it
  }
};

const updatePlace = async (place: Place, id: number): Promise<PlaceEntity> => {
  try {
    const validatedPlace = PlaceSchema.parse(place);
    const response = await axios.put(ROUTES.API.PLACES_DETAIL(id), validatedPlace);

    // Validate updated PlaceEntity
    const validatedResponse = PlaceEntitySchema.parse(response.data);
    return validatedResponse;
  } catch (error) {
    console.error("Error updating place:", error);
    throw error; // Re-throw to let components handle it
  }
}

const deletePlace = async (id: number): Promise<void> => {
  try {
    await axios.delete(ROUTES.API.PLACES_DETAIL(id));
  } catch (error) {
    console.error("Error deleting place:", error);
    throw error; // Re-throw to let components handle it
  }
}

export type { Place, PlaceEntity };
export { getEmptyPlace, toPlace };
export { fetchPlaces, fetchPlace, createPlace, updatePlace, deletePlace };
