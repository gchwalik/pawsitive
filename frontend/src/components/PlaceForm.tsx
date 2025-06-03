import { Link, useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from "react-hook-form";

import { createPlace, updatePlace, getEmptyPlace, toPlace } from "../api/placesApi";
import type { Place, PlaceEntity } from "../api/placesApi";
import ButtonContainer from "./Buttons";

interface PlaceFormProps {
  placeEntity?: PlaceEntity;
  id?: number;
}

// only create a separate form interface if have add'l intermediate fields

function PlaceForm( {placeEntity, id}: PlaceFormProps = {}) {
  const navigate = useNavigate();
  const defaultPlace = placeEntity ? toPlace(placeEntity) : getEmptyPlace();
  const {register, handleSubmit} = useForm<Place>({defaultValues: defaultPlace})

  const onSubmit: SubmitHandler<Place> = async (data: Place) => {
    try {
      if (!id) {
        const response = createPlace(data);
        console.log('Place created:', response);
      } else {
        const response = updatePlace(data, id);
        console.log('Place updated:', response);
      }

      // After successful creation, navigate back
      navigate('/');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form action="/places" method="post" onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
      <div className="place-attributes">
        <div className="place-attribute items-end">
          <label className="label leading-none">Name</label>
          <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input"
          />
        </div>
      </div>
      <ButtonContainer>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-primary">Cancel</Link>
        <Link to= className="btn btn-primary">Cancel</Link>
      </ButtonContainer>
    </form>
  )
}

export default PlaceForm;
