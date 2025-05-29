import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { fetchPlace as getPlace, type Place } from "../api/placesApi";
import ButtonContainer from './Buttons';

interface PlaceDetailsProps {
  place: Place | null; // The place object or null if not found
}

function PlaceDetails({ place }: PlaceDetailsProps) {
  return (
    <>
      <div className="flex items-center gap-4 mb-4 max-w-md mx-auto">
        <label className="w-10 text-right font-medium">Name:</label>
        <div className="flex-1 my-2 p-1">
          {place.name}
        </div>
      </div>
      <ButtonContainer>
        <Link to={`/places/${place.id}/edit`} className="btn">Edit</Link>
        <Link to="/" className="btn">Back</Link>
      </ButtonContainer>
    </>
  );
}

export default PlaceDetails;
