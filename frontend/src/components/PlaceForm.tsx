import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { createPlace, type Place } from "../api/placesApi";
import ButtonContainer from "./Buttons";

function PlaceForm() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    createPlace({ name } as Place)
      .then((response) => {
        console.log('Place created:', response);
      })
      .catch((error) => console.error("Error:", error));

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
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="flex-1 border-b border-neutral-500 focus:bg-lime-100 focus:border-emerald-800 focus:border-b-2 focus:outline-hidden"
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