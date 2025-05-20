import { useState, useEffect } from "react";

import { List, ListItem, ListItemText } from '@mui/material';
import { IconButton } from '@mui/material';
import { EyeIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';

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

  const iconSize = 24;

  return (
    <List>
      {places.map((place) => (
        <ListItem key={place.id} divider>
          <ListItemText primary={place.name} />
            <IconButton edge="end" aria-label="view">
              <EyeIcon size={iconSize}/>
            </IconButton>
            <IconButton edge="end" aria-label="edit">
              <PencilSimpleIcon size={iconSize} />
            </IconButton>
            <IconButton edge="end" aria-label="delete">
              <TrashIcon size={iconSize}  />
            </IconButton>
        </ListItem>
      ))}
    </List>
  );
}

export default App;
