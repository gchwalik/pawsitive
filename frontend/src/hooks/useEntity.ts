import { useState, useEffect } from 'react';

interface UseEntityReturn<TEntity> {
  entity: TEntity | null;
  loading: boolean;
  error: string | null;
}

interface useEntityProps<TEntity> {
  entityId: number | undefined;
  getEntity: (id: number) => Promise<TEntity>;
}

const useEntity = <TEntity>({entityId, getEntity}: useEntityProps<TEntity>): UseEntityReturn<TEntity> => {
  const [entity, setEntity] = useState<TEntity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (entityId === undefined) {
      setError("No ID provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    getEntity(entityId)
      .then((response) => {
        setEntity(response);
        setError(null);
      })
      .catch((error) => {
        console.error(`Error fetching entity with ID ${entityId}:`, error);
        setError("Failed to fetch place");
        setEntity(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [entityId]);

  return { entity, loading, error };
};


export { useEntity, type UseEntityReturn};
