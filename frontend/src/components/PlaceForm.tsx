import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import AppLink from "./AppLink";
import ButtonContainer from "./Buttons";
import {
  createPlace,
  getEmptyPlaceInput,
  toPlaceInput,
  updatePlace,
} from "../api/placesApi";
import type { Place, PlaceInput } from "../api/placesApi";
import { ROUTES } from "../routes";

interface PlaceFormProps {
  place?: Place;
  id?: number;
}

// only create a separate form interface if have add'l intermediate fields

function PlaceForm({ place, id }: PlaceFormProps = {}) {
  const navigate = useNavigate();
  const defaultData = place ? toPlaceInput(place) : getEmptyPlaceInput();
  const { register, handleSubmit } = useForm<PlaceInput>({
    defaultValues: defaultData,
  });

  const onSubmit: SubmitHandler<PlaceInput> = async (
    placeInput: PlaceInput,
  ) => {
    try {
      if (!id) {
        const response = await createPlace(placeInput);
        console.log("Place created:", response);
      } else {
        const response = await updatePlace(placeInput, id);
        console.log("Place updated:", response);
      }

      // After successful creation, navigate back
      navigate(ROUTES.FRONTEND.ROOT);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      action={ROUTES.FRONTEND.ROOT}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1"
    >
      <div className="place-attributes">
        <div className="place-attribute items-center">
          <label className="label">Name:</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input"
          />
        </div>
      </div>
      <ButtonContainer>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <AppLink to={ROUTES.FRONTEND.ROOT} className="btn btn-primary">
          Cancel
        </AppLink>
      </ButtonContainer>
    </form>
  );
}

export default PlaceForm;
