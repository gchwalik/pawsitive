import axios from "axios";
import { z } from "zod";

import { ROUTES } from "../routes";

// Schemas

const PlaceBaseSchema = z.object({
  name: z.string(),
})

// For write operations: create/update
const PlaceWriteSchema = PlaceBaseSchema.extend({
  // Add any additional fields needed for write operations here
})

// For read operations: fetch
const PlaceReadSchema = PlaceBaseSchema.extend({
  id: z.number(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
});

const PlacePageSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(PlaceReadSchema),
});


// Types

type Place = z.infer<typeof PlaceReadSchema>;
type PlaceInput = z.infer<typeof PlaceWriteSchema>;

// type Place = z.infer<typeof PlaceSchema>
// type PlaceEntity = z.infer<typeof PlaceEntitySchema>

// Helpers

const getEmptyPlaceInput = (): PlaceInput => ({ name: "" });

const toPlaceInput = (place: Place): PlaceInput => {
  return {
    name: place.name
  }
}

// APIs

const fetchPlaces = async (): Promise<Place[]> => {
  try {
    const response = await axios.get(ROUTES.API.PLACES);

    // Validate the paginated response
    const validatedResponse = PlacePageSchema.parse(response.data);
    return validatedResponse.results; // api has pagination
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error; // Re-throw to let components handle it
  }
};

const createPlace = async (placeInput: PlaceInput): Promise<Place> => {
  try {
    const validatedInput = PlaceWriteSchema.parse(placeInput);
    const response = await axios.post(ROUTES.API.PLACES, validatedInput);

    // Validate created PlaceEntity
    const place = PlaceReadSchema.parse(response.data);
    return place;
  } catch (error) {
    console.error("Error creating place:", error);
    throw error; // Re-throw to let components handle it
  }
}

const fetchPlace = async (id: number): Promise<Place> => {
  try {
    const response = await axios.get(ROUTES.API.PLACES_DETAIL(id));

    // Validate fetched PlaceEntity
    const place = PlaceReadSchema.parse(response.data);
    return place;
  } catch (error) {
    console.error("Error fetching place:", error);
    throw error; // Re-throw to let components handle it
  }
};

const updatePlace = async (placeInput: PlaceInput, id: number): Promise<Place> => {
  try {
    const validatedInput = PlaceWriteSchema.parse(placeInput);
    const response = await axios.put(ROUTES.API.PLACES_DETAIL(id), validatedInput);

    // Validate updated PlaceEntity
    const place = PlaceReadSchema.parse(response.data);
    return place;
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

export type { Place, PlaceInput };
export { getEmptyPlaceInput, toPlaceInput };
export { fetchPlaces, fetchPlace, createPlace, updatePlace, deletePlace };
