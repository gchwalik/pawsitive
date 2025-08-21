import { useState, useEffect } from 'react';
import { fetchPlace as getPlace, type Place } from "../api/placesApi";

interface UsePlaceReturn {
  place: Place | null;
  loading: boolean;
  error: string | null;
}

export const usePlace = (placeId: number): UsePlaceReturn => {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNaN(placeId)) {
      setError("Invalid place ID provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    getPlace(placeId)
      .then((response) => {
        setPlace(response);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching place:", error);
        setError("Failed to fetch place");
        setPlace(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [placeId]);

  return { place, loading, error };
};
