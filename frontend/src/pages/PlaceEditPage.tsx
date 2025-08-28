import { useEffect } from "react";
import {
  type SubmitHandler,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import { useNavigate, useParams } from "react-router";

import type { PlaceInput } from "../api/placesApi";
import { toPlaceInput, updatePlace } from "../api/placesApi";
import ButtonContainer from "../components/Buttons";
import Container from "../components/Container";
import PlaceNotFound from "../components/PlaceNotFound";
import { usePlace } from "../hooks/usePlace";
import { ROUTES } from "../routes";

import AppLink from "../components/AppLink";

interface EditPlaceFormProps {
  placeId: number;
  onSubmit: SubmitHandler<PlaceInput>;
  reactForm: UseFormReturn<PlaceInput>;
}

function EditPlaceForm({ placeId, onSubmit, reactForm }: EditPlaceFormProps) {
  const { register, handleSubmit } = reactForm;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-attributes">
      <div className="form-attribute">
        <label className="label">Name:</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="input"
          placeholder="Enter place name"
        />
      </div>

      <ButtonContainer>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <AppLink
          to={ROUTES.FRONTEND.PLACES_DELETE(placeId)}
          className="btn btn-danger"
        >
          Delete
        </AppLink>
        <AppLink to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">
          Cancel
        </AppLink>
      </ButtonContainer>
    </form>
  );
}

function EditPlace() {
  const { id: paramId } = useParams<{ id: string }>();
  const placeId = Number(paramId);
  const { place, loading, error } = usePlace(placeId);
  const reactForm = useForm<PlaceInput>();

  useEffect(() => {
    if (!loading && place) {
      reactForm.reset(toPlaceInput(place));
    }
  }, [loading, place, reactForm]);

  const navigate = useNavigate();
  const handleUpdate: SubmitHandler<PlaceInput> = async (
    placeInput: PlaceInput,
  ) => {
    try {
      const response = await updatePlace(placeInput, placeId);
      console.log("Place updated successfully:", response);
      // After successful creation, navigate back
      navigate(ROUTES.FRONTEND.ROOT);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container title="Edit Place" className="p-5">
      {loading ? (
        <div className="flex justify-center items-center flex-1">
          Loading...
        </div>
      ) : !place || isNaN(placeId) ? (
        <PlaceNotFound error={error} />
      ) : (
        <EditPlaceForm
          placeId={place.id}
          onSubmit={handleUpdate}
          reactForm={reactForm}
        />
      )}
    </Container>
  );
}

export default EditPlace;
