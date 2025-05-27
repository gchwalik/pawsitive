import { useState, useEffect } from "react";
import { Link } from "react-router";

import { EyeIcon, TrashIcon, PencilSimpleIcon, PlusIcon } from '@phosphor-icons/react';

import { fetchPlaces } from "../api/placesApi";
import type { Place } from "../api/placesApi";
import Header from "../components/Header";

import "../App.css";

function PlacesList() {
  const [places, setPlaces] = useState<Place[]>([]);
  const iconSize = 20;

  useEffect(() => {
    fetchPlaces()
      .then((response) => {
        setPlaces(response);
      })
      .catch((error) => console.error("Error:", error));
  }, []);


  return (
    <>
      <Header />
      {/* Main Content */}
      <div className="flex justify-center">

        {/* Table */}
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mt-5 bg-fuchsia-50 pt-1 rounded-lg">

          {/* Title */}
          <h2 className="text-center text-xl font-medium p-2 border-b-1 border-neutral-500">Places</h2>

          {/* Places List */}
          <ul className="flex flex-col">
            {places.length === 0 ? (
              <div className="py-12 text-center text-gray-600">
                <p className="text-lg">No places yet!</p>
                <p className="text-sm">Add a spot to get started</p>
              </div>
            ) : (
            places.map((place) =>
              <li key={place.id} className="flex justify-between items-center hover:bg-fuchsia-100 px-4 py-2">
                <div className="mx-1">{place.name}</div>
                <div className="flex gap-2"> {/* buttons */}
                  <a href="" className="p-1 text-blue-500 hover:bg-cyan-100 rounded-xl" aria-label="View">
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
            )
            )}

            {/* Add New Button */}
            <li className="border-t border-gray-200">
              <Link to="/create" className="flex items-center justify-center gap-2 rounded-b-lg text-indigo-800 hover:bg-indigo-100 px-3 py-3 font-medium">
                <PlusIcon size={18} />
                Create New Place
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default PlacesList;
