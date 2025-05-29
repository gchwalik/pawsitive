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
      <div className="px-10 pt-2 pb-8 flex flex-col gap-3 flex-1">
        <div className="flex items-end justify-items-end gap-4">
          <label className="w-12 text-right leading-none">Name</label>
          <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="flex-1 border-b border-neutral-500 focus:bg-fuchsia-100 focus:border-indigo-700 focus:border-b-2 focus:outline-hidden"
              required
          />
        </div>
      </div>
      <ButtonContainer>
        <button type="submit" className="btn">Submit</button>
        <Link to="/" className="btn">Cancel</Link>
      </ButtonContainer>
    </form>
  )
}

export default PlaceForm;