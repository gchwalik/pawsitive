import { type PlaceEntity } from "../api/placesApi";

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
    </div>
  );
}

export default PlaceDetails;
