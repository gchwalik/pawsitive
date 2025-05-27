import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { createPlace, type Place } from "../api/placesApi";

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
        <div className="flex items-center gap-4 mb-4">
        <label className="w-10 text-right">Name</label>
        <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="flex-1 my-2 p-1 border border-neutral-500 rounded-lg focus:ring focus:ring-indigo-800"
            required
        />
        </div>
        <div className="flex justify-center items-center gap-4">
            <button type="submit" className="w-24 rounded-lg  text-indigo-800 bg-indigo-100 hover:bg-indigo-200 px-3 py-2 font-medium">
                Submit
            </button>
            <Link to="/" className="w-24 rounded-lg text-center text-indigo-800 bg-indigo-100 hover:bg-indigo-200 px-3 py-2 font-medium">Cancel</Link>
        </div>
    </form>
  )
}

export default PlaceForm;