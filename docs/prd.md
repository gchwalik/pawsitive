# PRD for Pawsitive
(sorry much of this is ai) (also i have done like zero user research)

## Problem Statement

Owners of reactive dogs often struggle with stressful, unpredictable walks due to their dogs’ strong reactions to common triggers such as other dogs, people, or noises. This can make outings unpleasant, sometimes causing owners to limit or skip walks entirely, depriving dogs of exercise and stimulation while leaving owners feeling isolated and discouraged.

## Opportunity 

Pawsitive allows owners, trainers, and dog walkers to log detailed observations about outings—including factors like location, time of day, number of dogs or children present, off-leash activity, and environmental hazards. 

The platform aggregates and analyzes these notes, enabling users to filter by their dog’s sensitivities, preferred travel radius, and ideal conditions, and then receive recommendations for calm, low-stress locations. By accounting for time-dependent variations in triggers (e.g., school schedules, park crowding), Pawsitive helps owners confidently plan outings that are safe, enjoyable, and stress-free for both dog and owner.

## Users 

The primary users of Pawsitive will be owners of reactive dogs. Other potential users include dog walkers looking for suitable locations for their clients and trainers seeking safe public spaces for training. 

Since dog owners represent the largest user group, Pawsitive will initially focus on creating an optimal experience for dog owners.

I'm targeting users in the San Francisco Bay Area as we get started.

## Alpha Functional Requirements

### Core Functionality
- the ability for users to log time-dependent notes about locations
- the ability to search and filter locations for various triggers, hazards, amenities, etc
  - note that the basic search will not include geospatial filtering

### Nice-to-have but not-required features 
- user accounts, linking users to their logged notes, etc
- geospatial filtering of search results, including location and desired radius

## Beta Functional Requirements 

Relying on only user-input data will lead to limited usability in the beginning. To seed the database, we will scrape reviews from AllTrails, filtering for keywords that fit our location criteria. 
- note that AllTrails doesn't have public apis, which is why we have to scrape

### Core Functionality  
- user accounts if not already implemented 
- user-submitted notes are linked to their account
  - users can view, edit, delete their logged notes about different locations
- when searching, users can see all submitted notes about different locations, not just general details about the location
- spike out how to aggregate user-submitted notes for search recommendations, with focus on time-dependent notes. may require ML, OLAP db, LLMs, etc
  - basic time filtering should consider time-of-day and day-of-week
    - ex: "Wed at 10am this park does not have filtered triggers"
  - set up basic infrastructure for this, does not need to be full-fledged functionality
  
### Nice-to-have but not-required features
- an LLM-generated summary blurb about each location
- users can create dogs saving default search criteria for that dog 
  - "find recommendations for Fido"
- stretch time-filtering: 
  - holidays, ex: Christmas might be exceptionally dead, Easter might be exceptionally crowded
  - seasons, some parks will be more popular in June vs January 
- seed database further with Google review data, which does provide an api:
  - https://developers.google.com/my-business/content/review-data#list_all_reviews

## MVP Functional Requirements 

TODO: Improve notes 

### Dream Features

- users can log in and see recommendations for their configured dogs and desired criteria
  - ex: To walk Fido right now within a 5 mile radius of [location] we recommend the following:
    - location 1 with small blurb
    - location 2 with small blurb
- allow filtering based on drive time
  - ex: I don't want to drive more than 30 minutes, what's available?
- calendar integration, user has Fido, etc configured for a recurring walk time - a week, a day prior (not created with longer lead time) will create a calendar event with the recommended locations based on their configurations 
  - has short lead time to include most recent aggregated notes
- if explodes in popularity, a calendar booking thing for different locations, so owners can give a heads up when they're going to go, so they don't bump into each other with their reactive pups 
- visual interactive map functionality, where users can indicate which part of the hiking trail they did, pin locations of trash cans, foxtails, etc
  - not just search by text, but can search by map as well 

### Dream Dream Features 
- free dog toy/puzzle/treat exchange events
  - like a clothing swap, but for dog toys
  - dogs get bored of their toys and puzzles, but new ones are expensive 
  - some treats are just not a hit with a pup, or they can't have them anymore due to diet restrictions
- setting up play dates. examples:
  - some small dogs are scared of big dogs, but can be friends with other small dogs
  - my pup is big and high energy, so she typically gets along best with other larger and younger pups. older dogs tend to prefer their space
  - tips about how to have a successful play date 
    - I'd need to talk to my friend who works with dogs professionally, but generally dogs don't actually love playing in giant groups, and keeping an eye on dog body language, etc, can make for much more successful play dates
- references to R+ (positive reinforcement) training resources
- list of R+ trainers and dog walkers

## Reference Links

- https://lamport.azurewebsites.net/pubs/state-the-problem.pdf
