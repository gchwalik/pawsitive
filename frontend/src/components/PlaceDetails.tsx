import { type Place } from "../api/placesApi";

interface PlaceDetailsProps {
  place: Place;
}

function PlaceDetails({ place }: PlaceDetailsProps) {
  return (
    <div className="flex flex-col flex-1">
      <div className="place-attributes">
        <div className="place-attribute items-center">
          <label className="label">Name:</label>
          <div className="flex-1">{place.name}</div>
        </div>
        <div className="place-attribute items-center">
          <label className="label">Type:</label>
          <div className="flex-1">{place.type.name}</div>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;
