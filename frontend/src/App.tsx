import { useState, useEffect } from "react";

import { EyeIcon, TrashIcon, PencilIcon } from '@phosphor-icons/react';

import { fetchPlaces } from "./api/placesApi";
import type { Place } from "./api/placesApi";

import "./App.css";

function App() {
  const [places, setPlaces] = useState<Place[]>([]);
  const iconSize = 18;

  useEffect(() => {
    fetchPlaces()
      .then((response) => {
        setPlaces(response);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleView = (id: number) => console.log('View:', id);
  const handleEdit = (id: number) => console.log('Edit:', id);
  const handleDelete = (id: number) => console.log('Delete:', id);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Places</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {places.map((place) => (
            <li key={place.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
              <span className="text-gray-500 font-small mr-20">{place.name}</span>
              <div className="flex space-x-1">
                <button 
                  onClick={() => handleView(place.id)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
                  aria-label={`View ${place.name}`}
                >
                  <EyeIcon size={iconSize} />
                </button>
                <button 
                  onClick={() => handleEdit(place.id)}
                  className="p-2 text-green-600 hover:bg-green-100 rounded-xl transition-colors"
                  aria-label={`Edit ${place.name}`}
                >
                  <PencilIcon size={iconSize} />
                </button>
                <button 
                  onClick={() => handleDelete(place.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                  aria-label={`Delete ${place.name}`}
                >
                  <TrashIcon size={iconSize} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
