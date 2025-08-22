import { MapPinIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import "../App.css";
import { type Place, deletePlace, fetchPlaces } from "../api/placesApi";
import ButtonContainer from "../components/Buttons";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { ROUTES } from "../routes";

const EmptyState = () => (
  <div className="flex items-center justify-center text-center h-4/5">
    <div>
      <div className="text-gray-400 mb-4">
        <MapPinIcon size={48} className="mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No places yet!</h3>
      <p className="text-sm text-gray-600 mb-6">
        Add your first spot to get started
      </p>
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

interface DeleteModalProps {
  place: Place | null;
  onConfirm: (place: Place) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const DeleteModal = ({
  place,
  isOpen,
  onConfirm,
  onCancel,
}: DeleteModalProps) => {
  if (!isOpen || !place) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 p-4 flex items-center justify-center">
      <div className="bg-fuchsia-50 rounded-lg p-7 w-full max-w-md">
        <div className="mb-6 flex flex-col gap-4">
          <div>
            <p className="text-gray-700 mb-1">
              Are you sure you want to delete:
            </p>
            <p className="font-medium">{place.name}</p>
          </div>
          <p className="text-sm text-gray-600">This action cannot be undone.</p>
        </div>

        <ButtonContainer>
          <button onClick={onCancel} className="btn btn-primary">
            Cancel
          </button>
          <button onClick={() => onConfirm(place)} className="btn btn-danger">
            Delete
          </button>
        </ButtonContainer>
      </div>
    </div>
  );
};

interface PlaceItemProps {
  place: Place;
  onDelete: (place: Place) => void;
  iconSize: number;
}

const PlaceItem = ({ place, onDelete, iconSize }: PlaceItemProps) => (
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
        onClick={() => onDelete(place)}
        className="p-2 cursor-pointer text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors duration-200"
        aria-label={`Delete ${place.name}`}
        title="Delete place"
      >
        <TrashIcon size={iconSize} />
      </button>
    </div>
  </div>
);

function PlacesList() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [reloadPlaces, setReloadPlaces] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState<Place | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const iconSize = 20;

  useEffect(() => {
    fetchPlaces()
      .then((response) => {
        setPlaces(response);
      })
      .catch((error) => console.error("Error:", error));

    setReloadPlaces(false);
  }, [reloadPlaces]);

  const openDeleteModal = (place: Place) => {
    setShowDeleteModal(true);
    setPlaceToDelete(place);
  };

  const confirmDelete = (place: Place) => {
    console.log(place.name);
    deletePlace(place.id);
    setReloadPlaces(true);
    setPlaceToDelete(null);
    setShowDeleteModal(false);
    return null;
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPlaceToDelete(null);
  };

  return (
    <>
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
                    <PlaceItem
                      key={place.id}
                      place={place}
                      onDelete={openDeleteModal}
                      iconSize={iconSize}
                    />
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
        )}
      </Container>

      <DeleteModal
        isOpen={showDeleteModal}
        place={placeToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}

export default PlacesList;
