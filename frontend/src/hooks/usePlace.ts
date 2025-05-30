import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchPlace as getPlace, type PlaceEntity } from "../api/placesApi";

interface UsePlaceReturn {
  id: string | undefined;
  place: PlaceEntity | null;
  loading: boolean;
  error: string | null;
}

export const usePlace = (): UsePlaceReturn => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<PlaceEntity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No ID provided in URL parameters");
      setLoading(false);
      return;
    }

    setLoading(true);
    getPlace(parseInt(id))
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
  }, [id]);

  return { place, id, loading, error };
};
