import { z } from "zod";

// Schemas

const PlaceTypeBaseSchema = z.object({
  name: z.string(),
})

// For write operations: create/update
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PlaceTypeWriteSchema = PlaceTypeBaseSchema.extend({
  // Add any additional fields needed for write operations here
})

// For read operations: fetch
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PlaceTypeReadSchema = PlaceTypeBaseSchema.extend({
  id: z.number(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
});

const PlaceTypeMinimalSchema = z.object({
  id: z.number(),
  name: z.string()
})

// Types

type PlaceType = z.infer<typeof PlaceTypeReadSchema>;
type PlaceTypeInput = z.infer<typeof PlaceTypeWriteSchema>;

export type { PlaceType, PlaceTypeInput };
export { PlaceTypeMinimalSchema };

