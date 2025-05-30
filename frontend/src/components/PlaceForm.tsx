import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { createPlace, updatePlace,  getEmptyPlace, toPlace, type Place, type PlaceEntity } from "../api/placesApi";
import ButtonContainer from "./Buttons";

interface PlaceFormProps {
  placeEntity?: PlaceEntity;
  id?: number;
}


function PlaceForm( {placeEntity, id}: PlaceFormProps = {}) {
  const navigate = useNavigate();

  const place = placeEntity ? toPlace(placeEntity) : getEmptyPlace();
  const [formPlace, setFormPlace] = useState<Place>(place);

  const handleInputChange = (field: keyof Place) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormPlace(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!id) {
      createPlace(formPlace)
        .then((response) => {
          console.log('Place created:', response);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      updatePlace(formPlace, id)
        .then((response) => {
          console.log('Place created:', response);
        })
        .catch((error) => console.error("Error:", error));
    }

    // After successful creation, navigate back
    navigate('/');
  };

  return (
    <form action="/places" method="post" onSubmit={handleSubmit} className="flex flex-col flex-1">
      <div className="place-attributes">
        <div className="place-attribute items-end">
          <label className="label leading-none">Name</label>
          <input
              type="text"
              name="name"
              value={formPlace.name}
              onChange={handleInputChange("name")}
              className="input"
              required
          />
        </div>
      </div>
      <ButtonContainer>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-primary">Cancel</Link>
      </ButtonContainer>
    </form>
  )
}

export default PlaceForm;