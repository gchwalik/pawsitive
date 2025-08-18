import { useState, useEffect } from "react";
import { Link } from "react-router";

import { TrashIcon, MapPinIcon, PlusIcon } from '@phosphor-icons/react';

import { fetchPlaces, type Place } from "../api/placesApi";
import Header from "../components/Header";
import Container from "../components/Container";

import { ROUTES } from "../routes";

import "../App.css";

const EmptyState = () => (
    <div className="flex items-center justify-center text-center h-4/5">
        <div>
          <div className="text-gray-400 mb-4">
              <MapPinIcon size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No places yet!</h3>
          <p className="text-sm text-gray-600 mb-6">Add your first spot to get started</p>
          <Link 
          to={ROUTES.FRONTEND.PLACES_CREATE}
          className="btn btn-dark inline-flex items-center gap-2 !w-auto "
          >
              <PlusIcon size={16} />
              Create First Place
          </Link>
      </div>
    </div>
);


interface PlaceItemProps {
  place: Place;
  iconSize: number;
}

const PlaceItem = ({ place, iconSize }: PlaceItemProps) => (
    <Link to={ROUTES.FRONTEND.PLACES_VIEW(place.id)}          
      aria-label={`View ${place.name}`}
      title="View place"
      className="group flex justify-between items-center hover:bg-lime-200 hover:text-lime-900 px-4 py-2 transition-colors duration-200"
    >
      <div className="mx-1 text-gray-800 truncate">{place.name}</div>

      <div className="flex gap-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
        <Link 
          to={ROUTES.FRONTEND.PLACES_DELETE(place.id)} 
          className="p-2 text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors duration-200" 
          aria-label={`Delete ${place.name}`}
          title="Delete place"
        >
          <TrashIcon size={iconSize} />
        </Link>
      </div>
    </Link>
);


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
        <Container title="Places" showTitleBorder={true}>
            {places.length === 0 ? (
                <EmptyState />
              ) : (
              <>
                {/* Places List */}
                <div className="flex-1 overflow-y-auto">
                    <ul className="flex flex-col gap-1">
                    {places.map((place) => (
                        <>
                          <PlaceItem key={place.id} place={place} iconSize={iconSize} />
                        </>
                    ))}
                    </ul>
                </div>

                {/* Create Button - Only show when there are places */}
                <div className="border-t border-gray-200 mt-4">
                  <Link 
                  to={ROUTES.FRONTEND.PLACES_CREATE} 
                  className="flex items-center font-medium btn-subtle justify-center gap-2 px-4 py-3 rounded-b-lg"
                  >
                  <PlusIcon size={18} />
                  Add Another Place
                  </Link>
                </div>
              </>
            )
          }
        </Container>
      </div>
    </>
  );
}

export default PlacesList