import { useNavigate, useParams } from "react-router";

import { Header } from "react-aria-components";

import { deletePlace } from "../api/placesApi";
import type { Place } from "../api/placesApi";
import AppLink from "../components/AppLink";
import ButtonContainer from "../components/Buttons";
import Container from "../components/Container";
import PlaceNotFound from "../components/PlaceNotFound";
import { usePlace } from "../hooks/usePlace";
import { ROUTES } from "../routes";

interface DeletePlaceFormProps {
  className?: string;
  place: Place;
  onSubmit: (id: number) => void;
}

function DeletePlaceForm({
  className = "",
  place,
  onSubmit,
}: DeletePlaceFormProps) {
  return (
    <div className={`form flex-1 ${className}`}>
      <div className="form-fields flex-1">
        <div className="form-attribute">
          <label className="label">Name:</label>
          <div className="flex-1">{place.name}</div>
        </div>
      </div>

      <p className="font-medium text-center pb-4 text-rose-800">
        Are you sure you want to delete {`${place.name}`}?
      </p>
      <ButtonContainer className="mb-5">
        <button onClick={() => onSubmit(place.id)} className="btn btn-danger">
          Yes
        </button>
        <AppLink to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">
          Back
        </AppLink>
      </ButtonContainer>
    </div>
  );
}

function DeletePlace() {
  const { id: paramId } = useParams<{ id: string }>();
  const placeId = Number(paramId);
  const { place, loading, error } = usePlace(placeId);

  const navigate = useNavigate();

  const handleDelete = async (placeId: number) => {
    try {
      await deletePlace(placeId);
      console.log("Place deleted:", place);
      navigate(ROUTES.FRONTEND.ROOT); // Go back to list
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <Container className="bg-amber-50 rounded-lg m-5 pt-1 shadow-lg flex flex-col">
        <Header className="text-center header">Delete Place</Header>
        {loading ? (
          <div className="flex justify-center items-center flex-1">
            Loading...
          </div>
        ) : !place || isNaN(placeId) ? (
          <PlaceNotFound error={error} />
        ) : (
          <DeletePlaceForm
            className="px-10 pt-2"
            place={place}
            onSubmit={handleDelete}
          />
        )}
      </Container>
    </div>
  );
}

export default DeletePlace;
