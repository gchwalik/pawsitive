import { MapPinIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Button,
  Dialog,
  Heading,
  Modal,
} from "react-aria-components";

import "../App.css";
import { type Place, deletePlace, fetchPlaces } from "../api/placesApi";
import AppLink from "../components/AppLink";
import ButtonContainer from "../components/Buttons";
import Container from "../components/Container";
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
      <AppLink
        to={ROUTES.FRONTEND.PLACES_CREATE}
        className="btn btn-dark inline-flex items-center gap-2 !w-auto"
      >
        <PlusIcon size={16} />
        Create First Place
      </AppLink>
    </div>
  </div>
);

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (place: Place) => void;
  place: Place | null;
}

const DeleteModal = ({
  place,
  isOpen,
  onClose,
  onConfirm,
}: DeleteModalProps) => {
  if (!isOpen || !place) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      isDismissable
      className="w-full max-w-md"
    >
      <Dialog
        role="alertdialog"
        className="bg-fuchsia-50 rounded-lg p-7 max-w-md"
      >
        <Heading
          slot="title"
          className="text-xxl font-semibold leading-6 mb-3 text-slate-700"
        >
          Delete place?
        </Heading>
        <div className="mb-6 flex flex-col gap-4">
          <div>
            <p className="text-gray-700 mb-1">
              Are you sure you want to delete:
            </p>
            <p className="font-medium">{place?.name}</p>
          </div>
          <p className="text-sm text-gray-600">This action cannot be undone.</p>
        </div>

        <ButtonContainer className="">
          <Button onPress={onClose} className="btn btn-primary">
            Cancel
          </Button>
          <Button onPress={() => onConfirm(place)} className="btn btn-danger">
            Delete
          </Button>
        </ButtonContainer>
      </Dialog>
    </Modal>
  );
};

interface PlaceItemProps {
  place: Place;
  onDelete: (place: Place) => void;
  iconSize: number;
}

const PlaceItem = ({ place, onDelete, iconSize }: PlaceItemProps) => (
  <div className="group relative btn-subtle">
    <AppLink
      to={ROUTES.FRONTEND.PLACES_VIEW(place.id)}
      aria-label={`View ${place.name}`}
      className="flex items-start p-4"
    >
      <div className="flex-1 mx-1 text-gray-800 truncate">{place.name}</div>
    </AppLink>

    <div className="absolute top-1/5 right-4 flex gap-1">
      <Button
        onPress={() => onDelete(place)}
        className="p-2 cursor-pointer text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg"
        aria-label={`Delete ${place.name}`}
      >
        <TrashIcon size={iconSize} />
      </Button>
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
    deletePlace(place.id);
    setReloadPlaces(true);
    setPlaceToDelete(null);
    setShowDeleteModal(false);
    return null;
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setPlaceToDelete(null);
  };

  return (
    <div className="flex justify-center">
      <Container className="bg-amber-50 rounded-lg m-5 pt-1 shadow-lg flex flex-col">
        <Heading className="text-center header bottom-border">Places</Heading>
        <div className="flex flex-col flex-1">
          {places.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                <AriaListBox aria-label="Places" className="flex flex-col">
                  {places.map((place) => (
                    <>
                      <AriaListBoxItem textValue={place.name}>
                        <PlaceItem
                          key={place.id}
                          place={place}
                          onDelete={openDeleteModal}
                          iconSize={iconSize}
                        />
                      </AriaListBoxItem>
                    </>
                  ))}
                </AriaListBox>
              </div>

              {/* Create Button - Only show when there are places */}
              <div className="border-t border-gray-200 mt-4">
                <AppLink
                  to={ROUTES.FRONTEND.PLACES_CREATE}
                  className="flex items-center font-medium btn-subtle justify-center gap-2 px-4 py-3 rounded-b-lg"
                >
                  <PlusIcon size={18} />
                  Add Another Place
                </AppLink>
              </div>
            </>
          )}
        </div>
      </Container>

      <DeleteModal
        isOpen={showDeleteModal}
        place={placeToDelete}
        onConfirm={confirmDelete}
        onClose={closeDeleteModal}
      />
    </div>
  );
}

export default PlacesList;
