# Data Model Version Notes 

This doc contains notes about the data model versions, to provide more context to the different classes/etc.

## Versions

### `alpha_v1`

This is the cleaned up data model for the core functionality of the alpha version. 

Some notes include:
- Added `Location` table, to break out the address for `Place`. We'll eventually add latitude-longitude and geospatial stuff. Rather than in-lining, broke this table out to Location, as eventually it would be nice to tag an Amenity/Hazard/etc with a Location as well.
- I switched from draw.io to excalidraw, because excalidraw lets you attach lines and text to a box making adjusting elements on the model dramatically simplier.
- The model doesn't include join tables, but rather has `list` type attributes, as this is how they're defined in Django models. Similarly, I have updated the tables so that the attributes are defined on the correct table (ex: PlaceDetails.for_place instead of Place.has_details, etc)
- I removed the `Holiday` table, as it's not relevant to the core functionality alpha version.
- Tables `Amenity`, `Hazard`, and `Wildlife`, are all simple object tables, with just a name field
  -  `Hazard` table `type` field is removed, as how we choose to handle short- vs long-term hazards needs a little more research. That robustness isn't necessary for the raw alpha version, and isn't a huge lift to add in later on
- `PlaceDetail` for the alpha version will be basically 1-1 with `Place`. Rather than combining the tables in this version I'm keeping them distinct, as we'll want them separate for when we add in user account classes later on
- `Visit` `est_count` fields got split out to `min` and `max` for data model clarity. ex: `Visit.est_people_count: list[int]` -> `Visit.est_people_min` and `Visit.est_people_max`, where max is optional. This allows for this to be an optional range, can input 3 people, or 3-6 people. Where at least some value is required, even though the range is not.

### `original_draft`

This is my first pass data model for the simple alpha version, not including any stretch features as mentioned in the [PRD](./prd.md).

It doesn't include a user class yet, but the user will be linked likely to `Visit` and `PlaceDetails`, among other new classes.

Notes about the different classes:
- `Place` does not yet have address or geocoordinates - this is an important feature to sketch out soon. I'm not sure why I overlooked it
- `PlaceType` - can be values like: hiking trail, office park, neighborhood park, etc
- `PlaceDetails` - these should be notes about relatively permanent features for the given place
  - `Amenities` - can include values like: free poop bags, bathroom, trash can, bench, etc
  - `Hazard` - can include values like: poison oak, foxtails, etc
- `Visit` - these should be notes about a single time-based visit to a place. Like "I went to this park on Saturday at 10am, and here are notes about my visit"
  - the time visited doesn't have to be a range. **an** approximate time is required, but you don't actually have to include a range if you don't want to
  - estimated people, dogs, children counts - this is just to track how popular/crowed the place is. these are to help identify a pattern over time
    - yes i know children isn't a count rn
    - whether or not off leash dogs were there is the main thing, according to my friend, because the number can vary, it's just important to know whether you can run into them
  - `Wildlife` - this is an indicator of potential enrichment, and also potential triggers to avoid. Seeing a snake could be cool, but if you have a high prey drive dog, you might want to avoid places with squirrels, etc
    - perhaps should be a different name, as I once took my pup on a hike that had cows
  - `Holiday` - this is just to aggregate traffic for holidays, it's technically not part of the simple alpha, but I had it in the diagram
  - `Hazard` - temporary features, like human poop, litter, etc
- `Hazard` has a type attribute on it for `general` or `temporary` (workshop these attribute names), to indicate whether it belongs attached to `PlaceDetails` or `Visit`
