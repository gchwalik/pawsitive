# Pawsitive Documentation 

This folder contains all the docs about design decisions, the prd, versions of the data models, etc. 

## Tools 

- [draw.io](https://app.diagrams.net/) to generate/edit any visual diagrams, such as data models, application architecture, etc

## Data Models 

Right now versioned data models are in `/docs/data_models`.

The `.drawio` file can be imported into draw.io for editing/etc, and the `.jpg` is included for easy viewing outside of that tool.

### Versions

#### `simple_alpha_v1`

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
