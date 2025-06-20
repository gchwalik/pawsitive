import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchPlace as getPlace, type Place } from "../api/placesApi";

interface UsePlaceReturn {
  paramId: string | undefined;
  place: Place | null;
  loading: boolean;
  error: string | null;
}

export const usePlace = (): UsePlaceReturn => {
  const { id: paramId } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!paramId) {
      setError("No ID provided in URL parameters");
      setLoading(false);
      return;
    }

    setLoading(true);
    getPlace(parseInt(paramId))
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
  }, [paramId]);

  return { place, paramId, loading, error };
};
