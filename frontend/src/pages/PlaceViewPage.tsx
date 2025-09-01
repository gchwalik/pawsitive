import { useParams } from "react-router";

import type { Place } from "../api/placesApi";
import AppLink from "../components/AppLink";
import ButtonContainer from "../components/Buttons";
import Container from "../components/Container";
import PlaceNotFound from "../components/PlaceNotFound";
import { usePlace } from "../hooks/usePlace";
import { ROUTES } from "../routes";

import { Header } from "react-aria-components";

interface ViewPlaceFormProps {
  className?: string;
  place: Place;
}

function ViewPlaceForm({ className, place }: ViewPlaceFormProps) {
  return (
    <div className={`form flex-1 ${className}`}>
      <div className="form-fields flex-1">
        <div className="form-attribute">
          <div className="label">Name:</div>
          <div className="flex-1">{place.name}</div>
        </div>
      </div>
      <ButtonContainer className="mb-5">
        <AppLink
          to={ROUTES.FRONTEND.PLACES_EDIT(place.id)}
          className="btn btn-primary"
        >
          Edit
        </AppLink>
        <AppLink
          to={ROUTES.FRONTEND.PLACES_DELETE(place.id)}
          className="btn btn-danger"
        >
          Delete
        </AppLink>
        <AppLink to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">
          Back
        </AppLink>
      </ButtonContainer>
    </div>
  );
}

function ViewPlace() {
  const { id: paramId } = useParams<{ id: string }>();
  const placeId = Number(paramId);
  const { place, loading, error } = usePlace(placeId);

  return (
    <div className="flex justify-center">
      <Container className="bg-amber-50 rounded-lg m-5 pt-1 shadow-lg flex flex-col">
        <Header className="text-center header">View Place</Header>
        {loading ? (
          <div className="flex justify-center items-center flex-1">
            Loading...
          </div>
        ) : !place ? (
          <PlaceNotFound error={error} />
        ) : (
          <ViewPlaceForm
            className="px-10 pt-2"
            place={place}
          />
        )}
      </Container>
    </div>
  );
}

export default ViewPlace;
