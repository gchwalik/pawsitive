import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { useParams } from "react-router";

import { toPlaceInput } from "../api/placesApi";
import type { PlaceInput } from "../api/placesApi";
import AppLink from "../components/AppLink";
import ButtonContainer from "../components/Buttons";
import Container from "../components/Container";
import PlaceNotFound from "../components/PlaceNotFound";
import { usePlace } from "../hooks/usePlace";
import { ROUTES } from "../routes";

import { Header } from "react-aria-components";

interface ViewPlaceFormProps {
  className?: string;
  placeId: number;
  reactForm: UseFormReturn<PlaceInput>;
}

function ViewPlaceForm({ className, placeId, reactForm }: ViewPlaceFormProps) {
  const { register } = reactForm;

  return (
    <form className={`form flex-1 ${className}`}>
      <div className="form-fields flex-1">
        <div className="form-attribute">
          <label className="label">Name:</label>
          <input
            {...register("name", { disabled: true })}
            className="border-none"
          />
        </div>
      </div>
      <ButtonContainer className="mb-5">
        <AppLink
          to={ROUTES.FRONTEND.PLACES_EDIT(placeId)}
          className="btn btn-primary"
        >
          Edit
        </AppLink>
        <AppLink
          to={ROUTES.FRONTEND.PLACES_DELETE(placeId)}
          className="btn btn-danger"
        >
          Delete
        </AppLink>
        <AppLink to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">
          Back
        </AppLink>
      </ButtonContainer>
    </form>
  );
}

function ViewPlace() {
  const { id: paramId } = useParams<{ id: string }>();
  const placeId = Number(paramId);
  const { place, loading, error } = usePlace(placeId);
  const reactForm = useForm<PlaceInput>();

  useEffect(() => {
    if (!loading && place) {
      reactForm.reset(toPlaceInput(place));
    }
  }, [place, loading, reactForm]);

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
            placeId={placeId}
            reactForm={reactForm}
          />
        )}
      </Container>
    </div>
  );
}

export default ViewPlace;
