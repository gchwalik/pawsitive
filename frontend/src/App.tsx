import { useState, useEffect } from "react";

import { fetchPlaces } from "./api/placesApi";
import type { Place } from "./api/placesApi";

import "./App.css";

function App() {
  const [places, setPlaces] = useState<Place[]>([]);
  useEffect(() => {
    fetchPlaces()
      .then((response) => {
        setPlaces(response);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      {places.map((place) => (
        <div key={place.id}>
          {" "}
          {/* Each item needs a unique key */}
          <p>{place.name}</p>
          {/* Render other place properties as needed */}
        </div>
      ))}
    </div>
  );
}

export default App;
