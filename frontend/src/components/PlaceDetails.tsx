import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { fetchPlace as getPlace, type Place } from "../api/placesApi";
import ButtonContainer from './Buttons';

function PlaceDetails() {
  const [place, setPlace] = useState<Place | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      console.error("No ID provided in URL parameters");
      return;
    }

    getPlace(parseInt(id))
      .then((response) => {
        setPlace(response);
      })
      .catch((error) => {
        console.error("Error fetching place:", error);
      });
  }, [id]);

  if (!place) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="text-gray-600">Place not found</div>
        <div className="flex justify-center items-center gap-4">
          <Link to="/" className="btn">
            Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-4 max-w-md mx-auto">
        <label className="w-10 text-right font-medium">Name:</label>
        <div className="flex-1 my-2 p-1">
          {place.name}
        </div>
      </div>
      <ButtonContainer>
        <Link to={`/places/${id}/edit`} className="btn">Edit</Link>
        <Link to="/" className="btn">Back</Link>
      </ButtonContainer>
    </>
  );
}

export default PlaceDetails;