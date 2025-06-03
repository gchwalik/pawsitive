import { useState, useEffect } from "react";
import { Link } from "react-router";

import { EyeIcon, TrashIcon, PencilSimpleIcon, PlusIcon } from '@phosphor-icons/react';

import { fetchPlaces, type PlaceEntity } from "../api/placesApi";
import Header from "../components/Header";
import Container from "../components/Container";

import { ROUTES } from "../routes";

import "../App.css";

function PlacesList() {
  const [places, setPlaces] = useState<PlaceEntity[]>([]);
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
        <Container title="Places" showTitleBorder={true}>
          {/* Places List */}
          <ul className="flex flex-col">
            {places.length === 0 ? (
              <div className="py-12 text-center text-gray-600">
                <p className="text-lg">No places yet!</p>
                <p className="text-sm">Add a spot to get started</p>
              </div>
            ) : (
            places.map((place) =>
              <li key={place.id} className="flex justify-between items-center hover:bg-lime-100 px-4 py-2">
                <div className="mx-1">{place.name}</div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Link to={ROUTES.FRONTEND.PLACES_VIEW(place.id)} className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-cyan-50 rounded-lg" aria-label="View">
                    <EyeIcon size={iconSize} />
                  </Link>
                  <Link to={ROUTES.FRONTEND.PLACES_EDIT(place.id)} className="p-1 text-emerald-600 hover:text-emerald-700 hover:bg-lime-50 rounded-lg" aria-label="Edit">
                    <PencilSimpleIcon size={iconSize} />
                  </Link>
                  <Link to={ROUTES.FRONTEND.PLACES_DELETE(place.id)} className="p-1 text-rose-700 hover:text-rose-800 hover:bg-fuchsia-50 rounded-lg" aria-label="Delete">
                    <TrashIcon size={iconSize}/>
                  </Link>
                </div>

              </li>
            )
            )}
          </ul>
          <div className="border-t border-gray-200 mt-auto">
              <Link to={ROUTES.FRONTEND.PLACES_CREATE} className="flex items-center justify-center gap-2 rounded-b-lg text-emerald-800 hover:bg-lime-100 px-3 py-3 font-medium">
                <PlusIcon size={18} />
                Create New Place
              </Link>
          </div>
        
        </Container>
      </div>
    </>
  );
}

export default PlacesList;
