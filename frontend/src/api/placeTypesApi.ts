import { z } from "zod";

// Schemas

const PlaceTypeSchema = z.object({
  name: z.string(),
  place_count: z.number()
})

const PlaceTypeEntitySchema = PlaceTypeSchema.extend({
  id: z.number(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
});

export { PlaceTypeSchema, PlaceTypeEntitySchema }
