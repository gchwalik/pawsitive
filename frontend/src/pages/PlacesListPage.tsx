import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

import { TrashIcon, MapPinIcon, PlusIcon, PenIcon } from '@phosphor-icons/react';

import { fetchPlaces, type Place } from "../api/placesApi";
import Navbar from "../components/Navbar";
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
          className="btn btn-dark inline-flex items-center gap-2 !w-auto"
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
  <div className="group relative btn-subtle">
    <Link 
      to={ROUTES.FRONTEND.PLACES_VIEW(place.id)}          
      aria-label={`View ${place.name}`}
      title="View place"
      className="flex items-start p-4"
    >
      <div className="flex-1 mx-1 text-gray-800 truncate">{place.name}</div>
    </Link>

    <div className="absolute top-1/5 right-4 flex gap-1">
      <button 
        onClick={() => ""}
        className="p-2 cursor-pointer text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors duration-200" 
        aria-label={`Delete ${place.name}`}
        title="Delete place"
      >
        <TrashIcon size={iconSize} />
      </button>
    </div>
  </div>
);


// Alternative version using Link for edit button too
const PlaceItem2 = ({ place }: PlaceItemProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Deleting place: ${place.name}`);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  const handleLinkClick = (e) => {
    // Prevent the main link from being triggered when clicking action buttons
    e.stopPropagation();
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg hover:bg-lime-50 hover:border-lime-300 transition-all duration-200">
      {/* Main clickable area using Link */}
      <Link 
        to={`/places/${place.id}`}
        className="flex items-start p-4"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {place.name}
          </h3>
        </div>
      </Link>

      {/* Actions positioned absolutely */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">       
        {!showDeleteConfirm ? (
          <button
            onClick={handleDeleteClick}
            className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors duration-200 bg-white border border-gray-200 shadow-sm"
            title="Delete place"
            aria-label={`Delete ${place.name}`}
          >
            <TrashIcon size={16} />
          </button>
        ) : (
          <div className="flex items-center gap-1 bg-white border border-rose-300 rounded-lg p-1 shadow-lg">
            <span className="text-xs text-rose-700 px-2">Delete?</span>
            <button
              onClick={handleConfirmDelete}
              className="px-2 py-1 text-xs bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={handleCancelDelete}
              className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
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
      <Navbar />
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

export default PlacesList;
