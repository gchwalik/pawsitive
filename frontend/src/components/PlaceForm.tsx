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
    <form action="/places" method="post" onSubmit={handleSubmit}>
      <div className="flex items-center gap-4 mb-4 max-w-md mx-auto">
        <label className="w-10 text-right">Name</label>
        <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="flex-1  p-1 border border-neutral-400 rounded-lg focus:ring focus:ring-indigo-800"
            required
        />
      </div>
      <ButtonContainer>
        <button type="submit" className="btn">Submit</button>
        <Link to="/" className="btn">Cancel</Link>
      </ButtonContainer>
    </form>
  )
}

export default PlaceForm;