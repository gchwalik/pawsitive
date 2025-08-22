import { Link, useNavigate, useParams } from "react-router";

import { deletePlace } from "../api/placesApi";
import type { Place } from "../api/placesApi";
import ButtonContainer from "../components/Buttons";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import PlaceNotFound from "../components/PlaceNotFound";
import { usePlace } from "../hooks/usePlace";
import { ROUTES } from "../routes";

interface DeletePlaceFormProps {
  place: Place;
  onSubmit: (id: number) => void;
}

function DeletePlaceForm({ place, onSubmit }: DeletePlaceFormProps) {
  return (
    <>
      <div className="form-attributes">
        <div className="form-attribute">
          <label className="label">Name:</label>
          <div className="flex-1">{place.name}</div>
        </div>
      </div>

      <p className="font-medium text-center pb-4 text-rose-800">
        Are you sure you want to delete {`${place.name}`}?
      </p>
      <ButtonContainer>
        <button onClick={() => onSubmit(place.id)} className="btn btn-danger">
          Yes
        </button>
        <Link to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">
          Back
        </Link>
      </ButtonContainer>
    </>
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
    <>
      <Navbar />
      <div className="flex justify-center">
        <Container title="Delete Place" className="p-5">
          {loading ? (
            <div className="flex justify-center items-center flex-1">
              Loading...
            </div>
          ) : !place || isNaN(placeId) ? (
            <PlaceNotFound error={error} />
          ) : (
            <DeletePlaceForm place={place} onSubmit={handleDelete} />
          )}
        </Container>
      </div>
    </>
  );
}

export default DeletePlace;
