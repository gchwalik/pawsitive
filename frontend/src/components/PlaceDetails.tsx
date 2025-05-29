import { Link } from 'react-router';
import { type Place } from "../api/placesApi";
import ButtonContainer from './Buttons';

interface PlaceDetailsProps {
  place: Place;
}

function PlaceDetails({ place }: PlaceDetailsProps) {
  return (
    <div className="flex flex-col flex-1">
      <div className="place-attributes">
        <div className="place-attribute items-center">
          <label className="label font-medium">Name:</label>
          <div className="flex-1">{place.name}</div>
        </div>
      </div>
      <ButtonContainer>
        <Link to={`/places/${place.id}/edit`} className="btn">Edit</Link>
        <Link to="/" className="btn">Back</Link>
      </ButtonContainer>
    </div>
  );
}

export default PlaceDetails;
