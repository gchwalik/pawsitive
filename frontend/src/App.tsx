import { useState, useEffect } from "react";

import { EyeIcon, TrashIcon, PencilSimpleIcon, PlusIcon } from '@phosphor-icons/react';

import { fetchPlaces } from "./api/placesApi";
import type { Place } from "./api/placesApi";

import "./App.css";

function App() {
  const [places, setPlaces] = useState<Place[]>([]);
  const iconSize = 22;

  useEffect(() => {
    fetchPlaces()
      .then((response) => {
        setPlaces(response);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-medium text-nowrap py-4">Pawsitive Places</h1>
      <div className="flex justify-center"> {/* content container */}
        <div className="w-full md:w-2/3 lg:w-1/2 mt-5 bg-gray-50 pt-1 rounded-lg"> {/* table container */}
          <h2 className="text-center text-xl font-medium p-2 border-b-1 border-stone-500">Places</h2>
          <ul className="flex flex-col">
            {places.map((place) => 
              <li key={place.id} className="flex justify-between items-center hover:bg-gray-200 px-3 py-1">
                <div className="mx-1">{place.name}</div>
                <div className="flex gap-2"> {/* buttons */}
                  <a href="" className="p-1 text-blue-600 hover:bg-blue-100 rounded-xl" aria-label="View">
                    <EyeIcon size={iconSize} />
                  </a>
                  <a href="" className="p-1 text-green-600 hover:bg-green-100 rounded-xl" aria-label="Edit">
                    <PencilSimpleIcon size={iconSize} />
                  </a>
                  <a href="" className="p-1 text-red-600 hover:bg-red-200 rounded-xl" aria-label="Delete">
                    <TrashIcon size={iconSize}/>
                  </a>
                </div>
              </li>
            )}
            {/* <a href="" className="bg-blue-300 w-1"><PlusIcon/>Create new</a> */}
          </ul>

        </div>
      </div>

    {/* <div className="p-6 w-full mx-auto">
      <div className="mx-auto max-w-4xl flex justify-center">
        <div className="bg-white rounded-lg overflow-hidden basis-1/2">  
          <ul>
            {places.map((place) => (
              <li key={place.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
               
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>  
    </div> */}
    </>
  );
}

export default App;
