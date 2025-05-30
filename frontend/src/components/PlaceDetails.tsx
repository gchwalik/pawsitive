import { Link } from 'react-router';
import { type PlaceEntity } from "../api/placesApi";
import ButtonContainer from './Buttons';
import { ROUTES } from '../consts';

interface PlaceDetailsProps {
  place: PlaceEntity;
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
        <Link to={ROUTES.PLACES_EDIT(place.id)} className="btn">Edit</Link>
        <Link to="/" className="btn">Back</Link>
      </ButtonContainer>
    </div>
  );
}

export default PlaceDetails;
